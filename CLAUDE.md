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

Hosted on **GitHub Pages** — push to `main` and it deploys automatically (no CI/CD pipeline).

- **Live URL:** https://balabani.com.hr (custom domain via `CNAME` file)
- **Source:** `main` branch, root `/`
- **SSL:** certificate approved for `balabani.com.hr` and `www.balabani.com.hr`

The `infra/` folder contains legacy S3/CloudFront scripts — not in use.

## Architecture

Single file per concern:
- `index.html` — all HTML, inline SVG decorations
- `css/style.css` — design tokens (`:root`), all styles, responsive breakpoints
- `js/main.js` — four IIFEs: navbar scroll, countdown timer, gallery lightbox, smooth scroll
- `images/assets/` — all image assets (loza PNGs, icons, hero illustration, etc.)
- `images/gallery/` — gallery images (currently SVG placeholders: `g1-placeholder.svg`–`g5-placeholder.svg`)
- `fonts/` — empty, not needed (font loaded via Google Fonts)

## Sections (in order)

1. Fixed navbar (transparent → cream on scroll)
2. Hero — full-viewport illustration (`images/assets/N+H+D.png`)
3. Date — 20 lipanj 2026 + N+H monogram + inline SVG ivy
4. Countdown — live JS to June 20 2026 11:00 CET+2
5. Invitation text
6. Program Dana — 4-item timeline (11:00, 14:30, 17:00, 19:00)
7. Lokacije — 3 location cards with real Google Maps links
8. RSVP — pill button → real Google Forms URL (already set)
9. Galerija — currently hidden (`display:none`), awaiting real photos
10. Kontakt — Nikola + Helena contact cards
11. Footer — ivy SVG decorations

## Placeholders / remaining TODOs

- **Gallery images:** replace `images/gallery/g1-placeholder.svg`–`g5-placeholder.svg` with real JPGs and unhide the Galerija section (remove `style="display:none"` from `#galerija`)
- All other placeholders (RSVP URL, Maps links) are already filled in

## Design tokens

All colours and font are defined as CSS custom properties in `css/style.css`:

```
--green-dark:   #52631e
--green-mid:    #52631e
--green-light:  #52631e
--bg-cream:     #F7F4EC
--bg-green:     #52631e
--text-dark:    #1A1A1A
--text-muted:   #5A5A5A
--text-cream:   #F7F4EC
--font-main:    'Poppins', sans-serif  (loaded via Google Fonts)
```

Use these tokens for any new styles; do not hardcode colour values.
