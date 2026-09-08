# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

No build system, no package manifest, no tests. Serve locally:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deployment

GitLab Pages, configured in `.gitlab-ci.yml`. On pushes to the default branch, the `pages` job copies `index.html`, `newsletter.html`, `css/`, `js/`, and `assets/` verbatim into `public/` and publishes it — there is no compilation or asset hashing step, so whatever is committed is exactly what ships.

## Architecture

Two-page static site, no JS framework, no templating (see root `~/CLAUDE.md` for the shared "no templating" pattern — navbar/footer markup is duplicated between `index.html` and `newsletter.html` and must be edited in both).

- **`index.html`** — home page: hero section plus a team directory. The directory itself is an empty `<div id="team-directory">` populated at runtime by `js/team.js`.
- **`newsletter.html`** — wraps an `<iframe>` intended to embed a published document (Google Docs "Publish to web", Google Slides embed, or hosted PDF). The `src` is currently `about:blank` with a visible placeholder note; point it at the real embed URL when one exists.
- **`js/team.js`** — the only script. Team roster is data, not markup: a `TEAM_GROUPS` array of `{ title, people: [{ name, role?, file?, profile }] }`. `renderTeam()` builds the DOM from this array on `DOMContentLoaded`. To add/remove/move a person, edit `TEAM_GROUPS` directly — no other file needs to change. `file` is optional and points into `assets/images/people/`; if omitted, or if the image 404s, `img.onerror` swaps in an initials avatar (`buildAvatarFallback`), so a missing headshot never breaks the page.
- **`css/styles.css`** — single stylesheet for both pages. `@font-face` rules at the top load Figtree from `assets/fonts/` (weight/style per file, e.g. `Figtree-SemiBold.ttf` → `font-weight: 600`). Design tokens (`--bg`, `--text`, `--blue`, `--radius`, etc.) are defined once on `:root` — reuse these rather than hardcoding colors. Dark theme only; there is no light-mode variant.

## Content assets

- `assets/fonts/` — Figtree (used) and Source Serif (staged, not yet referenced in CSS). Preserve existing filename/weight naming if adding more `@font-face` rules.
- `assets/images/people/` — headshots referenced by `file` in `js/team.js`; filename must match exactly.
- `assets/images/` — partner/product logos (PANW, Anthropic, NVIDIA, Cortex, Strata, Unit 42, etc.) not yet wired into either page.
- `assets/reference-ui/hero_example.png` — visual reference for the hero section style (paloaltonetworks.com "Idira" campaign), matching the Figtree/Source Serif stack.
