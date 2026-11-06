# Tech Steering — Haunted Spell Book

> Scaffolding for Kiroween 2026. Expand while building in Kiro.

## Stack
- Static HTML / CSS / vanilla JS — no build step
- Optional: Google Fonts (Creepster / Cinzel) via CDN
- Persistence: `localStorage`
- Hosting: GitHub Pages from `main` branch root

## Constraints
- Keep the demo openable via `index.html` or `npx serve .`
- No Node runtime required for the app itself
- Prefer CSS animations over JS for fog / flicker / fade
- Accessibility: keep contrast readable; reduce-motion respected when possible

## Kiro workflow
- Specs live under `.kiro/specs/haunted-ui/`
- Steering docs guide product + tech decisions
- Hooks automate small quality checks (e.g. lint-on-save)

## Out of scope (for now)
- React / Vue / bundlers
- Server APIs
- Service workers / PWA (optional later)
