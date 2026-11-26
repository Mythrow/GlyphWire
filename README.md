# GlyphWire

A YouTube Shorts channel: quick, informative, modern-futuristic motion graphics about news, built in Remotion.

Start here: [approved decisions](docs/DECISIONS.md) → [current status](docs/PROJECT_STATUS.md) → [production workflow](docs/PRODUCTION.md). Agents also read [AGENTS.md](AGENTS.md).

## Quick start
```sh
npm install
npm run validate
npm run typecheck
npm start
npm run render:preview
npm run render:tariff
```
The tariff render is a visual proof, not a final video. New stories use the Short composition with structured props; LegacyShort preserves the older lower-third layout.

## Layout

- brand/: approved design tokens, logos and owner-supplied music (rights confirmation open).
- src/brand/: typed brand layer, fonts, motion helpers and logo.
- src/shorts/: reusable topic renderer, hero components and legacy template.
- stories/: structured preview/story props.
- content/: canonical registry and provenance.
- config/: narrator and music configuration.
- scripts/: validation and local audio tools.
- publishing/ and analytics/: release and performance records (no invented data).

Generated media and private inputs stay outside public Git. Manual owner approval and upload only.
