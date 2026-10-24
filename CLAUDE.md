# Taif Alsufiani — Portfolio

Personal portfolio site for Taif Alsufiani (طيف السفياني), a Computer Science graduate in Riyadh applying for AI product, AI solutions and MVP-focused roles. Hosted on GitHub Pages at https://tacsif.github.io (repo: `taCSif/taCSif.github.io`).

## Files

- `index.html` — page content only (no inline styles or scripts).
- `css/style.css` — all styles, grouped by section in page order. Colors and fonts are tokens in `:root`.
- `js/main.js` — behavior, one small `setup…` function per feature (tabs, filters, assistant, copy buttons, missing images).
- `cv.pdf` — her CV (to be added). Linked from the CV tab.
- `logo.png` — her logo (to be added). Replaces the "T" monogram automatically in the header, the hero circle and the assistant button.
- `images/` — project screenshots (to be added): `cardeal.png`, `riyal-estate.png`, `dalilak.png`, `riyadh-resolve.png`, `ask-taif.png`. Until they exist, each card shows the project name on a soft gradient.

No build step, no framework. To preview locally, open `index.html` in a browser, or run `python -m http.server` in this folder and open http://localhost:8000.

## Structure

- **Header:** logo + name, and an "Ask Taif" button.
- **Overview:** short intro only (status, Arabic greeting, name, role, one line). Not a CV.
- **Four tabs** the visitor chooses from: About Taif, Projects, CV, Contact. The tab bar is sticky. Each panel ends with previous/next buttons.
- **About Taif:** who she is, vision, goal, and "t[AI]f thinking" (her 4-step way of building).
- **Projects:** filter by status (All / Done / In progress); counts are computed in JS. Done: CarDeal, Riyal Estate, Dalilak. In progress: Riyadh Resolve, Ask Taif.
- **CV:** Download CV button + experience, education, certifications, skills, community.
- **Contact:** email, phone, LinkedIn, GitHub, each with copy or open.
- **Ask Taif:** floating button bottom-right opens a chat panel. It is a placeholder ("Coming soon"); the real RAG assistant will be built later with LangChain and a local model.

## Design rules

- Light theme only. Soft rose accent `#B4466A`, pink `#FBE9EE`, sand `#FBF3E6`, background `#FFF9F7`. Colors live as CSS variables in `:root`.
- Fonts: Outfit (English), Reem Kufi (Arabic, applied via `[lang="ar"]`).
- Saudi touch: Sadu triangle band at the very top, Arabic greeting.
- Keep navigation minimal. She explicitly dislikes many sections and many nav links.
- Accessibility: text contrast at least 4.5:1, tap targets at least 44px, visible focus, `[hidden]` must stay `display:none !important`.
- Must work at phone width (390px) with no horizontal scroll.
- Code style: clean, split by file, short comments only.

## Content rules

- Only claim what she can defend in an interview. Do not add "agentic" or "multi-agent" as her skills. No invented numbers or metrics.
- KAPSARC work is confidential: describe it only in general terms (no internal names, numbers, screenshots or code). It appears in About and CV, not as projects.
- Her name in English is "Taif Alsufiani".
- Her phone number on the Contact tab is intentionally public.

## Still missing

- LinkedIn URL (links currently point to linkedin.com; marked with a TODO in `index.html`).
- `cv.pdf`, `logo.png`, project screenshots.
- Project descriptions may be updated from her LinkedIn.
- Later: build the real Ask Taif assistant, deploy CarDeal as a live demo, add a CarDeal case study.
