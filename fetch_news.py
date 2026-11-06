import json
import re
import html
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from difflib import SequenceMatcher
from pathlib import Path
from urllib.parse import urlparse, urljoin, urldefrag


OUTPUT_FILE = Path("news.json")
MAX_ARTICLES = 100
MAX_AGE_DAYS = 30
USER_AGENT = "GrowingIndiaNewsBot/1.0"

# A PIB item can be featured only if it is genuinely from PIB and concerns
# infrastructure. No other publisher can be substituted as the PIB lead.
PIB_INFRASTRUCTURE_KEYWORDS = [
    "infrastructure", "railway", "railways", "rail line", "vande bharat",
    "station redevelopment", "dedicated freight", "highway", "national highway",
    "road project", "bridge", "expressway", "metro rail", "airport",
    "aviation infrastructure", "port", "waterway", "shipping",
    "power transmission", "power grid", "electricity transmission",
    "renewable energy capacity", "solar park", "wind power", "battery storage",
    "broadband", "5g network", "telecom network", "data centre", "semiconductor",
]

FEEDS = [
    {
        "name": "Mongabay India",
        "url": "https://india.mongabay.com/feed/",
        "category": "Development",
    },
    {
        "name": "Down To Earth",
        "url": "https://www.downtoearth.org.in/rss",
        "category": "Development",
    },
    {
        "name": "SolarQuarter",
        "url": "https://solarquarter.com/feed/",
        "category": "Innovation",
    },
    {
        "name": "Press Information Bureau",
        "url": "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1",
        "category": "Development",
    },
    {
        "name": "ET Government - Smart Infrastructure",
        "url": "https://government.economictimes.indiatimes.com/rss/smart-infra",
        "category": "Development",
    },
    {
        "name": "ET Government - Digital India",
        "url": "https://government.economictimes.indiatimes.com/rss/digital-india",
        "category": "Innovation",
    },
    {
        "name": "ET Government - Technology",
        "url": "https://government.economictimes.indiatimes.com/rss/technology",
        "category": "Innovation",
    },
    {
        "name": "ET Government - Mobility",
        "url": "https://government.economictimes.indiatimes.com/rss/mobility",
        "category": "Business",
    },
    {
        "name": "ET Government - Defence",
        "url": "https://government.economictimes.indiatimes.com/rss/Defence",
        "category": "Innovation",
    },
    {
        "name": "ET Government - Economy",
        "url": "https://government.economictimes.indiatimes.com/rss/economy",
        "category": "Markets",
    },
    {
        "name": "ET Government - Policy",
        "url": "https://government.economictimes.indiatimes.com/rss/policy",
        "category": "Development",
    },
]

KEYWORDS = {
    "Development": [
        "india", "rural", "education", "health", "hospital",
        "infrastructure", "development", "farmer", "agriculture",
        "water", "village", "railway", "railways", "train",
        "highway", "road", "bridge", "metro", "port",
        "renewable", "solar", "clean energy", "conservation",
        "forest", "wildlife", "biodiversity", "climate",
        "environment", "electricity", "sanitation",
    ],
    "Innovation": [
        "india", "technology", "innovation", "research",
        "scientist", "startup", "semiconductor", "chip",
        "artificial intelligence", "robotics", "drone",
        "space", "satellite", "isro", "defence", "defense",
        "research and development", "battery", "electric vehicle",
        "clean energy", "telecom", "5g", "6g", "digital",
    ],
    "Business": [
        "india", "business", "startup", "manufacturing",
        "employment", "small business", "export", "investment",
        "automotive", "automobile", "electric vehicle",
        "factory", "production", "industrial", "industry",
        "electronics", "semiconductor", "job creation",
        "infrastructure project",
    ],
    "Markets": [
        "india", "market", "economy", "trade", "industry",
        "exports", "stock market", "nifty", "sensex",
        "rbi", "interest rate", "repo rate", "inflation",
        "banking", "financial results", "quarterly results",
        "profit", "revenue", "fixed deposit", "fd rate",
        "loan rate", "interest income", "investment",
    ],
}

# India references used for SolarQuarter's India-relevance check.
# Indian companies are included so their overseas projects are not discarded.
INDIA_REFERENCES = [
    "india", "indian", "bharat", "new delhi", "mumbai", "pune",
    "bengaluru", "bangalore", "hyderabad", "chennai", "kolkata",
    "ahmedabad", "gandhinagar", "jaipur", "lucknow", "noida",
    "greater noida", "gurugram", "gurgaon", "kerala", "tamil nadu",
    "karnataka", "maharashtra", "gujarat", "rajasthan", "odisha",
    "uttar pradesh", "madhya pradesh", "telangana", "andhra pradesh",
    "assam", "bihar", "jharkhand", "uttarakhand", "himachal",
    "punjab", "haryana", "west bengal", "jammu", "kashmir",
    "ladakh", "goa", "sikkim", "meghalaya", "manipur", "tripura",
    "arunachal", "mizoram", "nagaland", "chhattisgarh",
    "ntpc", "nhpc", "ongc", "ireda", "iex", "sjvn", "coal india",
    "waaree", "avaada", "adani", "tata power", "reliance",
    "re new", "renew", "rayzon", "swelect", "polycab",
    "borosil", "indus towers", "essar", "juniper green",
    "sterling and wilson", "anant technologies", "isro", "drdo",
    "power grid corporation", "bharat electronics", "hal",
    "hindustan aeronautics", "indian navy", "indian air force",
    "ministry of", "union cabinet", "government of india",
]

# Known generic SolarQuarter image patterns. Rejecting these is preferable
# to showing a stock image that may misrepresent the article.
GENERIC_IMAGE_PATTERNS = [
    "pexels-photo-",
    "/2020/04/1.png",
    "/2020/04/2.png",
    "/2020/04/7.png",
    "/2020/04/9.png",
    "/2020/04/10.png",
    "/2020/04/11.png",
    "/2022/10/9-2.png",
    "/2022/10/11-3.png",
    "/2022/10/14-1.png",
    "/2022/10/22-3.png",
]


def clean_text(value):
    """Remove HTML markup and common feed metadata noise."""
    value = html.unescape(value or "")
    # Decode a second time because some feeds double-escape their HTML.
    value = html.unescape(value)

    value = re.sub(r"<!--.*?-->", " ", value, flags=re.DOTALL)
    value = re.sub(
        r"<(script|style)\b[^>]*>.*?</\1\s*>",
        " ",
        value,
        flags=re.IGNORECASE | re.DOTALL,
    )
    # Remove complete media elements before stripping the remaining tags;
    # otherwise image attributes can leak into the visible summary.
    value = re.sub(
        r"<(figure|picture)\b[^>]*>.*?</\1\s*>",
        " ",
        value,
        flags=re.IGNORECASE | re.DOTALL,
    )
    value = re.sub(
        r"<(img|source|video|iframe)\b[^>]*>",
        " ",
        value,
        flags=re.IGNORECASE | re.DOTALL,
    )
    value = re.sub(r"<[^>]+>", " ", value)

    # Clean malformed/partially escaped WordPress image metadata that some
    # RSS descriptions include as plain text.
    value = re.sub(
        r"""["']?(?:data-image-title|data-image-description|data-image-caption|data-large-file|data-srcset)["']?\s*[:=]\s*["'][^"']*["']""",
        " ",
        value,
        flags=re.IGNORECASE,
    )
    value = re.sub(
        r"""["']?(?:title|alt|src|srcset|class|width|height)["']\s*:\s*["'][^"']*["']""",
        " ",
        value,
        flags=re.IGNORECASE,
    )
    value = re.sub(r"\bPexels\.com\b", " ", value, flags=re.IGNORECASE)
    value = value.replace(', }" />', ' ')
    value = re.sub(r"\s+", " ", value).strip(" \t\r\n|,;")
    return value


def clean_url(value, base_url=""):
    value = html.unescape((value or "").strip()).strip("'\"")
    if not value:
        return ""
    if value.startswith("//"):
        value = "https:" + value
    if base_url:
        value = urljoin(base_url, value)
    value, _fragment = urldefrag(value)
    return value


def is_pib_source(article):
    source = (article.get("source") or "").lower()
    url = (article.get("articleUrl") or "").lower()
    return "press information bureau" in source or "pib.gov.in" in url


def is_pib_infrastructure(article):
    if not is_pib_source(article):
        return False
    text = f"{article.get('title', '')} {article.get('summary', '')}".lower()
    return any(word in text for word in PIB_INFRASTRUCTURE_KEYWORDS)


def is_india_relevant(article):
    """Keep India-focused reporting and clearly India-linked companies/projects."""
    source = (article.get("source") or "").lower()
    url = (article.get("articleUrl") or "").lower()
    text = f"{article.get('title', '')} {article.get('summary', '')}".lower()

    # These sources/feeds are explicitly India-focused or Government of India.
    if "pib.gov.in" in url or "press information bureau" in source:
        return True
    if "mongabay india" in source or "downtoearth" in source:
        return True
    if "et government" in source:
        return True

    # SolarQuarter is global, so require an India reference or an Indian entity.
    if "solarquarter" in source or "solarquarter.com" in url:
        return any(reference in text for reference in INDIA_REFERENCES)

    # For any future feed, require a clear India reference.
    return any(reference in text for reference in INDIA_REFERENCES)


def image_is_generic(image_url, source=""):
    candidate = (image_url or "").lower()
    if not candidate:
        return False
    if "solarquarter" in (source or "").lower():
        return any(pattern in candidate for pattern in GENERIC_IMAGE_PATTERNS)
    return False


def improve_image_url(image_url, article_title=""):
    """Use the known sharper image URL for one verified article."""
    if not image_url:
        return ""
    if (
        "Direct-to-device connectivity and satellite IoT" in article_title
        and "etimg.etb2bimg.com" in image_url
    ):
        return "https://etimg.etb2bimg.com/photo/135286434.cms"
    return image_url


def text_of(element, path):
    found = element.find(path)
    return "".join(found.itertext()).strip() if found is not None else ""


def image_url_of(item, article_url, source=""):
    """Find the best image URL in RSS/Atom media fields or embedded HTML."""
    image_tags = {"content", "thumbnail", "enclosure"}
    candidates = []

    # Collect image media fields and ignore non-image enclosures.
    for element in item.iter():
        tag = element.tag.split("}")[-1].lower()
        url = ""

        if tag in image_tags:
            url = element.attrib.get("url", "")

        elif tag == "link" and element.attrib.get("rel", "").lower() == "enclosure":
            media_type = element.attrib.get("type", "").lower()
            if media_type.startswith("image/"):
                url = element.attrib.get("href", "")

        if url:
            media_type = element.attrib.get("type", "").lower()
            if tag == "enclosure" and media_type and not media_type.startswith("image/"):
                continue
            url = clean_url(url, article_url)
            if url.startswith(("https://", "http://")) and url not in candidates:
                candidates.append(url)

    # Some feeds place the image inside description/content HTML.
    for element in item.iter():
        tag = element.tag.split("}")[-1].lower()
        if tag not in {"description", "summary", "content", "encoded"}:
            continue

        fragment = html.unescape("".join(element.itertext()))
        matches = re.findall(
            r"""<img\b[^>]*?\b(?:src|data-src)\s*=\s*["']([^"']+)["']""",
            fragment,
            flags=re.IGNORECASE,
        )
        for candidate in matches:
            url = clean_url(candidate, article_url)
            if url.startswith(("https://", "http://")) and url not in candidates:
                candidates.append(url)

    # Prefer a non-generic image rather than returning the first stock image.
    for candidate in candidates:
        if not image_is_generic(candidate, source):
            return candidate

    return candidates[0] if candidates else ""


def parse_date(value):
    if not value:
        return ""
    try:
        parsed = parsedate_to_datetime(value)
    except (TypeError, ValueError, OverflowError):
        try:
            parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        except (TypeError, ValueError, OverflowError):
            return ""

    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc).date().isoformat()


def get_item_link(item):
    # RSS usually has a text link; Atom normally has a link href attribute.
    link = text_of(item, "link")
    if link:
        return clean_url(link)

    atom_link = item.find("{http://www.w3.org/2005/Atom}link")
    if atom_link is not None:
        return clean_url(atom_link.attrib.get("href", ""))

    for element in item.iter():
        if element.tag.split("}")[-1].lower() == "link":
            href = element.attrib.get("href")
            if href:
                return clean_url(href)
    return ""


def fetch_feed(feed):
    request = urllib.request.Request(
        feed["url"],
        headers={"User-Agent": USER_AGENT},
    )

    with urllib.request.urlopen(request, timeout=25) as response:
        root = ET.fromstring(response.read())

    items = root.findall(".//item")
    if not items:
        items = root.findall(".//{http://www.w3.org/2005/Atom}entry")

    articles = []

    for item in items:
        title = (
            text_of(item, "title")
            or text_of(item, "{http://www.w3.org/2005/Atom}title")
        )
        title = clean_text(title)
        link = get_item_link(item)

        summary_raw = (
            text_of(item, "description")
            or text_of(item, "{http://www.w3.org/2005/Atom}summary")
            or text_of(item, "{http://www.w3.org/2005/Atom}content")
        )
        summary = clean_text(summary_raw)

        published = (
            text_of(item, "pubDate")
            or text_of(item, "{http://www.w3.org/2005/Atom}published")
            or text_of(item, "{http://www.w3.org/2005/Atom}updated")
        )

        if not title or not link:
            continue

        category = feed["category"]
        haystack = f"{title} {summary}".lower()
        if not any(word in haystack for word in KEYWORDS[category]):
            continue

        draft = {
            "title": title,
            "summary": summary,
            "source": feed["name"],
            "articleUrl": link,
        }
        if not is_india_relevant(draft):
            continue

        domain = urlparse(feed["url"]).netloc.removeprefix("www.")
        image_url = image_url_of(item, link, feed['name'])
        image_url = improve_image_url(image_url, title)
        if image_is_generic(image_url, feed["name"]):
            image_url = ""

        articles.append({
            "title": title,
            "category": category,
            "date": parse_date(published),
            "source": feed["name"],
            "sourceShort": feed["name"][:3].upper(),
            "sourceUrl": f"https://{domain}/",
            "articleUrl": link,
            "imageUrl": image_url,
            "summary": summary[:500],
            "icon": "📰",
            "visualBg": "#e2f0ed",
            "visualInk": "#276b5c",
            "tags": [category.lower(), feed["name"].lower()],
            "isSample": False,
            "isFeatured": False,
        })

    return articles


def normalise_title(title):
    title = (title or "").lower()
    title = re.sub(r"[^a-z0-9]+", " ", title)
    return re.sub(r"\s+", " ", title).strip()


def are_duplicate_articles(first, second):
    """Conservative title similarity check to catch cross-publisher duplicates."""
    a = normalise_title(first.get("title", ""))
    b = normalise_title(second.get("title", ""))
    if not a or not b:
        return False
    if a == b:
        return True

    # Avoid comparing very short headlines, where similarity is unreliable.
    if min(len(a), len(b)) < 28:
        return False

    return SequenceMatcher(None, a, b).ratio() >= 0.88


def deduplicate_articles(articles):
    """Prefer the fuller/official version when two headlines are near-identical."""
    # Stable preference: PIB, ET Government, Mongabay/Down To Earth, then others.
    def source_priority(article):
        source = (article.get("source") or "").lower()
        if "press information bureau" in source or "pib.gov.in" in (article.get("articleUrl") or "").lower():
            return 0
        if "et government" in source:
            return 1
        if "mongabay" in source or "down to earth" in source:
            return 2
        return 3

    ordered = sorted(
        articles,
        key=lambda item: (
            source_priority(item),
            -(len(item.get("summary") or "")),
            item.get("date") or "",
        ),
        reverse=False,
    )

    kept = []
    for article in ordered:
        duplicate_index = next(
            (index for index, existing in enumerate(kept)
             if are_duplicate_articles(article, existing)),
            None,
        )
        if duplicate_index is None:
            kept.append(article)
        else:
            existing = kept[duplicate_index]
            # Preserve an image if the preferred version has none.
            if not existing.get("imageUrl") and article.get("imageUrl"):
                existing["imageUrl"] = article["imageUrl"]
            # Keep the more informative summary.
            if len(article.get("summary") or "") > len(existing.get("summary") or ""):
                existing["summary"] = article["summary"]

    return kept


def valid_recent_article(article, today):
    if not article.get("articleUrl") or not article.get("title"):
        return False

    article_date = article.get("date", "")
    try:
        parsed_date_value = datetime.fromisoformat(article_date).date()
    except (TypeError, ValueError):
        return False

    age_days = (today - parsed_date_value).days
    return 0 <= age_days <= MAX_AGE_DAYS


def main():
    if OUTPUT_FILE.exists():
        existing = json.loads(OUTPUT_FILE.read_text(encoding="utf-8"))
        if not isinstance(existing, dict):
            raise ValueError("news.json must contain a JSON object.")
    else:
        existing = {"articles": []}

    by_url = {}

    # Re-check old entries too, so old irrelevant stories and generic images
    # do not remain forever just because they were already in news.json.
    for article in existing.get("articles", []):
        if not isinstance(article, dict):
            continue
        url = clean_url(article.get("articleUrl", ""))
        if not url:
            continue
        article["articleUrl"] = url
        article["title"] = clean_text(article.get("title", ""))
        article["summary"] = clean_text(article.get("summary", ""))[:500]
        article["imageUrl"] = clean_url(article.get("imageUrl", ""))
        if not is_india_relevant(article):
            continue
        if image_is_generic(article.get("imageUrl", ""), article.get("source", "")):
            article["imageUrl"] = ""
        by_url[url] = article

    successful_feeds = 0

    for feed in FEEDS:
        try:
            fetched_articles = fetch_feed(feed)
            for article in fetched_articles:
                by_url[article["articleUrl"]] = article

            successful_feeds += 1
            print(
                f"Fetched {feed['name']}: "
                f"{len(fetched_articles)} India-relevant matching articles"
            )
        except Exception as error:
            print(f"Feed failed: {feed['name']}: {error}")

    if successful_feeds == 0:
        raise RuntimeError(
            "All feeds failed. Existing news.json was not changed."
        )

    today = datetime.now(timezone.utc).date()
    fresh_articles = [
        article for article in by_url.values()
        if valid_recent_article(article, today)
    ]

    # Reset all old featured flags before selecting the current PIB lead.
    for article in fresh_articles:
        article["isFeatured"] = False

    fresh_articles = deduplicate_articles(fresh_articles)

    pib_candidates = [
        article for article in fresh_articles
        if is_pib_infrastructure(article) and article.get("date")
    ]
    pib_candidates.sort(
        key=lambda article: article.get("date", ""),
        reverse=True,
    )
    featured_article = pib_candidates[0] if pib_candidates else None

    if featured_article:
        featured_article["isFeatured"] = True

    articles = sorted(
        fresh_articles,
        key=lambda article: article.get("date", ""),
        reverse=True,
    )[:MAX_ARTICLES]

    # Guarantee that the selected PIB lead remains in the published list.
    if featured_article and all(
        item.get("articleUrl") != featured_article.get("articleUrl")
        for item in articles
    ):
        articles[-1] = featured_article
        articles.sort(key=lambda article: article.get("date", ""), reverse=True)

    output = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "featuredArticleUrl": (
            featured_article.get("articleUrl") if featured_article else None
        ),
        "articles": articles,
    }

    OUTPUT_FILE.write_text(
        json.dumps(output, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Saved {len(articles)} articles to {OUTPUT_FILE}")
    if featured_article:
        print(
            "PIB infrastructure lead selected: "
            f"{featured_article['title']} ({featured_article['date']})"
        )
    else:
        print(
            "No qualifying PIB infrastructure release found. "
            "No substitute lead was selected."
        )


if __name__ == "__main__":
    main()
