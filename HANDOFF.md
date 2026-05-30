# HANDOFF — The Eye Care Center MVP

> Start a new session, point me at this file, and I'll pick up where the last thread left off.

## What this is
- Personal portfolio / job-interview MVP redesigning **theeyecarecenter.com** for a real Finger Lakes NY medical practice.
- Built from Claude design's v4 template, restructured into a maintainable multi-page static site.
- **Live preview:** https://zeerebel.github.io/theeyecenter/ (GitHub Pages, deploying from branch `claude/jolly-archimedes-xwebn`).
- **Draft PR #1:** https://github.com/zeerebel/theeyecenter/pull/1

## Stack & structure
- Plain HTML / CSS / JS, **no framework or build step**.
- Shared layer in `assets/` does the heavy lifting:
  - `assets/css/styles.css` — all styles, design tokens, responsive, animations.
  - `assets/js/main.js` — renders nav + footer + sticky booking bar on every page; wires all interactions.
- **15 pages:** `index`, `services`, `eye-services`, `cosmetic-services`, `eyewear`, `doctors`, `team`, `locations`, `location-{canandaigua,geneva,macedon}`, `about`, `testimonials`, `employment`, `patient-information`, `pay-bill-online`, `contact`.
- Earlier v4 source + explorations live in `archive/`.

## Design system (current decisions)
- **Accent:** lime `#D6F25E` (from nion reference). Coral / teal / brass also defined as data-accent overrides (preview switcher disabled in production).
- **Palette:** sage atmospheric background (`--bg #E6ECE6`), cream cards (`--card #F4F2EC`), deep ink text (`--ink #191D1A`).
- **Type:** Instrument Sans (display + body) + Instrument Serif italic (`.em` emphasis) + JetBrains Mono (eyebrows, labels, data).
- **Editorial signals:** every eyebrow renders as bracketed `[ EYEBROW · 01 ]` mono uppercase; bullet dots removed site-wide.
- **Motion tokens:** `--ease-out`, `--dur-fast/base/slow`. **Elevation:** `--shadow-1/2/3`.

## Live features
- Flat top nav with **always-visible hamburger**; gains frosted bg on scroll.
- Full-screen mobile menu (slide-in).
- Real practice content woven in: 1973 founding, F.F. Thompson Hospital origin, 24/7 ophthalmologist on call, Finger Lakes addresses + phones.
- **Home page narrative:**
  1. Hero with 4 glass cards + ticker
  2. Trust band (insurance + credibility points)
  3. Scroll-stacking "Treatments" deck (JS-driven, front-card-centered)
  4. Services grid
  5. Eyewear preview
  6. Doctors (asymmetric editorial head)
  7. Full-bleed photo statement with corner mono labels
  8. Dark Manifesto section (monumental display type)
  9. Patient Portal preview
  10. Insights / journal
  11. Monumental dark CTA band
  12. Mono technical strip
  13. Footer (3 locations + columns)
- **Inner pages:** page-hero pattern with breadcrumbs.
- **Contact:** validated form with in-page success state. Comment in `contact.html` shows where to drop a Formspree URL to wire real email delivery.

## Active animations (intentional set after UX audit)
- Reveal-on-scroll, word-by-word headline reveal (h2 / page-hero h1).
- Scroll-stacking cards section.
- Cursor sheen on hero gcards.
- Magnetic effect on primary lime buttons.
- Scroll progress bar at top.
- Count-up stats (preserves commas / decimals / `+`).
- Section-index rail on right edge (desktop home).
- Sticky booking bar (hides when footer is in view).

## Disabled by audit (still in source, easy to revive)
- `wireCursor()` — custom cursor (defined, not called in `init`).
- `renderAccentSwitcher()` — accent preview tab (defined, not called).

## A11y baked in
- Skip-to-main link, `aria-current="page"` on active nav, `aria-expanded` + `aria-controls` on FAQ.
- **44px+ touch targets** on pills, icon-buttons, hamburger, FAQ rows.
- `touch-action: manipulation` site-wide → no 300ms tap delay.
- Tabular numerals on stats / ticker / counters.
- WCAG-AA `--ink-mute` color, focus-visible rings, `prefers-reduced-motion` respected.
- Branded SVG favicon injected.

## Skills (project-scoped via SessionStart hook)
- `.claude/hooks/install-skills.sh` + `.claude/settings.json` auto-install the **UI/UX Pro Max** skill bundle into `~/.claude/skills/` at session start for this project only.
- Available skill names: `ui-ux-pro-max`, `design`, `design-system`, `ui-styling`, `brand`, `banner-design`, `slides`.

## Pending / next priorities (in order)
1. **Real photography** — the biggest remaining "AI feel" lever. Swap the placeholder Unsplash images on: hero `.gcard` portraits (4), stack-section cards (4), `.doc-img` doctor portraits, the full-bleed photo statement.
2. **Verify the real insurance list** in `index.html` trust-band (currently plausible placeholders: Medicare, Excellus BCBS, Aetna, Cigna, UnitedHealthcare, VSP, EyeMed).
3. **Real doctor list** — currently shows 4 (Hindman, Markowitz, Rothstein, Andolina) on home; doctors.html may need the full ~14 physicians.
4. **Real testimonials** — testimonials.html exists with placeholder content; swap in real quotes.
5. **Per-location content** — `location-{canandaigua,geneva,macedon}.html` exist but may need real office detail (parking, hours specifics, services per location).
6. **Wire contact form to a backend** — Formspree URL in `contact.html#contactForm[action]`.
7. **Asymmetric layout pass on other pages** — Services, Eyewear, Locations still use the standard section-head template.

## Local testing
- Open `index.html` directly in a browser — JS renders nav/footer without a server, no fetch needed.
- Or: `python3 -m http.server` from repo root → http://localhost:8000.
- Live: hard-refresh (Cmd/Ctrl + Shift + R) after each push to bypass cache.

## Pitfalls / quirks
- **User edits files in parallel.** index.html, about.html, locations.html have been hand-edited mid-conversation. Always check the latest file content before editing.
- **`body { overflow-x: hidden }`** breaks `position: sticky` inside flex-centered containers. The scroll-stacking section uses JS-driven transforms within a sticky pin (in a normal block container) to sidestep this. Don't try plain `position: sticky` for the home hero cards.
- **Remote sandbox can't reach external sites** (`theeyecarecenter.com`, `github.io`). The user needs to verify the live URL on their end; I can only verify push state.
- **Network policy.** Outbound is allowlisted — only GitHub, npm CDN, Google fonts, Unsplash work. WebFetch on third-party domains returns 403.

## Suggested first prompt for the new thread
> "Read HANDOFF.md and continue from priority [N]. The branch is `claude/jolly-archimedes-xwebn`."

Or hand over real assets (photos, real doctor list, real insurance list) and I'll wire them in.
