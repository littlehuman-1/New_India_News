
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.parse import urlparse

OUTPUT_FILE = Path("news.json")
MAX_ARTICLES = 100


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


def parse_date(value):
    if not value:
        return datetime.now(timezone.utc).date().isoformat()

    try:
        return parsedate_to_datetime(value).date().isoformat()
    except (TypeError, ValueError, OverflowError):
        return datetime.now(timezone.utc).date().isoformat()


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
            "summary": summary[:500],
            "icon": "📰",
            "visualBg": "#e2f0ed",
            "visualInk": "#276b5c",
            "tags": [category.lower(), feed["name"].lower()],
            "isSample": False,
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

    articles = sorted(
        by_url.values(),
        key=lambda article: article.get("date", ""),
        reverse=True,
    )[:MAX_ARTICLES]

    OUTPUT_FILE.write_text(
        json.dumps(
            {
                "updatedAt": datetime.now(timezone.utc).isoformat(),
                "articles": articles,
            },
            ensure_ascii=False,
            indent=2,
        ) + "\n",
        encoding="utf-8",
    )

    print(f"Saved {len(articles)} articles to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
