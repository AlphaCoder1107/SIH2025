# Smart India Hackathon 2025 — Vidya University (Landing)

A lightweight static-first site with dynamic JSON-driven sections: updates, resources, and teams.

## Structure
- index.html — single-page shell
- css/style.css — styles
- js/main.js — bootstraps the page
- js/data-loader.js — fetches JSON and renders sections
- data/*.json — editable content (updates, resources, teams)
- assets/ — images & icons
- downloads/ — files users can download

## Run locally
Option 1 (Python 3):

```pwsh
python -m http.server 8000
# open http://localhost:8000/sih-vidya-landing/
```

Option 2 (VS Code Live Server): install the extension and "Open with Live Server" on `index.html`.

## Update content
- Edit `data/updates.json` and `data/resources.json` to change the site without touching HTML.
- After the event, add entries to `data/teams.json` and drop images into `assets/images/teams/`.

## Notes
- Files under `/downloads` will trigger browser downloads. External links open in a new tab.
- Keep filenames simple (no spaces) for predictable URLs.

MIT License.