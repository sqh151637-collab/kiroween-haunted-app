# Design — Haunted UI

> Starting scaffolding. Expand in Kiro.

## Visual language
- **Palette:** near-black `#0a0612`, deep purple `#1a0b2e`, ember `#ff6b35`,
  mist `#9b8ec4`, ectoplasm green `#7dffb3`
- **Type:** display font for titles (Creepster / similar); readable body (Cinzel or system serif)
- **Surfaces:** parchment-dark panels with soft vignette and candle glow

## Motion
- Fog: slow drifting opacity layers (CSS keyframes)
- Flicker: low-amplitude brightness pulse on title / candle accents
- Complete: opacity + scale + blur dissolve (~600–900ms), then remove from DOM
- Cursor trail: short-lived translucent orbs that fade out

## Layout
- Centered spell book card (~480–560px)
- Header with title + candle motif
- Input row to "inscribe" a spell
- Scrollable list of active / recently cast spells

## Accessibility
- Focus rings visible on interactive controls
- `prefers-reduced-motion: reduce` disables fog drift and trail density
