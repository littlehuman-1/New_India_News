/*
  Positive India — starter data and interactions.

  IMPORTANT:
  - The stories below are illustrative sample content, NOT verified news reports.
  - Replace each sample with a verified story and the direct article URL before launch.
  - Source-site links below lead to the publishers' official sites, not to the sample story.
  - Market figures are fictional demo values and must never be presented as live data.
*/

let sampleArticles = [
  
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
  icon: "☀️",
  visualBg: "#f7efcf",
  visualInk: "#8d7023",
  tags: [
    "Gujarat",
    "rooftop solar",
    "renewable energy",
    "PM Surya Ghar",
    "subsidy",
    "development"
  ],
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
    icon: "🛰",
    visualBg: "#e7e9f7",
    visualInk: "#4d5698",
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
    icon: "⚙",
    visualBg: "#f8ead6",
    visualInk: "#8c6026",
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
    icon: "☀",
    visualBg: "#f7efcf",
    visualInk: "#8d7023",
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
    icon: "📈",
    visualBg: "#e2f0ed",
    visualInk: "#276b5c",
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
    icon: "₹",
    visualBg: "#f1e5ef",
    visualInk: "#80517b",
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
  icon: "🔋",
  visualBg: "#e2f0ed",
  visualInk: "#276b5c",
  tags: [
    "battery storage",
    "renewable energy",
    "clean energy",
    "infrastructure",
    "development"
  ],
  isSample: false
},

];
async function loadFetchedNews() {
  try {
    const response = await fetch("./news.json");

    if (!response.ok) {
      throw new Error(`Could not load news.json: ${response.status}`);
    }

    const data = await response.json();
    const existingUrls = new Set(
      sampleArticles.map((article) => article.articleUrl)
    );

    const fetchedArticles = (
      Array.isArray(data.articles) ? data.articles : []
    )
      .filter(
        (article) =>
          article.articleUrl && !existingUrls.has(article.articleUrl)
      )
      .map((article, index) => ({
        ...article,
        id: `auto-${index}`,
        isSample: false,
        icon: article.icon || "📰",
        visualBg: article.visualBg || "#e2f0ed",
        visualInk: article.visualInk || "#276b5c",
        tags: Array.isArray(article.tags) ? article.tags : [],
      }));

    sampleArticles.push(...fetchedArticles);
    renderStories();

    console.log(`Loaded ${fetchedArticles.length} fetched news stories.`);
  } catch (error) {
    console.error("Automatic news loading failed:", error);
  }
}
// These values are fictional layout examples. They are intentionally marked DEMO.


let marketData = [
  {
    name: "Nifty 50",
    code: "NSE",
    value: "—",
    change: "Daily close",
    direction: "up"
  },
  {
    name: "Sensex",
    code: "BSE",
    value: "—",
    change: "Daily close",
    direction: "up"
  }
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
    topStories: "Top stories",
    development: "Development",
    innovation: "Innovation",
    business: "Business",
    markets: "Markets",
    exploreStories: "Explore the stories",
    searchPlaceholder: "Search topics, sources or keywords…",
    newest: "Newest first",
    oldest: "Oldest first",
    headlineAZ: "Headline A–Z",
    allStories: "All stories",
    scienceInnovation: "Science & innovation",
    noStories: "No stories match that search",
    tryDifferent: "Try a different keyword or choose another category.",
    resetFilters: "Reset filters",
    visitSource: "Visit source ↗"
  },

  hi: {
    topStories: "मुख्य समाचार",
    development: "विकास",
    innovation: "नवाचार",
    business: "व्यापार",
    markets: "बाज़ार",
    exploreStories: "समाचार पढ़ें",
    searchPlaceholder: "विषय, स्रोत या शब्द खोजें…",
    newest: "नवीनतम पहले",
    oldest: "सबसे पुराने पहले",
    headlineAZ: "शीर्षक A–Z",
    allStories: "सभी समाचार",
    scienceInnovation: "विज्ञान और नवाचार",
    noStories: "इस खोज से कोई समाचार नहीं मिला",
    tryDifferent: "दूसरा शब्द खोजें या कोई अन्य श्रेणी चुनें।",
    resetFilters: "फ़िल्टर रीसेट करें",
    visitSource: "स्रोत देखें ↗"
  },

  ta: {
    topStories: "முக்கிய செய்திகள்",
    development: "வளர்ச்சி",
    innovation: "புதுமை",
    business: "வணிகம்",
    markets: "சந்தைகள்",
    exploreStories: "செய்திகளைப் பாருங்கள்",
    searchPlaceholder: "தலைப்புகள் அல்லது ஆதாரங்களைத் தேடுங்கள்…",
    newest: "புதியவை முதலில்",
    oldest: "பழையவை முதலில்",
    headlineAZ: "தலைப்பு A–Z",
    allStories: "அனைத்துச் செய்திகள்",
    scienceInnovation: "அறிவியல் மற்றும் புதுமை",
    noStories: "இந்தத் தேடலுக்குப் பொருத்தமான செய்திகள் இல்லை",
    tryDifferent: "வேறு சொல்லைத் தேடுங்கள் அல்லது வேறு பிரிவைத் தேர்ந்தெடுக்கவும்.",
    resetFilters: "வடிகட்டிகளை மீட்டமை",
    visitSource: "ஆதாரத்தைப் பார்க்க ↗"
  },

  ml: {
    topStories: "പ്രധാന വാർത്തകൾ",
    development: "വികസനം",
    innovation: "നവീകരണം",
    business: "വ്യാപാരം",
    markets: "വിപണികൾ",
    exploreStories: "വാർത്തകൾ കാണുക",
    searchPlaceholder: "വിഷയങ്ങളോ ഉറവിടങ്ങളോ തിരയുക…",
    newest: "പുതിയത് ആദ്യം",
    oldest: "പഴയത് ആദ്യം",
    headlineAZ: "തലക്കെട്ട് A–Z",
    allStories: "എല്ലാ വാർത്തകളും",
    scienceInnovation: "ശാസ്ത്രവും നവീകരണവും",
    noStories: "ഈ തിരയലിന് അനുയോജ്യമായ വാർത്തകളില്ല",
    tryDifferent: "മറ്റൊരു വാക്ക് തിരയുക അല്ലെങ്കിൽ മറ്റൊരു വിഭാഗം തിരഞ്ഞെടുക്കുക.",
    resetFilters: "ഫിൽട്ടറുകൾ പുനഃസജ്ജമാക്കുക",
    visitSource: "ഉറവിടം കാണുക ↗"
  },

  kn: {
    topStories: "ಪ್ರಮುಖ ಸುದ್ದಿಗಳು",
    development: "ಅಭಿವೃದ್ಧಿ",
    innovation: "ನಾವೀನ್ಯತೆ",
    business: "ವ್ಯಾಪಾರ",
    markets: "ಮಾರುಕಟ್ಟೆಗಳು",
    exploreStories: "ಸುದ್ದಿಗಳನ್ನು ನೋಡಿ",
    searchPlaceholder: "ವಿಷಯಗಳು ಅಥವಾ ಮೂಲಗಳನ್ನು ಹುಡುಕಿ…",
    newest: "ಹೊಸವು ಮೊದಲು",
    oldest: "ಹಳೆಯವು ಮೊದಲು",
    headlineAZ: "ಶೀರ್ಷಿಕೆ A–Z",
    allStories: "ಎಲ್ಲಾ ಸುದ್ದಿಗಳು",
    scienceInnovation: "ವಿಜ್ಞಾನ ಮತ್ತು ನಾವೀನ್ಯತೆ",
    noStories: "ಈ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಸುದ್ದಿಗಳಿಲ್ಲ",
    tryDifferent: "ಬೇರೆ ಪದವನ್ನು ಹುಡುಕಿ ಅಥವಾ ಬೇರೆ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    resetFilters: "ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ",
    visitSource: "ಮೂಲವನ್ನು ನೋಡಿ ↗"
  },

  te: {
    topStories: "ముఖ్య వార్తలు",
    development: "అభివృద్ధి",
    innovation: "ఆవిష్కరణ",
    business: "వ్యాపారం",
    markets: "మార్కెట్లు",
    exploreStories: "వార్తలను చూడండి",
    searchPlaceholder: "అంశాలు లేదా మూలాలను వెతకండి…",
    newest: "కొత్తవి ముందు",
    oldest: "పాతవి ముందు",
    headlineAZ: "శీర్షిక A–Z",
    allStories: "అన్ని వార్తలు",
    scienceInnovation: "సైన్స్ మరియు ఆవిష్కరణ",
    noStories: "ఈ శోధనకు సరిపోయే వార్తలు లేవు",
    tryDifferent: "మరొక పదాన్ని వెతకండి లేదా వేరే వర్గాన్ని ఎంచుకోండి.",
    resetFilters: "ఫిల్టర్లను రీసెట్ చేయండి",
    visitSource: "మూలాన్ని చూడండి ↗"
  }
};
function applyTranslations() {
  const language = translations[languageSelect.value]
    ? languageSelect.value
    : "en";

  const t = translations[language];

  // Main navigation
  const navLinks = document.querySelectorAll(".nav-link");
  const navKeys = [
    "topStories",
    "development",
    "innovation",
    "business",
    "markets"
  ];

  navLinks.forEach((link, index) => {
    link.textContent = t[navKeys[index]];
  });

  // Hero button
  const heroButton = document.querySelector(".button-light");
  if (heroButton) {
    heroButton.innerHTML =
      `${t.exploreStories} <span aria-hidden="true">↘</span>`;
  }

  // Search box
  searchInput.placeholder = t.searchPlaceholder;

  // Sorting options
  sortSelect.options[0].textContent = t.newest;
  sortSelect.options[1].textContent = t.oldest;
  sortSelect.options[2].textContent = t.headlineAZ;

  // Story category buttons
  const categoryButtons =
    categoryFilters.querySelectorAll(".category-chip");

  const categoryLabels = [
    t.allStories,
    t.development,
    t.scienceInnovation,
    t.business,
    t.markets
  ];

  categoryButtons.forEach((button, index) => {
    button.textContent = categoryLabels[index];
  });

  // Empty search results
  emptyState.querySelector("h3").textContent = t.noStories;
  emptyState.querySelector("p").textContent = t.tryDifferent;

  // Reset button
  resetFiltersButton.textContent = t.resetFilters;

  // Update the document language
  document.documentElement.lang = language;

  // Refresh the story cards
  renderStories();
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "Date not provided";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

function renderMarketCards() {
  marketGrid.innerHTML = marketData.map((item) => `
    <article class="market-card">
      <div class="market-card-top">
        <span class="market-name">${escapeHTML(item.name)}</span>
        <span class="market-code">${escapeHTML(item.code)}</span>
      </div>
      <div class="market-value">${escapeHTML(item.value)}</div>
      <div class="market-change">
        ${escapeHTML(item.change)}
      </div>
      <div class="market-card-foot">
        ${marketDataDate
          ? `Latest available close · ${escapeHTML(formatDate(marketDataDate))}`
          : "Loading daily closing data…"}
      </div>
    </article>
  `).join("");
}

async function loadMarketData() {
  const apiUrl =
    "https://api.tigzig.com/tremor/v1/market_series?symbols=%5ENSEI%2C%5EBSESN";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Market API returned ${response.status}`);
    }

    const result = await response.json();

    const rows = (Array.isArray(result.data) ? result.data : [])
      .filter((row) =>
        row.date &&
        Number.isFinite(Number(row["^NSEI"])) &&
        Number.isFinite(Number(row["^BSESN"]))
      )
      .sort((a, b) => a.date.localeCompare(b.date));

    if (rows.length === 0) {
      throw new Error("No valid market data was returned.");
    }

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
        name,
        code,
        value: value.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        change,
        direction
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
    marketData = marketData.map((item) => ({
      ...item,
      value: "Unavailable",
      change: "Data temporarily unavailable"
    }));

    renderMarketCards();
  }
}

function getVisibleArticles() {
  const query = searchInput.value.trim().toLowerCase();

  const visible = sampleArticles.filter((article) => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const searchableText = [
      article.title,
      article.category,
      article.source,
      article.summary,
      ...(article.tags || [])
    ].join(" ").toLowerCase();

    return matchesCategory && searchableText.includes(query);
  });

  const sortMode = sortSelect.value;
  visible.sort((a, b) => {
    if (sortMode === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortMode === "az") return a.title.localeCompare(b.title);
    return new Date(b.date) - new Date(a.date);
  });

  return visible;
}

function renderStories() {
  const articles = getVisibleArticles();

  storyCount.textContent = `${articles.length} ${articles.length === 1 ? "story" : "stories"}`;
  emptyState.hidden = articles.length !== 0;
  storyGrid.hidden = articles.length === 0;

  storyGrid.innerHTML = articles.map((article, index) => `
    <article class="story-card ${index === 0 ? "story-card-featured" : ""}">
     <div class="story-visual"
  style="--visual-bg:${escapeHTML(article.visualBg)};--visual-ink:${escapeHTML(article.visualInk)}">

  ${article.imageUrl ? `
    <img
      class="story-image"
      src="${escapeHTML(article.imageUrl)}"
      alt="${escapeHTML(article.title)}"
      loading="lazy"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
    >
  ` : ""}

  <span class="visual-icon"
    style="${article.imageUrl ? "display:none;" : ""}"
    aria-hidden="true">${escapeHTML(article.icon)}</span>

  <span class="visual-index">STORY ${String(index + 1).padStart(2, "0")}</span>
</div>
      <div class="story-content">
        <div class="story-meta">
          <span class="story-category">${escapeHTML(article.category)}</span>
          <span class="meta-dot" aria-hidden="true"></span>
          <time datetime="${escapeHTML(article.date)}">${escapeHTML(formatDate(article.date))}</time>
        </div>
        ${article.isSample === false ? "" : '<span class="sample-label">DEMO CONTENT · VERIFY BEFORE USE</span>'}
        <h3>${escapeHTML(article.title)}</h3>
        <p class="story-summary">${escapeHTML(article.summary)}</p>
        <div class="story-source">
          <span class="source-avatar" aria-hidden="true">${escapeHTML(article.sourceShort.slice(0, 3).toUpperCase())}</span>
          <span class="source-copy">
            <strong>${escapeHTML(article.source)}</strong>
            <small>Publisher website</small>
          </span>
          <a class="source-link" href="${escapeHTML(article.articleUrl)}"
            target="_blank" rel="noopener noreferrer"
            aria-label="Visit ${escapeHTML(article.source)} website (opens in a new tab)">
            Visit source ↗
          </a>
        </div>
      </div>
    </article>
  `).join("");
}

function setActiveCategory(category) {
  activeCategory = category;
  categoryFilters.querySelectorAll("[data-category]").forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("selected", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderStories();
}

categoryFilters.addEventListener("click", (event) => {
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



primaryNav.addEventListener("click", (event) => {
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
    setActiveCategory(navCategories[label]);
    document.querySelector("#main")?.scrollIntoView({
      behavior: "smooth"
    });
  }

  primaryNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
});
 


 // Keyboard shortcut: press / to focus the search field, unless already typing.
document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

  if (
    event.key === "/" &&
    !isTyping &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey
  ) {
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
