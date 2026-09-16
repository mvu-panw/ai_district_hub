# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

No build system, no package manifest, no tests. Serve locally:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`), configured as a Pages deploy job. On pushes to `main`, the workflow uploads the entire repository root as the Pages artifact and publishes it directly — there is no build step, so whatever is committed is exactly what ships (including things like `.DS_Store` unless gitignored; only `.DS_Store` is currently gitignored).

## Architecture

Static site, no JS framework, no templating (see root `~/CLAUDE.md` for the shared "no templating" pattern). The header/nav and footer markup is duplicated across every page — currently 16 files: `index.html`, `newsletter.html`, `resources.html`, all 6 files under `resources/` (including the `slide-deck-repo/` subdirectory), and all 5 files under `product-resources/` — and must be edited in all of them when shared layout or nav links change.

The nav has two dropdowns that must stay in sync across every page: **Resources** (links to `resources/sme-pe-resources.html` and `resources/slide-deck-repo.html`) and **Product Resources** (links to the 5 files under `product-resources/`). Note `resources/useful-slidedecks.html` exists and follows the same layout/embed pattern as the other resource pages, but is currently orphaned — it isn't linked from `resources.html`'s card grid or from either nav dropdown.

Pages sit at different directory depths, so relative links (`css/styles.css`, `index.html`, etc.) differ accordingly — keep this in mind when copying header/footer markup between them:
- Root-level pages (`index.html`, `newsletter.html`, `resources.html`) link one level up from root, e.g. `css/styles.css`.
- `resources/*.html` and `product-resources/*.html` sit one directory deep, e.g. `../css/styles.css`.
- `resources/slide-deck-repo/*.html` sit two directories deep, e.g. `../../css/styles.css`.

- **`index.html`** — home page: hero section plus a team directory. The directory itself is an empty `<div id="team-directory">` populated at runtime by `js/team.js`.
- **`newsletter.html`** — wraps an `<iframe>` intended to embed a published document (Google Docs "Publish to web", Google Slides embed, or hosted PDF). The `src` is currently `about:blank` with a visible placeholder note; point it at the real embed URL when one exists.
- **`resources.html`** — index of resource pages: a grid of `.resource-card` links pointing into `resources/`. Add a new resource page by creating a file under `resources/` and adding a card here linking to it.
- **`resources/sme-pe-resources.html`** — embeds an internal Google Sheet via iframe (`.embed-wrap > .embed-frame`), same pattern as the newsletter embed. Requires org access to view.
- **`resources/useful-slidedecks.html`** — same embed pattern, currently unconfigured (`about:blank` placeholder, meant for a Google Slides embed URL) and orphaned (see above).
- **`resources/slide-deck-repo.html`** — a second index page, same `.resource-card` grid pattern as `resources.html`, linking to the 6 files under `resources/slide-deck-repo/`.
- **`resources/slide-deck-repo/*.html`** (`district-team-ops`, `netsec`, `secops`, `ai-security`, `services`, `portfolio`) — each embeds one or more Google Slides decks via the `.embed-wrap`/`.embed-frame` iframe pattern (a page can have multiple stacked embeds, e.g. `district-team-ops.html` has two).
- **`product-resources/*.html`** (`ngfw`, `prisma-access-sase`, `prisma-airs`, `cortex`, `agentic-endpoint-security`) — one page per product; all are currently placeholder stubs ("coming soon") with just header/footer and a page heading, awaiting real content using whatever pattern fits (likely the same embed pattern once content exists).
- **`js/team.js`** — the only script. Team roster is data, not markup: a `TEAM_GROUPS` array of `{ title, people: [{ name, role?, file?, profile }] }`. `renderTeam()` builds the DOM from this array on `DOMContentLoaded`. To add/remove/move a person, edit `TEAM_GROUPS` directly — no other file needs to change. `file` is optional and points into `assets/images/people/`; if omitted, or if the image 404s, `img.onerror` swaps in an initials avatar (`buildAvatarFallback`), so a missing headshot never breaks the page. `profile` links out to the person's Glean directory profile.
- **`css/styles.css`** — single stylesheet for all pages. `@font-face` rules at the top load Figtree from `assets/fonts/` (weight/style per file, e.g. `Figtree-SemiBold.ttf` → `font-weight: 600`). Design tokens (`--bg`, `--text`, `--blue`, `--radius`, etc.) are defined once on `:root` — reuse these rather than hardcoding colors. Dark theme only; there is no light-mode variant. The `.embed-wrap`/`.embed-frame`/`.embed-placeholder-note` classes are the shared iframe-embed pattern used by the newsletter, slide-deck-repo, and other embed pages. `.resource-card`/`.resource-grid` is the shared index-page pattern used by `resources.html` and `resources/slide-deck-repo.html`.

## Content assets

- `assets/fonts/` — Figtree (used) and Source Serif (staged, not yet referenced in CSS). Preserve existing filename/weight naming if adding more `@font-face` rules.
- `assets/images/people/` — headshots referenced by `file` in `js/team.js`; filename must match exactly.
- `assets/images/` — partner/product logos (PANW, Anthropic, NVIDIA, Cortex, Strata, Unit 42, etc.); `panw_RGB_Logo_Negative.png` is used in the header on every page, the rest are not yet wired into any page.
- `assets/reference-ui/hero_example.png` — visual reference for the hero section style (paloaltonetworks.com "Idira" campaign), matching the Figtree/Source Serif stack.
