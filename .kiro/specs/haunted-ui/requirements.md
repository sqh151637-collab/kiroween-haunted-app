# Requirements — Haunted UI (Spell Book)

> Starting scaffolding. Expand in Kiro as features grow.

## Functional
1. User can add a new spell (task) with a title.
2. User can mark a spell as cast (complete); it fades into the beyond.
3. User can delete a spell.
4. Spells persist across page reloads via localStorage.
5. Empty state shows a haunting prompt to write the first spell.

## Visual / UX (Costume Contest)
1. Dark theme with candle / violet / mist palette.
2. Soft fog overlay and subtle candle flicker on key surfaces.
3. Ghost cursor trail follows the pointer.
4. Completed spells animate a dissolve / fade rather than a hard remove.
5. Typography and chrome feel like a grimoire, not a generic todo.

## Non-functional
1. Works in modern Chromium / Firefox / Safari.
2. No external runtime dependencies beyond optional fonts.
3. Demo loads in under ~2s on a typical connection.
4. Respects `prefers-reduced-motion` by dialing back animations.
