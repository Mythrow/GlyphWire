# GlyphWire

GlyphWire is a YouTube Shorts channel: quick, informative, modern-futuristic motion graphics about news, built in Remotion.

## Brand

- Tokens: `brand/tokens.json` (single source for colors, type, motion and frame size).
- Logo: `brand/logo/` (Signal G, SVG).
- Decisions: `docs/DECISIONS.md`.

## Remotion

```
npm install
npm start            # studio
npm run render:preview  # renders the brand preview to out/
npm run typecheck
```

`src/brand/` holds the brand layer: tokens, fonts, motion helpers, and the Logo component.
