# GlyphWire: decisions

This log records only what the project owner has approved in the project chat.
Items still undecided are listed under **Open**, not as decisions.
Last updated: 2026-11-19.

## Approved decisions

### Identity
- **Name:** GlyphWire, meaning wire news told through glyphs.
- **Platform:** YouTube Shorts only.

### Format
- **Length:** 15 to 30 seconds. Up to about one minute when a story needs it.
- **Content type:** quick informative videos, not detailed explainers.
- **Audio:** no voiceover. Light background music.

### Visual style
- Modern-futuristic motion graphics, not an infographic or slide presentation.
- Text and graphics move in smooth animated motion, generated programmatically.

### Topics
- Latest News
- World News
- World Affairs
- Business
- Technology
- Science

### Sourcing
- Any number of news, media, or wire sources may be used.
- The owner can pass in stories by hand.
- Events may come from non-internet sources. The owner can report them directly.

### Fact-checking
- Stories from the owner's own reports need no external fact-check. The owner
  says when a story is theirs.

### Engine and tooling
- **Engine:** Remotion (React), chosen by the owner.
- **Not used:** Adobe After Effects and other Adobe software.

### Workflow
- Long term: fully automated pipeline, from news in to video out.
- Now: the owner approves and uploads each final video.
- Publishing is manual at first and automated later.

### Operations
- The project's default model for new threads is Haiku 5.5, set by the owner
  in Project settings.

## Open

These are not decided. Each needs an owner decision before work depends on it.

- **Brand kit:** palette, typeface, and logo. Three draft options exist
  (A Signal, B Ember, C Ivory). None is chosen.
- **Ivory palette colors:** option C borrows two colors from Anthropic's brand
  reference. Whether those are acceptable for a separate channel is unresolved.
- **Placeholder logo:** the current logo (cyan wire loop with a violet node) is
  a placeholder. Whether to keep it or choose another direction is unresolved.
- **Fact-check rule for other sources:** whether to require two independent
  sources or manual sign-off for stories that do not come from the owner.
- **Vertical format:** the samples use 9:16 vertical video. Confirm this as the
  standard for all Shorts.
- **Article access:** some article pages, such as The Hindu and Times of India
  live blogs, could not be fetched. The owner may paste article text instead.
- **Thread model:** whether video build threads should move from the current
  model to Haiku 5.5 at medium effort.
