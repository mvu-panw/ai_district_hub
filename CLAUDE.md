# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

No build system. Serve locally:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Status

This directory currently contains **assets only** — no source code, build config, or package manifest exists yet. There is nothing to build, lint, run, or test.

## Contents

- `assets/fonts/` — PANW brand typefaces: Figtree (sans, weights Light–Black + italics) and Source Serif (serif, including the 18pt/36pt/48pt optical-size variants, weights ExtraLight–Black + italics).
- `assets/images/` — logos (Palo Alto Networks, Anthropic, OpenAI, NVIDIA, CoreWeave, Glean, Prisma AIRS, Cortex, Strata, Unit 42, etc.) and headshots of named individuals, used for partner/speaker attribution.
- `assets/reference-ui/hero_example.png` — a screenshot of a paloaltonetworks.com hero section (dark theme, "Idira" identity-security campaign) used as a visual/style reference — matches the Figtree/Source Serif font stack staged here.

## Likely purpose

The asset mix (PANW fonts, partner logos, named headshots, a paloaltonetworks.com reference screenshot) suggests this is a staging area for a PANW-branded page or site, possibly related to the `AI_District_Static_Site` project described in `~/CLAUDE.md`. Confirm with the user before assuming these assets belong to an existing project versus a new one.

## Working here

- When actual site/app code is added, update this file with real build/lint/test commands and architecture notes — do not carry over assumptions from other projects in `~/CLAUDE.md`.
- Preserve the existing font family and weight naming (e.g. `Figtree-SemiBold.ttf`, `SourceSerif4_36pt-Medium.ttf`) if referencing these files from CSS `@font-face` rules.
