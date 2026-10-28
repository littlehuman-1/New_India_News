# Positive India — Starter Project

A responsive news-aggregation website prototype built with plain HTML, CSS and JavaScript.

## Important demo-data notice

- The article cards in this starter are **illustrative placeholders, not verified news reports**.
- Their links lead to the named publisher's official website, not to a specific article.
- Replace the title, date, summary and `articleUrl` for each item with a verified story and its direct article URL before publishing it as real news.
- All market values are fictional demo figures. They are not current prices and must not be presented as live data.

## Files

- `index.html` — page structure and accessible navigation
- `style.css` — responsive design and layout
- `script.js` — sample story data, search, category filters, sorting, menu and demo market cards

## Run locally

1. Download and extract the project folder.
2. Open the folder in Visual Studio Code or another text editor.
3. Open `index.html` in a browser.
4. Edit the sample stories in `script.js` and save. Refresh the browser to see your changes.

You do not need Node.js or a build step for this version. An optional VS Code Live Server extension can automatically refresh the browser when files change.

## Publish free with GitHub Pages

1. Create or sign in to an account at https://github.com/.
2. Create a **public** repository. For a personal site, name it `YOUR-USERNAME.github.io` (replace with your GitHub username).
3. Upload `index.html`, `style.css`, `script.js` and `README.md` to the repository root.
4. Open **Settings → Pages**.
5. Under build/deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
6. Wait for deployment and open `https://YOUR-USERNAME.github.io`.

Official guide: https://docs.github.com/en/pages/quickstart

## Before publishing real news

1. Verify every story and its publication date.
2. Link directly to the original article when possible.
3. Keep the publisher name visible and distinguish summaries written by you from publisher text.
4. Check source terms and copyright/licensing before reusing article text, images or feeds.
5. Do not claim that a story is positive or verified solely because of keywords.
6. Keep politics and religion out according to your editorial policy, but do not alter facts to make a story sound more positive.
7. Do not put private API keys in client-side JavaScript or a public repository.
8. Clearly label market data as demo, delayed or live, and show the provider and timestamp when real data is integrated.

## Suggested next steps

- Replace sample cards with a small set of fact-checked stories.
- Add one RSS feed or an API whose terms permit your intended display.
- Add a server-side function if a provider requires a private API key.
- Add automated tests and improve the editorial review process.
