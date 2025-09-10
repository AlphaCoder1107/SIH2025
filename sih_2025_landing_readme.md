# Smart India Hackathon 2025 — Vidya University

> **Project:** Landing page and lightweight dynamic site for Vidya University SIH 2025 (Internal Selection)

---

## Overview
This repository contains a small static site (HTML/CSS/JS) that acts as the central hub for the internal Smart India Hackathon 2025 at Vidya University. Students, faculty, and sponsors can find: event details, timelines, downloadable resources (templates, PDFs, PPTs), Google Form links, updates, and — after the hackathon — a live gallery of participating teams and winners.

The site is intentionally lightweight and static-first so you can host it on GitHub Pages, Netlify, or any static hosting. Content that changes often (updates, downloads list, teams gallery) is read from simple JSON files that the front-end fetches and renders dynamically.

---

## Key features
- Single-page responsive landing with sections: Hero, About, Timeline, Resources, Updates, FAQ, Contact, Teams/Gallery.
- Dynamic content driven by JSON files (`data/updates.json`, `data/resources.json`, `data/teams.json`).
- Admin-friendly: update JSON files or replace images to change content — no backend required for basic usage.
- Links to Google Forms, PPT templates, submission PDFs, and external SIH portal.
- Download links for assets and PDFs.
- Simple gallery to show team names, logos/photos, and project links after the event.
- Accessibility-minded markup and SEO-friendly meta tags.

---

## Recommended file structure
```
sih-vidya-landing/
├── index.html
├── README.md
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero.jpg
│   │   └── teams/          # team photos will be dropped here
│   └── icons/
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── data-loader.js     # helper: fetch + render JSON
│   └── utils.js           # small helpers
├── data/
│   ├── updates.json       # timeline & news items
│   ├── resources.json     # list of downloadable templates & links
│   └── teams.json         # post-event gallery (empty initially)
├── downloads/
│   ├── template.pptx
│   ├── submission-guide.pdf
│   └── timeline.pdf
└── docs/
    └── sponsor-pack.pdf
```

> Notes: Keep `data/` and `downloads/` under version control. For large media (many team photos) consider linking to a public CDN or Google Drive and store links in `teams.json`.

---

## Files & purpose
- **index.html** — single-page app shell and accessible markup. Includes meta tags for sharing. Loads CSS and JS.
- **css/style.css** — styles (mobile-first). You may use Tailwind instead; this repo uses plain CSS for simplicity.
- **js/main.js** — initializes page components, binds event listeners, calls `data-loader.js` to populate dynamic sections.
- **js/data-loader.js** — fetches `data/*.json` files and calls render functions to update DOM.
- **data/updates.json** — chronological updates, announcements, and timeline entries.
- **data/resources.json** — entries for PPT templates, Google Docs, forms, PDFs, and URLs with `title`, `type`, `url`, `description`.
- **data/teams.json** — structure to be populated after hackathon with team names, members, project links, photos.
- **assets/** — images and icons used by the site.
- **downloads/** — store files you want students to download directly from the site.
- **docs/** — sponsor pack, press release templates, judge rubric PDFs.

---

## Data formats (examples)
**data/updates.json**
```json
[
  {"id":1,"date":"2025-08-20","title":"Registration Open","body":"Registration for internal SIH is now open. Deadline Sep 28, 2025.","pinned":true},
  {"id":2,"date":"2025-09-15","title":"Mentor Workshop","body":"Free workshop on rapid prototyping on Sep 21.","pinned":false}
]
```

**data/resources.json**
```json
[
  {"id":1,"title":"Team PPT Template","type":"pptx","url":"/downloads/template.pptx","desc":"Standard presentation template for demos."},
  {"id":2,"title":"Submission Guide","type":"pdf","url":"/downloads/submission-guide.pdf","desc":"Checklist & video format instructions."},
  {"id":3,"title":"Registration Form","type":"form","url":"https://forms.gle/your-google-form","desc":"Team registration form."}
]
```

**data/teams.json** (initially empty; fill after event)
```json
[
  {"teamId":"VIDYA-20250912-001","name":"Team Aurora","members":["Anita Sharma","Rohit Kumar"],"project":"Smart Irrigation","image":"/assets/images/teams/aurora.jpg","github":"https://github.com/vidya/aurora","notes":"Won 1st prize"}
]
```

---

## Front-end behavior & examples
- `main.js` loads when `DOMContentLoaded` fires. It calls `DataLoader.loadUpdates()` and `DataLoader.loadResources()`.
- DataLoader uses `fetch('/data/updates.json')` and renders cards using DOM templates (no client-side templating dependency required).
- Users can click resource links to open in a new tab or download (for files under `/downloads`).
- The timeline is rendered sorted by `date` (descending or ascending per preference).
- Search/filter: the resources list and updates can be filtered client-side using a small search input (string match on title & description).
- Teams gallery: after the event, populate `data/teams.json` and the gallery auto-updates. Images placed in `assets/images/teams/` must match `image` fields.

---

## Admin workflow (how to publish updates quickly)
1. Edit a JSON file in `data/` (e.g., add a new entry to `updates.json`).
2. Commit & push to the repository (if hosted on GitHub) or upload changed files to your host (Netlify/upload server). Changes will reflect immediately.

**Alternate (non-technical)**: If you prefer a UI to edit content, use a headless CMS like Netlify CMS or a simple Google Sheet -> JSON export script. For small events, manual JSON edits are easiest.

---

## Accessibility & SEO
- Use semantic HTML5 elements (`header`, `main`, `article`, `section`, `nav`, `footer`).
- Provide `alt` for images, and `aria-label` for interactive controls.
- Add `meta` tags for `og:title`, `og:description`, and `twitter:card` so social shares look good.
- Ensure color contrast for text and buttons; test with a color contrast tool.

---

## Deployment options
- **GitHub Pages:** great for public static hosting. Push the repo to GitHub and enable Pages from the `main` branch.
- **Netlify / Vercel:** simple drag-and-drop or repo connected auto-deploy with preview builds.
- **University server / S3 + CloudFront:** for higher availability.
- If downloads are large, host them on Google Drive / Drive-Direct links or an S3 bucket and keep `data/resources.json` pointing to those URLs.

---

## Local development (quick start)
1. Clone the repo.
2. `cd sih-vidya-landing`
3. Serve locally using any static server. Example (Python 3):
   ```bash
   python3 -m http.server 8000
   # then open http://localhost:8000
   ```
4. Edit `data/*.json` and `assets/` as needed; refresh the page to see changes.

---

## Optional advanced features (future)
- Admin login & CMS to manage updates without direct file edits.
- Backend endpoint to accept team submissions and store to a database (Firebase/Firestore recommended for quick setup).
- Automated email notifications for new registrations (integrate with Apps Script or backend mailer).
- Authentication to protect admin actions or to serve large files behind permission.
- Analytics & event tracking (Google Analytics / Plausible) to measure reach.

---

## Example snippet: render updates (vanilla JS)
```js
// js/data-loader.js (simplified)
export async function loadUpdates(){
  const res = await fetch('/data/updates.json');
  const items = await res.json();
  const container = document.getElementById('updates-list');
  container.innerHTML = '';
  items.sort((a,b)=> new Date(b.date) - new Date(a.date));
  for(const it of items){
    const el = document.createElement('article');
    el.className = 'update-card';
    el.innerHTML = `<h4>${it.title}</h4><time>${it.date}</time><p>${it.body}</p>`;
    container.appendChild(el);
  }
}
```

---

## License & credits
- This starter template is provided under the MIT License. Replace event copy, logos, and sponsor materials with authorized assets only.

---

## Next actions I can help with (pick one)
- Generate the full repo files (index.html, style.css, main.js, data JSON) and a ZIP you can download.  
- Create a simple Netlify-ready deploy config and runbook.  
- Add a small admin HTML page that allows updating `data/updates.json` via a protected token.  
- Convert the site to use Netlify CMS for non-technical editors.

Tell me which one to do next and I’ll generate files immediately.
# Smart India Hackathon 2025 — Vidya University

See `sih-vidya-landing/README.md` for how to run the generated site locally. Open `sih-vidya-landing/index.html` with a static server.
# Smart India Hackathon 2025 — Vidya University

> **Project:** Landing page and lightweight dynamic site for Vidya University SIH 2025 (Internal Selection)

---

## Overview
This repository contains a small static site (HTML/CSS/JS) that acts as the central hub for the internal Smart India Hackathon 2025 at Vidya University. Students, faculty, and sponsors can find: event details, timelines, downloadable resources (templates, PDFs, PPTs), Google Form links, updates, and — after the hackathon — a live gallery of participating teams and winners.

The site is intentionally lightweight and static-first so you can host it on GitHub Pages, Netlify, or any static hosting. Content that changes often (updates, downloads list, teams gallery) is read from simple JSON files that the front-end fetches and renders dynamically.

---

## Key features
- Single-page responsive landing with sections: Hero, About, Timeline, Resources, Updates, FAQ, Contact, Teams/Gallery.
- Dynamic content driven by JSON files (`data/updates.json`, `data/resources.json`, `data/teams.json`).
- Admin-friendly: update JSON files or replace images to change content — no backend required for basic usage.
- Links to Google Forms, PPT templates, submission PDFs, and external SIH portal.
- Download links for assets and PDFs.
- Simple gallery to show team names, logos/photos, and project links after the event.
- Accessibility-minded markup and SEO-friendly meta tags.

---

## Recommended file structure
```
sih-vidya-landing/
├── index.html
├── README.md
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero.jpg
│   │   └── teams/          # team photos will be dropped here
│   └── icons/
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── data-loader.js     # helper: fetch + render JSON
│   └── utils.js           # small helpers
├── data/
│   ├── updates.json       # timeline & news items
│   ├── resources.json     # list of downloadable templates & links
│   └── teams.json         # post-event gallery (empty initially)
├── downloads/
│   ├── template.pptx
│   ├── submission-guide.pdf
│   └── timeline.pdf
└── docs/
    └── sponsor-pack.pdf
```

> Notes: Keep `data/` and `downloads/` under version control. For large media (many team photos) consider linking to a public CDN or Google Drive and store links in `teams.json`.

---

## Files & purpose
- **index.html** — single-page app shell and accessible markup. Includes meta tags for sharing. Loads CSS and JS.
- **css/style.css** — styles (mobile-first). You may use Tailwind instead; this repo uses plain CSS for simplicity.
- **js/main.js** — initializes page components, binds event listeners, calls `data-loader.js` to populate dynamic sections.
- **js/data-loader.js** — fetches `data/*.json` files and calls render functions to update DOM.
- **data/updates.json** — chronological updates, announcements, and timeline entries.
- **data/resources.json** — entries for PPT templates, Google Docs, forms, PDFs, and URLs with `title`, `type`, `url`, `description`.
- **data/teams.json** — structure to be populated after hackathon with team names, members, project links, photos.
- **assets/** — images and icons used by the site.
- **downloads/** — store files you want students to download directly from the site.
- **docs/** — sponsor pack, press release templates, judge rubric PDFs.

---

## Data formats (examples)
**data/updates.json**
```json
[
  {"id":1,"date":"2025-08-20","title":"Registration Open","body":"Registration for internal SIH is now open. Deadline Sep 28, 2025.","pinned":true},
  {"id":2,"date":"2025-09-15","title":"Mentor Workshop","body":"Free workshop on rapid prototyping on Sep 21.","pinned":false}
]
```

**data/resources.json**
```json
[
  {"id":1,"title":"Team PPT Template","type":"pptx","url":"/downloads/template.pptx","desc":"Standard presentation template for demos."},
  {"id":2,"title":"Submission Guide","type":"pdf","url":"/downloads/submission-guide.pdf","desc":"Checklist & video format instructions."},
  {"id":3,"title":"Registration Form","type":"form","url":"https://forms.gle/your-google-form","desc":"Team registration form."}
]
```

**data/teams.json** (initially empty; fill after event)
```json
[
  {"teamId":"VIDYA-20250912-001","name":"Team Aurora","members":["Anita Sharma","Rohit Kumar"],"project":"Smart Irrigation","image":"/assets/images/teams/aurora.jpg","github":"https://github.com/vidya/aurora","notes":"Won 1st prize"}
]
```

---

## Front-end behavior & examples
- `main.js` loads when `DOMContentLoaded` fires. It calls `DataLoader.loadUpdates()` and `DataLoader.loadResources()`.
- DataLoader uses `fetch('/data/updates.json')` and renders cards using DOM templates (no client-side templating dependency required).
- Users can click resource links to open in a new tab or download (for files under `/downloads`).
- The timeline is rendered sorted by `date` (descending or ascending per preference).
- Search/filter: the resources list and updates can be filtered client-side using a small search input (string match on title & description).
- Teams gallery: after the event, populate `data/teams.json` and the gallery auto-updates. Images placed in `assets/images/teams/` must match `image` fields.

---

## Admin workflow (how to publish updates quickly)
1. Edit a JSON file in `data/` (e.g., add a new entry to `updates.json`).
2. Commit & push to the repository (if hosted on GitHub) or upload changed files to your host (Netlify/upload server). Changes will reflect immediately.

**Alternate (non-technical)**: If you prefer a UI to edit content, use a headless CMS like Netlify CMS or a simple Google Sheet -> JSON export script. For small events, manual JSON edits are easiest.

---

## Accessibility & SEO
- Use semantic HTML5 elements (`header`, `main`, `article`, `section`, `nav`, `footer`).
- Provide `alt` for images, and `aria-label` for interactive controls.
- Add `meta` tags for `og:title`, `og:description`, and `twitter:card` so social shares look good.
- Ensure color contrast for text and buttons; test with a color contrast tool.

---

## Deployment options
- **GitHub Pages:** great for public static hosting. Push the repo to GitHub and enable Pages from the `main` branch.
- **Netlify / Vercel:** simple drag-and-drop or repo connected auto-deploy with preview builds.
- **University server / S3 + CloudFront:** for higher availability.
- If downloads are large, host them on Google Drive / Drive-Direct links or an S3 bucket and keep `data/resources.json` pointing to those URLs.

---

## Local development (quick start)
1. Clone the repo.
2. `cd sih-vidya-landing`
3. Serve locally using any static server. Example (Python 3):
   ```bash
   python3 -m http.server 8000
   # then open http://localhost:8000
   ```
4. Edit `data/*.json` and `assets/` as needed; refresh the page to see changes.

---

## Optional advanced features (future)
- Admin login & CMS to manage updates without direct file edits.
- Backend endpoint to accept team submissions and store to a database (Firebase/Firestore recommended for quick setup).
- Automated email notifications for new registrations (integrate with Apps Script or backend mailer).
- Authentication to protect admin actions or to serve large files behind permission.
- Analytics & event tracking (Google Analytics / Plausible) to measure reach.

---

## Example snippet: render updates (vanilla JS)
```js
// js/data-loader.js (simplified)
export async function loadUpdates(){
  const res = await fetch('/data/updates.json');
  const items = await res.json();
  const container = document.getElementById('updates-list');
  container.innerHTML = '';
  items.sort((a,b)=> new Date(b.date) - new Date(a.date));
  for(const it of items){
    const el = document.createElement('article');
    el.className = 'update-card';
    el.innerHTML = `<h4>${it.title}</h4><time>${it.date}</time><p>${it.body}</p>`;
    container.appendChild(el);
  }
}
```

---

## License & credits
- This starter template is provided under the MIT License. Replace event copy, logos, and sponsor materials with authorized assets only.

---

## Next actions I can help with (pick one)
- Generate the full repo files (index.html, style.css, main.js, data JSON) and a ZIP you can download.  
- Create a simple Netlify-ready deploy config and runbook.  
- Add a small admin HTML page that allows updating `data/updates.json` via a protected token.  
- Convert the site to use Netlify CMS for non-technical editors.

Tell me which one to do next and I’ll generate files immediately.