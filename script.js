/*
  Positive India — starter data and interactions.
  Sample stories are illustrative placeholders, not verified news reports.
  Replace them with verified stories and direct article URLs before launch.
  Market figures are loaded from the existing market-data endpoint.
*/

const sampleArticles = [
  {
    id: 1,
    title: "Gujarat Adds Rooftop Solar Subsidy for Eligible Households",
    category: "Development",
    date: "2026-10-27",
    source: "SolarQuarter",
    sourceShort: "SQ",
    sourceUrl: "https://solarquarter.com/",
    articleUrl: "https://solarquarter.com/2026/10/27/gujarat-offers-additional-subsidy-for-rooftop-solar-systems-up-to-2-18-kwp-under-pm-surya-ghar-scheme/",
    summary: "Gujarat has announced additional state subsidy support for eligible households installing rooftop solar systems of up to 2.18 kWp under the PM Surya Ghar scheme. Reported household contributions are limited to 5% of benchmark cost for SC/ST beneficiaries and 10% for other residential consumers, after accounting for central assistance. Eligible support is subject to the scheme's conditions.",
    translations: {
      en: {
        title: "Gujarat Adds Rooftop Solar Subsidy for Eligible Households",
        summary: "Gujarat has announced additional state subsidy support for eligible households installing rooftop solar systems of up to 2.18 kWp under the PM Surya Ghar scheme. Reported household contributions are limited to 5% of benchmark cost for SC/ST beneficiaries and 10% for other residential consumers, after accounting for central assistance. Eligible support is subject to the scheme's conditions."
      },
      hi: {
        title: "गुजरात ने पात्र परिवारों के लिए रूफटॉप सोलर सब्सिडी बढ़ाई",
        summary: "गुजरात ने पीएम सूर्य घर योजना के तहत 2.18 kWp तक के रूफटॉप सोलर सिस्टम लगाने वाले पात्र परिवारों के लिए अतिरिक्त राज्य सब्सिडी की घोषणा की है। केंद्रीय सहायता के बाद, SC/ST लाभार्थियों को मानक लागत का 5% और अन्य घरेलू उपभोक्ताओं को 10% तक योगदान देना होगा। सहायता योजना की शर्तों के अधीन है।"
      },
      ta: {
        title: "தகுதியுள்ள குடும்பங்களுக்கான கூரைசார் சூரிய மின்சார மானியத்தை குஜராத் அதிகரித்தது",
        summary: "பிஎம் சூர்யா கர் திட்டத்தின் கீழ் 2.18 kWp வரை திறன் கொண்ட கூரைசார் சூரிய மின்சார அமைப்புகளை நிறுவும் தகுதியுள்ள குடும்பங்களுக்கு கூடுதல் மாநில மானியத்தை குஜராத் அறிவித்துள்ளது. மத்திய உதவிக்குப் பிறகு, SC/ST பயனாளிகள் அளவுகோல் செலவில் 5% வரையும், பிற வீட்டு நுகர்வோர் 10% வரையும் செலுத்த வேண்டியிருக்கும். திட்ட நிபந்தனைகள் பொருந்தும்."
      },
      ml: {
        title: "അർഹരായ കുടുംബങ്ങൾക്കുള്ള റൂഫ്‌ടോപ്പ് സോളാർ സബ്‌സിഡി ഗുജറാത്ത് വർധിപ്പിച്ചു",
        summary: "പിഎം സൂര്യ ഘർ പദ്ധതിയുടെ ഭാഗമായി 2.18 kWp വരെ ശേഷിയുള്ള റൂഫ്‌ടോപ്പ് സോളാർ സംവിധാനങ്ങൾ സ്ഥാപിക്കുന്ന അർഹരായ കുടുംബങ്ങൾക്ക് അധിക സംസ്ഥാന സബ്‌സിഡി ഗുജറാത്ത് പ്രഖ്യാപിച്ചു. കേന്ദ്ര സഹായം കണക്കാക്കിയ ശേഷം, SC/ST ഗുണഭോക്താക്കൾക്ക് അടിസ്ഥാന ചെലവിന്റെ 5% വരെയും മറ്റ് ഗാർഹിക ഉപഭോക്താക്കൾക്ക് 10% വരെയും സ്വന്തം വിഹിതം നൽകേണ്ടിവരും. പദ്ധതിയുടെ നിബന്ധനകൾ ബാധകമാണ്."
      },
      kn: {
        title: "ಅರ್ಹ ಕುಟುಂಬಗಳಿಗೆ ಮೇಲ್ಛಾವಣಿ ಸೌರ ಸಬ್ಸಿಡಿ ಹೆಚ್ಚಿಸಿದ ಗುಜರಾತ್",
        summary: "ಪಿಎಂ ಸೂರ್ಯ ಘರ್ ಯೋಜನೆಯಡಿ 2.18 kWp ವರೆಗೆ ಸಾಮರ್ಥ್ಯದ ಮೇಲ್ಛಾವಣಿ ಸೌರ ವ್ಯವಸ್ಥೆ ಅಳವಡಿಸುವ ಅರ್ಹ ಕುಟುಂಬಗಳಿಗೆ ಹೆಚ್ಚುವರಿ ರಾಜ್ಯ ಸಬ್ಸಿಡಿಯನ್ನು ಗುಜರಾತ್ ಘೋಷಿಸಿದೆ. ಕೇಂದ್ರ ಸಹಾಯದ ನಂತರ, SC/ST ಫಲಾನುಭವಿಗಳು ಮಾನದಂಡ ವೆಚ್ಚದ 5% ವರೆಗೆ ಮತ್ತು ಇತರ ಗೃಹ ಬಳಕೆದಾರರು 10% ವರೆಗೆ ಪಾವತಿಸಬೇಕಾಗುತ್ತದೆ. ಯೋಜನೆಯ ಷರತ್ತುಗಳು ಅನ್ವಯಿಸುತ್ತವೆ."
      },
      te: {
        title: "అర్హులైన కుటుంబాలకు రూఫ్‌టాప్ సోలార్ సబ్సిడీని పెంచిన గుజరాత్",
        summary: "పీఎం సూర్య ఘర్ పథకం కింద 2.18 kWp వరకు సామర్థ్యమున్న రూఫ్‌టాప్ సోలార్ వ్యవస్థలను ఏర్పాటు చేసే అర్హులైన కుటుంబాలకు గుజరాత్ అదనపు రాష్ట్ర సబ్సిడీని ప్రకటించింది. కేంద్ర సహాయం తర్వాత, SC/ST లబ్ధిదారులు ప్రామాణిక ఖర్చులో 5% వరకు, ఇతర గృహ వినియోగదారులు 10% వరకు చెల్లించాలి. పథకం నిబంధనలు వర్తిస్తాయి."
      }
    },
    icon: "☀️", visualBg: "#f7efcf", visualInk: "#8d7023",
    tags: ["Gujarat", "rooftop solar", "renewable energy", "PM Surya Ghar", "subsidy", "development"],
    isSample: false
  },
  {
    id: 2,
    title: "A guide to discovering space research and science updates",
    category: "Innovation",
    date: "2026-10-24",
    source: "Indian Space Research Organisation",
    sourceShort: "ISRO",
    sourceUrl: "https://www.isro.gov.in/",
    articleUrl: "https://www.isro.gov.in/",
    summary: "This placeholder demonstrates a science story card. Add a verified mission, research milestone or technology update and link directly to its original report.",
    translations: {
      en: { title: "A guide to discovering space research and science updates", summary: "This placeholder demonstrates a science story card. Add a verified mission, research milestone or technology update and link directly to its original report." },
      hi: { title: "अंतरिक्ष अनुसंधान और विज्ञान की खबरें जानने के लिए मार्गदर्शिका", summary: "यह एक उदाहरण विज्ञान समाचार कार्ड है। प्रकाशित करने से पहले इसमें किसी सत्यापित अंतरिक्ष मिशन, अनुसंधान उपलब्धि या तकनीकी अपडेट की जानकारी और मूल रिपोर्ट का सीधा लिंक जोड़ें।" },
      ta: { title: "விண்வெளி ஆராய்ச்சி மற்றும் அறிவியல் புதுப்பிப்புகளை அறியும் வழிகாட்டி", summary: "இது ஒரு மாதிரி அறிவியல் செய்தி அட்டை. வெளியிடுவதற்கு முன் சரிபார்க்கப்பட்ட விண்வெளிப் பணி, ஆராய்ச்சி சாதனை அல்லது தொழில்நுட்பப் புதுப்பிப்பைச் சேர்த்து, அசல் அறிக்கைக்கான நேரடி இணைப்பைக் கொடுக்கவும்." },
      ml: { title: "ബഹിരാകാശ ഗവേഷണവും ശാസ്ത്ര വാർത്തകളും അറിയാനുള്ള വഴികാട്ടി", summary: "ഇത് ഒരു മാതൃകാ ശാസ്ത്ര വാർത്താ കാർഡാണ്. പ്രസിദ്ധീകരിക്കുന്നതിന് മുമ്പ് സ്ഥിരീകരിച്ച ബഹിരാകാശ ദൗത്യം, ഗവേഷണ നേട്ടം അല്ലെങ്കിൽ സാങ്കേതിക വിവരങ്ങൾ ചേർത്ത് യഥാർത്ഥ റിപ്പോർട്ടിലേക്കുള്ള നേരിട്ടുള്ള ലിങ്ക് നൽകുക." },
      kn: { title: "ಬಾಹ್ಯಾಕಾಶ ಸಂಶೋಧನೆ ಮತ್ತು ವಿಜ್ಞಾನ ಸುದ್ದಿಗಳನ್ನು ತಿಳಿಯುವ ಮಾರ್ಗದರ್ಶಿ", summary: "ಇದು ಮಾದರಿ ವಿಜ್ಞಾನ ಸುದ್ದಿ ಕಾರ್ಡ್. ಪ್ರಕಟಿಸುವ ಮೊದಲು ಪರಿಶೀಲಿಸಿದ ಬಾಹ್ಯಾಕಾಶ ಮಿಷನ್, ಸಂಶೋಧನಾ ಸಾಧನೆ ಅಥವಾ ತಂತ್ರಜ್ಞಾನ ಮಾಹಿತಿಯನ್ನು ಸೇರಿಸಿ ಮೂಲ ವರದಿಗೆ ನೇರ ಲಿಂಕ್ ನೀಡಿ." },
      te: { title: "అంతరిక్ష పరిశోధన, సైన్స్ తాజా సమాచారాన్ని తెలుసుకునే మార్గదర్శి", summary: "ఇది నమూనా సైన్స్ వార్తా కార్డు. ప్రచురించే ముందు ధృవీకరించిన అంతరిక్ష మిషన్, పరిశోధనా మైలురాయి లేదా సాంకేతిక నవీకరణను చేర్చి అసలు నివేదికకు నేరుగా లింక్ ఇవ్వండి." }
    },
    icon: "🛰", visualBg: "#e7e9f7", visualInk: "#4d5698",
    tags: ["space", "science", "research", "technology", "innovation"]
  },
  {
    id: 3,
    title: "Manufacturing and export stories: what readers can track",
    category: "Business",
    date: "2026-10-22",
    source: "Invest India",
    sourceShort: "Invest India",
    sourceUrl: "https://www.investindia.gov.in/",
    articleUrl: "https://www.investindia.gov.in/",
    summary: "A sample business card for future coverage of manufacturing, exports, investment and company expansion. Replace with a source-backed story before publishing.",
    translations: {
      en: { title: "Manufacturing and export stories: what readers can track", summary: "A sample business card for future coverage of manufacturing, exports, investment and company expansion. Replace with a source-backed story before publishing." },
      hi: { title: "विनिर्माण और निर्यात: पाठक किन बातों पर नज़र रख सकते हैं", summary: "यह विनिर्माण, निर्यात, निवेश और कंपनियों के विस्तार से जुड़ी भावी खबरों के लिए एक उदाहरण कार्ड है। प्रकाशित करने से पहले इसे विश्वसनीय स्रोत पर आधारित वास्तविक खबर से बदलें।" },
      ta: { title: "உற்பத்தி மற்றும் ஏற்றுமதி செய்திகள்: வாசகர்கள் கவனிக்க வேண்டியவை", summary: "உற்பத்தி, ஏற்றுமதி, முதலீடு மற்றும் நிறுவன விரிவாக்கம் குறித்த எதிர்கால செய்திகளுக்கான மாதிரி அட்டை இது. வெளியிடுவதற்கு முன் நம்பகமான ஆதாரத்துடன் கூடிய உண்மையான செய்தியாக மாற்றவும்." },
      ml: { title: "നിർമാണവും കയറ്റുമതിയും: വായനക്കാർ ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ", summary: "നിർമാണം, കയറ്റുമതി, നിക്ഷേപം, കമ്പനികളുടെ വികസനം എന്നിവയെക്കുറിച്ചുള്ള ഭാവി വാർത്തകൾക്കായുള്ള മാതൃകാ കാർഡാണിത്. പ്രസിദ്ധീകരിക്കുന്നതിന് മുമ്പ് വിശ്വസനീയമായ ഉറവിടമുള്ള യഥാർത്ഥ വാർത്ത ചേർക്കുക." },
      kn: { title: "ಉತ್ಪಾದನೆ ಮತ್ತು ರಫ್ತು ಸುದ್ದಿಗಳು: ಓದುಗರು ಗಮನಿಸಬಹುದಾದ ವಿಷಯಗಳು", summary: "ಉತ್ಪಾದನೆ, ರಫ್ತು, ಹೂಡಿಕೆ ಮತ್ತು ಕಂಪನಿಗಳ ವಿಸ್ತರಣೆಯ ಕುರಿತ ಭವಿಷ್ಯದ ವರದಿಗಳಿಗಾಗಿ ಇದು ಮಾದರಿ ಕಾರ್ಡ್. ಪ್ರಕಟಿಸುವ ಮೊದಲು ವಿಶ್ವಾಸಾರ್ಹ ಮೂಲದ ನೈಜ ಸುದ್ದಿಯಿಂದ ಬದಲಾಯಿಸಿ." },
      te: { title: "తయారీ, ఎగుమతి వార్తలు: పాఠకులు గమనించాల్సిన అంశాలు", summary: "తయారీ, ఎగుమతులు, పెట్టుబడులు, కంపెనీల విస్తరణపై భవిష్యత్ కథనాల కోసం ఇది నమూనా కార్డు. ప్రచురించే ముందు విశ్వసనీయ ఆధారాలున్న నిజమైన వార్తతో మార్చండి." }
    },
    icon: "⚙", visualBg: "#f8ead6", visualInk: "#8c6026",
    tags: ["manufacturing", "exports", "investment", "business"]
  },
  {
    id: 4,
    title: "Renewable energy projects and clean-technology progress",
    category: "Development",
    date: "2026-10-20",
    source: "Ministry of New and Renewable Energy",
    sourceShort: "MNRE",
    sourceUrl: "https://mnre.gov.in/",
    articleUrl: "https://mnre.gov.in/",
    summary: "A demonstration summary for a potential clean-energy story. For a real entry, include the project's location, capacity, timeline and source-confirmed details.",
    translations: {
      en: { title: "Renewable energy projects and clean-technology progress", summary: "A demonstration summary for a potential clean-energy story. For a real entry, include the project's location, capacity, timeline and source-confirmed details." },
      hi: { title: "नवीकरणीय ऊर्जा परियोजनाएँ और स्वच्छ तकनीक की प्रगति", summary: "यह स्वच्छ ऊर्जा से जुड़ी संभावित खबर का उदाहरण है। वास्तविक खबर में परियोजना का स्थान, क्षमता, समय-सीमा और स्रोत से सत्यापित विवरण शामिल करें।" },
      ta: { title: "புதுப்பிக்கத்தக்க ஆற்றல் திட்டங்கள் மற்றும் தூய தொழில்நுட்ப முன்னேற்றம்", summary: "இது தூய ஆற்றல் செய்திக்கான மாதிரி சுருக்கம். உண்மையான செய்தியில் திட்டத்தின் இடம், திறன், கால அட்டவணை மற்றும் ஆதாரத்தால் உறுதிப்படுத்தப்பட்ட விவரங்களைச் சேர்க்கவும்." },
      ml: { title: "പുനരുപയോഗ ഊർജ പദ്ധതികളും ശുദ്ധ സാങ്കേതികവിദ്യയുടെ പുരോഗതിയും", summary: "ശുദ്ധ ഊർജത്തെക്കുറിച്ചുള്ള സാധ്യതയുള്ള വാർത്തയുടെ മാതൃകാ സംഗ്രഹമാണിത്. യഥാർത്ഥ വാർത്തയിൽ പദ്ധതിയുടെ സ്ഥലം, ശേഷി, സമയക്രമം, ഉറവിടം സ്ഥിരീകരിച്ച വിവരങ്ങൾ എന്നിവ ഉൾപ്പെടുത്തുക." },
      kn: { title: "ನವೀಕರಿಸಬಹುದಾದ ಇಂಧನ ಯೋಜನೆಗಳು ಮತ್ತು ಸ್ವಚ್ಛ ತಂತ್ರಜ್ಞಾನದ ಪ್ರಗತಿ", summary: "ಇದು ಸ್ವಚ್ಛ ಇಂಧನ ಕುರಿತ ಸಾಧ್ಯವಾದ ಸುದ್ದಿಯ ಮಾದರಿ ಸಾರಾಂಶ. ನೈಜ ವರದಿಯಲ್ಲಿ ಯೋಜನೆಯ ಸ್ಥಳ, ಸಾಮರ್ಥ್ಯ, ಕಾಲಮಿತಿ ಮತ್ತು ಮೂಲದಿಂದ ದೃಢೀಕರಿಸಿದ ವಿವರಗಳನ್ನು ಸೇರಿಸಿ." },
      te: { title: "పునరుత్పాదక ఇంధన ప్రాజెక్టులు, స్వచ్ఛ సాంకేతికత పురోగతి", summary: "ఇది స్వచ్ఛ ఇంధన కథనానికి నమూనా సారాంశం. నిజమైన కథనంలో ప్రాజెక్టు స్థలం, సామర్థ్యం, కాలపరిమితి, మూలం ధృవీకరించిన వివరాలను చేర్చండి." }
    },
    icon: "☀", visualBg: "#f7efcf", visualInk: "#8d7023",
    tags: ["renewable energy", "solar", "clean technology", "development"]
  },
  {
    id: 5,
    title: "How to track company results and business expansion",
    category: "Business",
    date: "2026-10-18",
    source: "National Stock Exchange of India",
    sourceShort: "NSE",
    sourceUrl: "https://www.nseindia.com/",
    articleUrl: "https://www.nseindia.com/",
    summary: "This sample illustrates a company and economy card. Use an actual company filing, exchange announcement or licensed news source for a published item.",
    translations: {
      en: { title: "How to track company results and business expansion", summary: "This sample illustrates a company and economy card. Use an actual company filing, exchange announcement or licensed news source for a published item." },
      hi: { title: "कंपनी के नतीजों और कारोबार के विस्तार पर नज़र कैसे रखें", summary: "यह कंपनी और अर्थव्यवस्था से जुड़ा एक उदाहरण कार्ड है। प्रकाशित खबर के लिए कंपनी की वास्तविक फाइलिंग, एक्सचेंज की घोषणा या लाइसेंस प्राप्त समाचार स्रोत का उपयोग करें।" },
      ta: { title: "நிறுவன முடிவுகள் மற்றும் வணிக விரிவாக்கத்தை எவ்வாறு கண்காணிப்பது", summary: "இது நிறுவனம் மற்றும் பொருளாதாரம் தொடர்பான மாதிரி அட்டை. வெளியிடப்படும் செய்திக்கு உண்மையான நிறுவன அறிக்கை, பங்குச் சந்தை அறிவிப்பு அல்லது உரிமம் பெற்ற செய்தி ஆதாரத்தைப் பயன்படுத்தவும்." },
      ml: { title: "കമ്പനി ഫലങ്ങളും ബിസിനസ് വിപുലീകരണവും എങ്ങനെ നിരീക്ഷിക്കാം", summary: "കമ്പനിയെയും സമ്പദ്‌വ്യവസ്ഥയെയും കുറിച്ചുള്ള മാതൃകാ കാർഡാണിത്. പ്രസിദ്ധീകരിക്കുന്ന വാർത്തയ്ക്ക് യഥാർത്ഥ കമ്പനി ഫയലിംഗ്, എക്സ്ചേഞ്ച് അറിയിപ്പ് അല്ലെങ്കിൽ ലൈസൻസുള്ള വാർത്താ ഉറവിടം ഉപയോഗിക്കുക." },
      kn: { title: "ಕಂಪನಿ ಫಲಿತಾಂಶಗಳು ಮತ್ತು ವ್ಯಾಪಾರ ವಿಸ್ತರಣೆಯನ್ನು ಗಮನಿಸುವುದು ಹೇಗೆ", summary: "ಇದು ಕಂಪನಿ ಮತ್ತು ಆರ್ಥಿಕತೆಯ ಕುರಿತ ಮಾದರಿ ಕಾರ್ಡ್. ಪ್ರಕಟಿತ ಸುದ್ದಿಗೆ ನೈಜ ಕಂಪನಿ ದಾಖಲೆ, ಷೇರು ವಿನಿಮಯ ಪ್ರಕಟಣೆ ಅಥವಾ ಪರವಾನಗಿ ಪಡೆದ ಸುದ್ದಿ ಮೂಲವನ್ನು ಬಳಸಿ." },
      te: { title: "కంపెనీ ఫలితాలు, వ్యాపార విస్తరణను ఎలా గమనించాలి", summary: "ఇది కంపెనీ, ఆర్థిక వ్యవస్థకు సంబంధించిన నమూనా కార్డు. ప్రచురించే వార్త కోసం అసలు కంపెనీ ఫైలింగ్, స్టాక్ ఎక్స్ఛేంజ్ ప్రకటన లేదా లైసెన్స్ పొందిన వార్తా మూలాన్ని ఉపయోగించండి." }
    },
    icon: "📈", visualBg: "#e2f0ed", visualInk: "#276b5c",
    tags: ["company results", "business", "economy", "markets"]
  },
  {
    id: 6,
    title: "Understanding official Indian market information",
    category: "Markets",
    date: "2026-10-16",
    source: "BSE India",
    sourceShort: "BSE",
    sourceUrl: "https://www.bseindia.com/",
    articleUrl: "https://www.bseindia.com/",
    summary: "A market-category placeholder. Replace with a dated, verified market update and include the relevant index or company, reporting period and source link.",
    translations: {
      en: { title: "Understanding official Indian market information", summary: "A market-category placeholder. Replace with a dated, verified market update and include the relevant index or company, reporting period and source link." },
      hi: { title: "भारत के आधिकारिक बाज़ार संबंधी आँकड़ों को समझना", summary: "यह बाज़ार श्रेणी का उदाहरण है। इसे तारीख सहित सत्यापित बाज़ार अपडेट से बदलें और संबंधित सूचकांक या कंपनी, रिपोर्टिंग अवधि तथा स्रोत का लिंक शामिल करें।" },
      ta: { title: "இந்தியாவின் அதிகாரப்பூர்வ சந்தைத் தகவல்களைப் புரிந்துகொள்வது", summary: "இது சந்தைப் பிரிவுக்கான மாதிரி அட்டை. தேதியுடன் சரிபார்க்கப்பட்ட சந்தைப் புதுப்பிப்பைச் சேர்த்து, தொடர்புடைய குறியீடு அல்லது நிறுவனம், அறிக்கை காலம் மற்றும் ஆதார இணைப்பைக் குறிப்பிடவும்." },
      ml: { title: "ഔദ്യോഗിക ഇന്ത്യൻ വിപണി വിവരങ്ങൾ മനസ്സിലാക്കാം", summary: "വിപണി വിഭാഗത്തിനുള്ള മാതൃകാ കാർഡാണിത്. തീയതിയോടുകൂടിയ സ്ഥിരീകരിച്ച വിപണി വിവരങ്ങൾ ചേർത്ത് ബന്ധപ്പെട്ട സൂചികയോ കമ്പനിയോ, റിപ്പോർട്ടിംഗ് കാലയളവോ ഉറവിട ലിങ്കോ ഉൾപ്പെടുത്തുക." },
      kn: { title: "ಅಧಿಕೃತ ಭಾರತೀಯ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು", summary: "ಇದು ಮಾರುಕಟ್ಟೆ ವಿಭಾಗದ ಮಾದರಿ ಕಾರ್ಡ್. ದಿನಾಂಕವಿರುವ ಪರಿಶೀಲಿತ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ಸೇರಿಸಿ, ಸಂಬಂಧಿತ ಸೂಚ್ಯಂಕ ಅಥವಾ ಕಂಪನಿ, ವರದಿ ಅವಧಿ ಮತ್ತು ಮೂಲದ ಲಿಂಕ್ ನೀಡಿ." },
      te: { title: "అధికారిక భారత మార్కెట్ సమాచారాన్ని అర్థం చేసుకోవడం", summary: "ఇది మార్కెట్ విభాగానికి నమూనా కార్డు. తేదీతో కూడిన ధృవీకరించిన మార్కెట్ నవీకరణను చేర్చి, సంబంధిత సూచీ లేదా కంపెనీ, నివేదిక కాలం, మూల లింక్ ఇవ్వండి." }
    },
    icon: "₹", visualBg: "#f1e5ef", visualInk: "#80517b",
    tags: ["stock market", "sensex", "markets", "finance", "india"]
  },
  {
    id: 7,
    title: "India has 5.3GWh of operational BESS, with 185GWh under development, CEA official says",
    category: "Development",
    date: "2026-10-27",
    source: "Energy-Storage.News",
    sourceShort: "ESN",
    sourceUrl: "https://www.energy-storage.news/",
    articleUrl: "https://www.energy-storage.news/india-has-5-3gwh-of-operational-bess-with-185gwh-under-development-cea-official-says/",
    summary: "India has 5.3GWh of operational battery energy storage capacity, with a further 185GWh of projects under development, according to a Central Electricity Authority official. The article discusses energy storage expansion, renewable energy integration and the challenges of delivering projects.",
    translations: {
      en: { title: "India has 5.3GWh of operational BESS, with 185GWh under development, CEA official says", summary: "India has 5.3GWh of operational battery energy storage capacity, with a further 185GWh of projects under development, according to a Central Electricity Authority official. The article discusses energy storage expansion, renewable energy integration and the challenges of delivering projects." },
      hi: { title: "CEA अधिकारी के अनुसार, भारत में 5.3 GWh बैटरी स्टोरेज चालू, 185 GWh परियोजनाएँ विकासाधीन", summary: "केंद्रीय विद्युत प्राधिकरण के एक अधिकारी के अनुसार, भारत में 5.3 GWh बैटरी ऊर्जा भंडारण क्षमता चालू है और 185 GWh की अतिरिक्त परियोजनाएँ विकासाधीन हैं। रिपोर्ट में ऊर्जा भंडारण के विस्तार, नवीकरणीय ऊर्जा के एकीकरण और परियोजनाओं को लागू करने की चुनौतियों पर चर्चा की गई है।" },
      ta: { title: "இந்தியாவில் 5.3 GWh பேட்டரி சேமிப்பு செயல்பாட்டில்; 185 GWh திட்டங்கள் உருவாக்கத்தில்: CEA அதிகாரி", summary: "மத்திய மின்சார ஆணைய அதிகாரியின் கூற்றுப்படி, இந்தியாவில் 5.3 GWh பேட்டரி மின் சேமிப்புத் திறன் செயல்பாட்டில் உள்ளது; மேலும் 185 GWh திட்டங்கள் உருவாக்கத்தில் உள்ளன. ஆற்றல் சேமிப்பு விரிவாக்கம், புதுப்பிக்கத்தக்க ஆற்றல் ஒருங்கிணைப்பு மற்றும் திட்டங்களைச் செயல்படுத்துவதில் உள்ள சவால்களை இந்தச் செய்தி விவரிக்கிறது." },
      ml: { title: "ഇന്ത്യയിൽ 5.3 GWh ബാറ്ററി സംഭരണശേഷി പ്രവർത്തനത്തിൽ; 185 GWh പദ്ധതികൾ വികസനത്തിൽ: CEA ഉദ്യോഗസ്ഥൻ", summary: "കേന്ദ്ര വൈദ്യുതി അതോറിറ്റിയിലെ ഒരു ഉദ്യോഗസ്ഥന്റെ അഭിപ്രായത്തിൽ, ഇന്ത്യയിൽ 5.3 GWh ബാറ്ററി ഊർജ സംഭരണശേഷി പ്രവർത്തനത്തിലുണ്ട്; 185 GWh ശേഷിയുള്ള പദ്ധതികൾ കൂടി വികസനത്തിലാണ്. ഊർജ സംഭരണത്തിന്റെ വളർച്ച, പുനരുപയോഗ ഊർജ സംയോജനം, പദ്ധതികൾ നടപ്പാക്കുന്നതിലെ വെല്ലുവിളികൾ എന്നിവയാണ് റിപ്പോർട്ട് ചർച്ച ചെയ്യുന്നത്." },
      kn: { title: "ಭಾರತದಲ್ಲಿ 5.3 GWh ಬ್ಯಾಟರಿ ಸಂಗ್ರಹಣೆ ಕಾರ್ಯನಿರ್ವಹಣೆಯಲ್ಲಿ; 185 GWh ಯೋಜನೆಗಳು ಅಭಿವೃದ್ಧಿಯಲ್ಲಿ: CEA ಅಧಿಕಾರಿ", summary: "ಕೇಂದ್ರ ವಿದ್ಯುತ್ ಪ್ರಾಧಿಕಾರದ ಅಧಿಕಾರಿಯ ಪ್ರಕಾರ, ಭಾರತದಲ್ಲಿ 5.3 GWh ಬ್ಯಾಟರಿ ಇಂಧನ ಸಂಗ್ರಹ ಸಾಮರ್ಥ್ಯ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ ಮತ್ತು ಇನ್ನೂ 185 GWh ಯೋಜನೆಗಳು ಅಭಿವೃದ್ಧಿಯಲ್ಲಿವೆ. ಇಂಧನ ಸಂಗ್ರಹಣೆಯ ವಿಸ್ತರಣೆ, ನವೀಕರಿಸಬಹುದಾದ ಇಂಧನದ ಸಂಯೋಜನೆ ಮತ್ತು ಯೋಜನೆಗಳನ್ನು ಜಾರಿಗೊಳಿಸುವ ಸವಾಲುಗಳನ್ನು ವರದಿ ಚರ್ಚಿಸುತ್ತದೆ." },
      te: { title: "భారత్‌లో 5.3 GWh బ్యాటరీ నిల్వ సామర్థ్యం పనిచేస్తోంది; 185 GWh ప్రాజెక్టులు అభివృద్ధిలో ఉన్నాయి: CEA అధికారి", summary: "కేంద్ర విద్యుత్ అథారిటీ అధికారి ప్రకారం, భారత్‌లో 5.3 GWh బ్యాటరీ విద్యుత్ నిల్వ సామర్థ్యం పనిచేస్తోంది; మరో 185 GWh ప్రాజెక్టులు అభివృద్ధిలో ఉన్నాయి. ఇంధన నిల్వ విస్తరణ, పునరుత్పాదక ఇంధన అనుసంధానం, ప్రాజెక్టుల అమలులోని సవాళ్లను ఈ కథనం వివరిస్తుంది." }
    },
    icon: "🔋", visualBg: "#e2f0ed", visualInk: "#276b5c",
    tags: ["battery storage", "renewable energy", "clean energy", "infrastructure", "development"],
    isSample: false
  }
];

async function loadFetchedNews() {
  try {
    const response = await fetch("./news.json");
    if (!response.ok) throw new Error(`Could not load news.json: ${response.status}`);

    const data = await response.json();
    const existingUrls = new Set(sampleArticles.map(article => article.articleUrl));

    const fetchedArticles = (Array.isArray(data.articles) ? data.articles : [])
      .filter(article => article.articleUrl && !existingUrls.has(article.articleUrl))
      .map((article, index) => ({
        ...article,
        id: `auto-${index}`,
        isSample: false,
        icon: article.icon || "📰",
        visualBg: article.visualBg || "#e2f0ed",
        visualInk: article.visualInk || "#276b5c",
        tags: Array.isArray(article.tags) ? article.tags : []
      }));

    sampleArticles.push(...fetchedArticles);
    renderStories();
    const featured = fetchedArticles.find(article => article.isFeatured);
    console.log(`Loaded ${fetchedArticles.length} fetched news stories.`);
    console.log(featured
      ? `PIB infrastructure lead: ${featured.title} (${featured.date})`
      : "No qualifying PIB infrastructure story was supplied by news.json; the site will not invent or substitute one.");
  } catch (error) {
    console.error("Automatic news loading failed:", error);
  }
}

let marketData = [
  { name: "Nifty 50", code: "NSE", value: "—", change: "Daily close", direction: "up" },
  { name: "Sensex", code: "BSE", value: "—", change: "Daily close", direction: "up" }
];
let marketDataDate = "";

const storyGrid = document.querySelector("#story-grid");
const marketGrid = document.querySelector("#market-grid");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const categoryFilters = document.querySelector("#category-filters");
const storyCount = document.querySelector("#story-count");
const emptyState = document.querySelector("#empty-state");
const resetFiltersButton = document.querySelector("#reset-filters");
const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const languageSelect = document.querySelector("#language-select");

let activeCategory = "All";

const translations = {
  en: {
    topStories: "Top stories", development: "Development", innovation: "Innovation",
    business: "Business", markets: "Markets", exploreStories: "Explore the stories",
    searchPlaceholder: "Search topics, sources or keywords…", newest: "Newest first",
    oldest: "Oldest first", headlineAZ: "Headline A–Z", allStories: "All stories",
    scienceInnovation: "Science & innovation", noStories: "No stories match that search",
    tryDifferent: "Try a different keyword or choose another category.",
    resetFilters: "Reset filters", visitSource: "Visit source ↗",
    publisher: "Publisher website",
    featuredLabel: "PIB FEATURED · INFRASTRUCTURE",
    demo: "DEMO CONTENT · VERIFY BEFORE USE",
    story: "STORY", stories: "stories", storyOne: "story"
  },
  hi: {
    topStories: "मुख्य समाचार", development: "विकास", innovation: "नवाचार",
    business: "व्यापार", markets: "बाज़ार", exploreStories: "समाचार पढ़ें",
    searchPlaceholder: "विषय, स्रोत या शब्द खोजें…", newest: "नवीनतम पहले",
    oldest: "सबसे पुराने पहले", headlineAZ: "शीर्षक A–Z", allStories: "सभी समाचार",
    scienceInnovation: "विज्ञान और नवाचार", noStories: "इस खोज से कोई समाचार नहीं मिला",
    tryDifferent: "दूसरा शब्द खोजें या कोई अन्य श्रेणी चुनें।",
    resetFilters: "फ़िल्टर रीसेट करें", visitSource: "स्रोत देखें ↗",
    publisher: "प्रकाशक की वेबसाइट",
    featuredLabel: "पीआईबी प्रमुख · बुनियादी ढाँचा",
    demo: "डेमो सामग्री · प्रकाशित करने से पहले जाँचें",
    story: "समाचार", stories: "समाचार", storyOne: "समाचार"
  },
  ta: {
    topStories: "முக்கிய செய்திகள்", development: "வளர்ச்சி", innovation: "புதுமை",
    business: "வணிகம்", markets: "சந்தைகள்", exploreStories: "செய்திகளைப் பாருங்கள்",
    searchPlaceholder: "தலைப்புகள் அல்லது ஆதாரங்களைத் தேடுங்கள்…", newest: "புதியவை முதலில்",
    oldest: "பழையவை முதலில்", headlineAZ: "தலைப்பு A–Z", allStories: "அனைத்துச் செய்திகள்",
    scienceInnovation: "அறிவியல் மற்றும் புதுமை", noStories: "இந்தத் தேடலுக்குப் பொருத்தமான செய்திகள் இல்லை",
    tryDifferent: "வேறு சொல்லைத் தேடுங்கள் அல்லது வேறு பிரிவைத் தேர்ந்தெடுக்கவும்.",
    resetFilters: "வடிகட்டிகளை மீட்டமை", visitSource: "ஆதாரத்தைப் பார்க்க ↗",
    publisher: "வெளியீட்டாளர் இணையதளம்",
    featuredLabel: "பிஐபி சிறப்புச் செய்தி · உள்கட்டமைப்பு",
    demo: "மாதிரி உள்ளடக்கம் · வெளியிடும் முன் சரிபார்க்கவும்",
    story: "செய்தி", stories: "செய்திகள்", storyOne: "செய்தி"
  },
  ml: {
    topStories: "പ്രധാന വാർത്തകൾ", development: "വികസനം", innovation: "നവീകരണം",
    business: "വ്യാപാരം", markets: "വിപണികൾ", exploreStories: "വാർത്തകൾ കാണുക",
    searchPlaceholder: "വിഷയങ്ങളോ ഉറവിടങ്ങളോ തിരയുക…", newest: "പുതിയത് ആദ്യം",
    oldest: "പഴയത് ആദ്യം", headlineAZ: "തലക്കെട്ട് A–Z", allStories: "എല്ലാ വാർത്തകളും",
    scienceInnovation: "ശാസ്ത്രവും നവീകരണവും", noStories: "ഈ തിരയലിന് അനുയോജ്യമായ വാർത്തകളില്ല",
    tryDifferent: "മറ്റൊരു വാക്ക് തിരയുക അല്ലെങ്കിൽ മറ്റൊരു വിഭാഗം തിരഞ്ഞെടുക്കുക.",
    resetFilters: "ഫിൽട്ടറുകൾ പുനഃസജ്ജമാക്കുക", visitSource: "ഉറവിടം കാണുക ↗",
    publisher: "പ്രസാധകന്റെ വെബ്സൈറ്റ്",
    featuredLabel: "പിഐബി പ്രധാന വാർത്ത · അടിസ്ഥാനസൗകര്യം",
    demo: "മാതൃകാ ഉള്ളടക്കം · പ്രസിദ്ധീകരിക്കുന്നതിന് മുമ്പ് പരിശോധിക്കുക",
    story: "വാർത്ത", stories: "വാർത്തകൾ", storyOne: "വാർത്ത"
  },
  kn: {
    topStories: "ಪ್ರಮುಖ ಸುದ್ದಿಗಳು", development: "ಅಭಿವೃದ್ಧಿ", innovation: "ನಾವೀನ್ಯತೆ",
    business: "ವ್ಯಾಪಾರ", markets: "ಮಾರುಕಟ್ಟೆಗಳು", exploreStories: "ಸುದ್ದಿಗಳನ್ನು ನೋಡಿ",
    searchPlaceholder: "ವಿಷಯಗಳು ಅಥವಾ ಮೂಲಗಳನ್ನು ಹುಡುಕಿ…", newest: "ಹೊಸವು ಮೊದಲು",
    oldest: "ಹಳೆಯವು ಮೊದಲು", headlineAZ: "ಶೀರ್ಷಿಕೆ A–Z", allStories: "ಎಲ್ಲಾ ಸುದ್ದಿಗಳು",
    scienceInnovation: "ವಿಜ್ಞಾನ ಮತ್ತು ನಾವೀನ್ಯತೆ", noStories: "ಈ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಸುದ್ದಿಗಳಿಲ್ಲ",
    tryDifferent: "ಬೇರೆ ಪದವನ್ನು ಹುಡುಕಿ ಅಥವಾ ಬೇರೆ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    resetFilters: "ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ", visitSource: "ಮೂಲವನ್ನು ನೋಡಿ ↗",
    publisher: "ಪ್ರಕಾಶಕರ ವೆಬ್‌ಸೈಟ್",
    featuredLabel: "ಪಿಐಬಿ ಪ್ರಮುಖ · ಮೂಲಸೌಕರ್ಯ",
    demo: "ಮಾದರಿ ವಿಷಯ · ಪ್ರಕಟಿಸುವ ಮೊದಲು ಪರಿಶೀಲಿಸಿ",
    story: "ಸುದ್ದಿ", stories: "ಸುದ್ದಿಗಳು", storyOne: "ಸುದ್ದಿ"
  },
  te: {
    topStories: "ముఖ్య వార్తలు", development: "అభివృద్ధి", innovation: "ఆవిష్కరణ",
    business: "వ్యాపారం", markets: "మార్కెట్లు", exploreStories: "వార్తలను చూడండి",
    searchPlaceholder: "అంశాలు లేదా మూలాలను వెతకండి…", newest: "కొత్తవి ముందు",
    oldest: "పాతవి ముందు", headlineAZ: "శీర్షిక A–Z", allStories: "అన్ని వార్తలు",
    scienceInnovation: "సైన్స్ మరియు ఆవిష్కరణ", noStories: "ఈ శోధనకు సరిపోయే వార్తలు లేవు",
    tryDifferent: "మరొక పదాన్ని వెతకండి లేదా వేరే వర్గాన్ని ఎంచుకోండి.",
    resetFilters: "ఫిల్టర్లను రీసెట్ చేయండి", visitSource: "మూలాన్ని చూడండి ↗",
    publisher: "ప్రచురణకర్త వెబ్‌సైట్",
    featuredLabel: "పీఐబీ ప్రధాన కథనం · మౌలిక సదుపాయాలు",
    demo: "నమూనా కంటెంట్ · ప్రచురించే ముందు ధృవీకరించండి",
    story: "వార్త", stories: "వార్తలు", storyOne: "వార్త"
  }
};

function getCurrentLanguage() {
  return translations[languageSelect?.value] ? languageSelect.value : "en";
}

function applyTranslations() {
  const language = getCurrentLanguage();
  const t = translations[language];

  const navLinks = document.querySelectorAll(".nav-link");
  const navKeys = ["topStories", "development", "innovation", "business", "markets"];
  navLinks.forEach((link, index) => {
    if (t[navKeys[index]]) link.textContent = t[navKeys[index]];
  });

  const heroButton = document.querySelector(".button-light");
  if (heroButton) heroButton.innerHTML = `${t.exploreStories} <span aria-hidden="true">↘</span>`;

  searchInput.placeholder = t.searchPlaceholder;
  sortSelect.options[0].textContent = t.newest;
  sortSelect.options[1].textContent = t.oldest;
  sortSelect.options[2].textContent = t.headlineAZ;

  const categoryButtons = categoryFilters.querySelectorAll(".category-chip");
  const categoryLabels = [t.allStories, t.development, t.scienceInnovation, t.business, t.markets];
  categoryButtons.forEach((button, index) => {
    if (categoryLabels[index]) button.textContent = categoryLabels[index];
  });

  emptyState.querySelector("h3").textContent = t.noStories;
  emptyState.querySelector("p").textContent = t.tryDifferent;
  resetFiltersButton.textContent = t.resetFilters;
  document.documentElement.lang = language;
  renderStories();
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "Date not provided";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  }).format(date);
}

function renderMarketCards() {
  marketGrid.innerHTML = marketData.map(item => `
    <article class="market-card">
      <div class="market-card-top">
        <span class="market-name">${escapeHTML(item.name)}</span>
        <span class="market-code">${escapeHTML(item.code)}</span>
      </div>
      <div class="market-value">${escapeHTML(item.value)}</div>
      <div class="market-change">${escapeHTML(item.change)}</div>
      <div class="market-card-foot">
        ${marketDataDate
          ? `Latest available close · ${escapeHTML(formatDate(marketDataDate))}`
          : "Loading daily closing data…"}
      </div>
    </article>
  `).join("");
}

async function loadMarketData() {
  const apiUrl = "https://api.tigzig.com/tremor/v1/market_series?symbols=%5ENSEI%2C%5EBSESN";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Market API returned ${response.status}`);

    const result = await response.json();
    const rows = (Array.isArray(result.data) ? result.data : [])
      .filter(row => row.date &&
        Number.isFinite(Number(row["^NSEI"])) &&
        Number.isFinite(Number(row["^BSESN"])))
      .sort((a, b) => a.date.localeCompare(b.date));

    if (!rows.length) throw new Error("No valid market data was returned.");

    const latest = rows[rows.length - 1];
    const previous = rows.length > 1 ? rows[rows.length - 2] : null;

    function makeMarketItem(name, code, symbol) {
      const value = Number(latest[symbol]);
      const oldValue = previous ? Number(previous[symbol]) : null;
      let change = "Previous close unavailable";
      let direction = "up";

      if (oldValue !== null && oldValue !== 0) {
        const percent = ((value - oldValue) / oldValue) * 100;
        direction = percent < 0 ? "down" : "up";
        change = `${percent > 0 ? "+" : ""}${percent.toFixed(2)}% vs previous close`;
      }

      return {
        name, code,
        value: value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change, direction
      };
    }

    marketData = [
      makeMarketItem("Nifty 50", "NSE", "^NSEI"),
      makeMarketItem("Sensex", "BSE", "^BSESN")
    ];
    marketDataDate = latest.date;
    renderMarketCards();
    console.log("Market data loaded for:", marketDataDate);
  } catch (error) {
    console.error("Could not load market data:", error);
    marketDataDate = "";
    marketData = marketData.map(item => ({
      ...item, value: "Unavailable", change: "Data temporarily unavailable"
    }));
    renderMarketCards();
  }
}

function getVisibleArticles() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = sampleArticles.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const searchableText = [
      article.title, article.category, article.source, article.summary,
      ...(article.tags || [])
    ].join(" ").toLowerCase();
    return matchesCategory && searchableText.includes(query);
  });

  const sortMode = sortSelect.value;
  visible.sort((a, b) => {
    // A qualifying PIB infrastructure story always stays first.
    const featuredDifference = Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
    if (featuredDifference !== 0) return featuredDifference;
    if (sortMode === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortMode === "az") return a.title.localeCompare(b.title);
    return new Date(b.date) - new Date(a.date);
  });
  return visible;
}

function renderStories() {
  const articles = getVisibleArticles();
  const language = getCurrentLanguage();
  const t = translations[language];

  storyCount.textContent = `${articles.length} ${articles.length === 1 ? t.storyOne : t.stories}`;
  emptyState.hidden = articles.length !== 0;
  storyGrid.hidden = articles.length === 0;

  storyGrid.innerHTML = articles.map((article, index) => {
    const translated = article.translations?.[language] || article.translations?.en || {};
    const title = translated.title || article.title;
    const summary = translated.summary || article.summary;
    const categoryNames = {
      Development: t.development,
      Innovation: t.innovation,
      Business: t.business,
      Markets: t.markets
    };
    const category = categoryNames[article.category] || article.category;

    return `
      <article class="story-card ${article.isFeatured ? "story-card-featured" : (index === 0 ? "" : "")}">
        <div class="story-visual"
          style="--visual-bg:${escapeHTML(article.visualBg || "#e2f0ed")};--visual-ink:${escapeHTML(article.visualInk || "#276b5c")}">
          ${article.imageUrl ? `
            <img class="story-image"
              src="${escapeHTML(article.imageUrl)}"
              alt="${escapeHTML(title)}"
              loading="lazy"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
          ` : ""}
          <span class="visual-icon"
            style="${article.imageUrl ? "display:none;" : ""}"
            aria-hidden="true">${escapeHTML(article.icon || "📰")}</span>
          <span class="visual-index">${escapeHTML(t.story.toUpperCase())} ${String(index + 1).padStart(2, "0")}</span>
        </div>
        <div class="story-content">
          <div class="story-meta">
            ${article.isFeatured ? `<span class="story-category story-featured-label">${escapeHTML(t.featuredLabel)}</span>` : ""}
            <span class="story-category">${escapeHTML(category)}</span>
            <span class="meta-dot" aria-hidden="true"></span>
            <time datetime="${escapeHTML(article.date)}">${escapeHTML(formatDate(article.date))}</time>
          </div>
          ${article.isSample === false ? "" : `<span class="sample-label">${escapeHTML(t.demo)}</span>`}
          <h3>${escapeHTML(title)}</h3>
          <p class="story-summary">${escapeHTML(summary)}</p>
          <div class="story-source">
            <span class="source-avatar" aria-hidden="true">${escapeHTML((article.sourceShort || article.source || "NEWS").slice(0, 3).toUpperCase())}</span>
            <span class="source-copy">
              <strong>${escapeHTML(article.source || "News source")}</strong>
              <small>${escapeHTML(t.publisher)}</small>
            </span>
            <a class="source-link" href="${escapeHTML(article.articleUrl || article.sourceUrl || "#")}"
              target="_blank" rel="noopener noreferrer"
              aria-label="${escapeHTML(t.visitSource)}">
              ${escapeHTML(t.visitSource)}
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function setActiveCategory(category) {
  activeCategory = category;
  categoryFilters.querySelectorAll("[data-category]").forEach(button => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("selected", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderStories();
}

categoryFilters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  setActiveCategory(button.dataset.category);
});

searchInput.addEventListener("input", renderStories);
sortSelect.addEventListener("change", renderStories);

resetFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  sortSelect.value = "newest";
  setActiveCategory("All");
  searchInput.focus();
});

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

primaryNav.addEventListener("click", event => {
  const link = event.target.closest("a");
  if (!link) return;

  const navCategories = {
    "#top-stories": "All",
    "#development": "Development",
    "#innovation": "Innovation",
    "#business": "Business",
    "#markets": "Markets"
  };
  const category = navCategories[link.getAttribute("href")];

  if (category) {
    event.preventDefault();
    setActiveCategory(category);
    document.querySelector("#main")?.scrollIntoView({ behavior: "smooth" });
  }

  primaryNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", event => {
  const target = event.target;
  const isTyping = target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

  if (event.key === "/" && !isTyping &&
      !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    renderStories();
    searchInput.blur();
  }
});

languageSelect.addEventListener("change", applyTranslations);
renderMarketCards();
renderStories();
loadFetchedNews();
loadMarketData();
