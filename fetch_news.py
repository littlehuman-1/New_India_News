import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.parse import urlparse, urljoin

def improve_image_url(image_url, article_title=""):
    """Prefer a known sharper image URL for this specific article."""
    if not image_url:
        return image_url

    if (
        "Direct-to-device connectivity and satellite IoT"
        in article_title
        and "etimg.etb2bimg.com" in image_url
    ):
        return "https://etimg.etb2bimg.com/photo/135286434.cms"

    return image_url


OUTPUT_FILE = Path("news.json")
MAX_ARTICLES = 100
MAX_AGE_DAYS = 30

# A PIB item is eligible for the lead only when its title/summary clearly
# concerns physical, transport, energy or public digital infrastructure.
PIB_INFRASTRUCTURE_KEYWORDS = [
    "infrastructure", "railway", "railways", "rail line", "vande bharat",
    "station redevelopment", "dedicated freight", "highway", "national highway",
    "road project", "bridge", "expressway", "metro rail", "airport",
    "aviation infrastructure", "port", "waterway", "shipping",
    "power transmission", "power grid", "electricity transmission",
    "renewable energy capacity", "solar park", "wind power", "battery storage",
    "broadband", "5g network", "telecom network", "data centre", "semiconductor",
]


def is_pib_source(article):
    source = (article.get("source") or "").lower()
    url = (article.get("articleUrl") or "").lower()
    return "press information bureau" in source or "pib.gov.in" in url


def is_pib_infrastructure(article):
    if not is_pib_source(article):
        return False
    text = f"{article.get('title', '')} {article.get('summary', '')}".lower()
    return any(keyword in text for keyword in PIB_INFRASTRUCTURE_KEYWORDS)


FEEDS = [
    # Environment, forests, climate and conservation
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

    # Clean energy and renewable technology
    {
        "name": "SolarQuarter",
        "url": "https://solarquarter.com/feed/",
        "category": "Innovation",
    },

    # Official Government of India announcements
    {
        "name": "Press Information Bureau",
        "url": "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1",
        "category": "Development",
    },

    # Infrastructure, transport, industry and public technology
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

def text_of(element, path):
    found = element.find(path)
    return "".join(found.itertext()).strip() if found is not None else ""


def image_url_of(item, article_url):
    """Find a representative image URL in an RSS or Atom entry."""
    image_tags = {
        "content",
        "thumbnail",
        "enclosure",
    }

    # First: check standard image fields and media extensions.
    for element in item.iter():
        tag = element.tag.split("}")[-1].lower()
        url = ""

        if tag in image_tags:
            url = element.attrib.get("url", "")

        elif tag == "link" and element.attrib.get("rel") == "enclosure":
            media_type = element.attrib.get("type", "").lower()
            if media_type.startswith("image/"):
                url = element.attrib.get("href", "")

        if url:
            media_type = element.attrib.get("type", "").lower()
            if (
                tag == "enclosure"
                and media_type
                and not media_type.startswith("image/")
            ):
                continue

            if url.startswith(("https://", "http://", "/")):
                return urljoin(article_url, url)

    # Second: look for an image embedded in the description or content.
    for element in item.iter():
        tag = element.tag.split("}")[-1].lower()
        if tag not in {"description", "summary", "content", "encoded"}:
            continue

        html = "".join(element.itertext())
        match = re.search(
            r"""<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']""",
            html,
            flags=re.IGNORECASE,
        )

        if match:
            url = match.group(1).strip()
            if url.startswith(("https://", "http://", "/")):
                return urljoin(article_url, url)

    return ""

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


def fetch_feed(feed):
    request = urllib.request.Request(
        feed["url"],
        headers={"User-Agent": "PositiveIndiaNewsBot/1.0"},
    )

    with urllib.request.urlopen(request, timeout=20) as response:
        root = ET.fromstring(response.read())

    items = root.findall(".//item")

    if not items:
        items = root.findall(
            ".//{http://www.w3.org/2005/Atom}entry"
        )

    articles = []

    for item in items:
        title = (
            text_of(item, "title")
            or text_of(item, "{http://www.w3.org/2005/Atom}title")
        )

        link = text_of(item, "link")

        if not link:
            link_element = item.find(
                "{http://www.w3.org/2005/Atom}link"
            )
            if link_element is not None:
                link = link_element.attrib.get("href", "")

        summary = (
            text_of(item, "description")
            or text_of(item, "{http://www.w3.org/2005/Atom}summary")
            or text_of(item, "{http://www.w3.org/2005/Atom}content")
        )

        summary = re.sub(r"<[^>]+>", " ", summary)
        summary = re.sub(r"\s+", " ", summary).strip()

        published = (
            text_of(item, "pubDate")
            or text_of(
                item, "{http://www.w3.org/2005/Atom}published"
            )
            or text_of(
                item, "{http://www.w3.org/2005/Atom}updated"
            )
        )

        if not title or not link:
            continue

        category = feed["category"]
        haystack = f"{title} {summary}".lower()

        if not any(
            word in haystack for word in KEYWORDS[category]
        ):
            continue

        domain = urlparse(feed["url"]).netloc
        domain = domain.removeprefix("www.")

        articles.append({
            "title": title,
            "category": category,
            "date": parse_date(published),
            "source": feed["name"],
            "sourceShort": feed["name"][:3].upper(),
            "sourceUrl": f"https://{domain}/",
            "articleUrl": link,
            "imageUrl": improve_image_url(
            image_url_of(item, link),
            title
              ),
            "summary": summary[:500],
            "icon": "📰",
            "visualBg": "#e2f0ed",
            "visualInk": "#276b5c",
            "tags": [category.lower(), feed["name"].lower()],
            "isSample": False,
            "isFeatured": False,
        })

    return articles


def main():
    if OUTPUT_FILE.exists():
        existing = json.loads(
            OUTPUT_FILE.read_text(encoding="utf-8")
        )
    else:
        existing = {"articles": []}

    by_url = {}

    for article in existing.get("articles", []):
        if article.get("articleUrl"):
            by_url[article["articleUrl"]] = article

    successful_feeds = 0

    for feed in FEEDS:
        try:
            fetched_articles = fetch_feed(feed)

            for article in fetched_articles:
                by_url[article["articleUrl"]] = article

            successful_feeds += 1
            print(
                f"Fetched {feed['name']}: "
                f"{len(fetched_articles)} matching articles"
            )

        except Exception as error:
            print(f"Feed failed: {feed['name']}: {error}")

    if successful_feeds == 0:
        raise RuntimeError(
            "All feeds failed. Existing news.json was not changed."
        )

    if not by_url:
        raise RuntimeError(
            "No articles available. Existing news.json was not changed."
        )

    # Keep the public feed current and avoid carrying stale headlines forward.
    today = datetime.now(timezone.utc).date()
    fresh_by_url = {}
    for url, article in by_url.items():
        article_date = article.get("date", "")
        try:
            age_days = (today - datetime.fromisoformat(article_date).date()).days
        except (TypeError, ValueError):
            continue
        if 0 <= age_days <= MAX_AGE_DAYS:
            fresh_by_url[url] = article
    by_url = fresh_by_url

    # Reset old flags so a previously featured PIB release cannot remain pinned.
    for article in by_url.values():
        article["isFeatured"] = False

    # Choose the newest dated PIB infrastructure release only. If none qualifies,
    # featuredArticleUrl stays empty and the website displays no false PIB lead.
    pib_candidates = [
        article for article in by_url.values()
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
        by_url.values(),
        key=lambda article: article.get("date", ""),
        reverse=True,
    )[:MAX_ARTICLES]

    # Keep the selected lead inside the output even if it falls outside the cap.
    if featured_article and all(
        item.get("articleUrl") != featured_article.get("articleUrl") for item in articles
    ):
        articles[-1] = featured_article
        articles.sort(key=lambda article: article.get("date", ""), reverse=True)

    OUTPUT_FILE.write_text(
        json.dumps(
            {
                "updatedAt": datetime.now(timezone.utc).isoformat(),
                "featuredArticleUrl": featured_article.get("articleUrl") if featured_article else None,
                "articles": articles,
            },
            ensure_ascii=False,
            indent=2,
        ) + "\n",
        encoding="utf-8",
    )

    print(f"Saved {len(articles)} articles to {OUTPUT_FILE}")
    if featured_article:
        print(f"PIB infrastructure lead selected: {featured_article['title']} ({featured_article['date']})")
    else:
        print("No qualifying PIB infrastructure release found. No substitute lead was selected.")


if __name__ == "__main__":
    main()
