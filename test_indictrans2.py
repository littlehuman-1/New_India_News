import os
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from IndicTransToolkit import IndicProcessor

MODEL_ID = "ai4bharat/indictrans2-en-indic-dist-200M"
HF_TOKEN = os.environ.get("HF_TOKEN")

if not HF_TOKEN:
    raise RuntimeError("HF_TOKEN is missing. Add it as a GitHub Actions repository secret.")

# CPU-only test: no paid GPU service is required.
torch.set_num_threads(2)
device = torch.device("cpu")

print(f"Loading {MODEL_ID} on CPU...")
tokenizer = AutoTokenizer.from_pretrained(
    MODEL_ID,
    trust_remote_code=True,
    token=HF_TOKEN,
)
model = AutoModelForSeq2SeqLM.from_pretrained(
    MODEL_ID,
    trust_remote_code=True,
    token=HF_TOKEN,
    low_cpu_mem_usage=True,
)
model.to(device)
model.eval()

processor = IndicProcessor(inference=True)

sample = (
    "The Government of India has approved a new railway infrastructure "
    "project to improve connectivity."
)

languages = {
    "Hindi": "hin_Deva",
    "Tamil": "tam_Taml",
    "Malayalam": "mal_Mlym",
    "Kannada": "kan_Knda",
    "Telugu": "tel_Telu",
}

print("\nEnglish sample:")
print(sample)

for language_name, language_code in languages.items():
    print(f"\nTranslating to {language_name} ({language_code})...")
    prepared = processor.preprocess_batch(
        [sample],
        src_lang="eng_Latn",
        tgt_lang=language_code,
        visualize=False,
    )
    inputs = tokenizer(
        prepared,
        padding="longest",
        truncation=True,
        max_length=256,
        return_tensors="pt",
    ).to(device)

    with torch.inference_mode():
        generated = model.generate(
            **inputs,
            num_beams=3,
            num_return_sequences=1,
            max_length=256,
        )

    decoded = tokenizer.batch_decode(
        generated,
        skip_special_tokens=True,
        clean_up_tokenization_spaces=True,
    )
    translated = processor.postprocess_batch(decoded, lang=language_code)[0]

    if not translated or translated.strip() == sample:
        raise RuntimeError(f"Translation check failed for {language_name}.")

    print(f"{language_name}: {translated}")

print("\nSUCCESS: The model produced translations in all five target languages.")
