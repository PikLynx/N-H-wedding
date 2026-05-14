# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static single-page Croatian wedding invitation website for Nikola & Helena, June 20, 2026.
No build system, no framework, no dependencies — vanilla HTML5 + CSS3 + JS only.

## Development

Open `index.html` directly in a browser (no server required). For live reload during editing:

```bash
npx serve .          # or any static file server
python3 -m http.server 8080
```

## Deployment

Hosted on **GitHub Pages** — push to `main` and it deploys automatically.

- **Live URL:** https://balabani.com.hr (custom domain)
- **Source:** `main` branch, root `/`
- **SSL:** certificate approved for `balabani.com.hr` and `www.balabani.com.hr`
- No CI/CD workflows — GitHub Pages legacy "deploy from branch" handles it

## Font conversion (one-time setup)

Fonts are NOT committed. Convert Mont OTF → WOFF2/WOFF before first deploy:

```bash
pip install fonttools brotli
FONT_DIR=/path/to/mont/otf/files ./infra/convert-fonts.sh
# Output: fonts/Mont-{Regular,SemiBold,Bold,Heavy}.{woff2,woff}
```

## Architecture

Single file per concern:
- `index.html` — all HTML, all inline SVG ivy decorations
- `css/style.css` — design tokens (`:root`), all styles, responsive breakpoints
- `js/main.js` — four IIFEs: navbar scroll, countdown timer, gallery lightbox, smooth scroll

**Placeholders requiring real content before launch:**
- RSVP URL: search `forms.google.com/PLACEHOLDER` in `index.html`
- Google Maps links: 3 `<a href>` values in the Lokacije section
- Images: `images/hero.png`, `images/location.jpg`, `images/gallery/g1.jpg`–`g5.jpg`
- All `<img>` tags use `onerror` fallback to SVG placeholders when real images are missing

## Design tokens

All colours and font are defined as CSS custom properties in `css/style.css`:

```
--green-dark:  #2B5A27
--green-mid:   #4A7C3F
--green-light: #7AB648
--bg-cream:    #F7F4EC
--font-main:   'Mont', sans-serif
```

Use these tokens for any new styles; do not hardcode colour values.
