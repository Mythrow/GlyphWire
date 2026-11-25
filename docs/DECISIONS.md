# GlyphWire: decisions

This log records only what the project owner has approved in the project chat.
Items still undecided are listed under **Open**, not as decisions.
Last updated: 2026-11-25.

## Approved decisions

### Identity
- **Name:** GlyphWire, meaning wire news told through glyphs.
- **Platform:** YouTube Shorts only.

### Format
- **Length:** 15 to 30 seconds. Up to about one minute when a story needs it.
- **Content type:** quick informative videos, not detailed explainers.
- **Audio:** narration by one approved voice, af_jessica (Kokoro, free and open source), with light background music. One voice across all Shorts.

### Visual style
- Modern-futuristic motion graphics, not an infographic or slide presentation.
- Text and graphics move in smooth animated motion, generated programmatically.

### Brand kit (approved 2026-11-19 and 2026-11-24)
- **Palette:** Option A Signal, dark. Signal Lime #A3E635 is primary. Wire Cyan #38BDF8 is secondary. Alert Coral #FF625C is for alerts. Ink #0B0F14 is the background. Panel #111820 is for surfaces. Ivory #F7F8F2 is the text color. Tokens are in `brand/tokens.json`.
- **Typefaces:** Space Grotesk for headlines, Inter for body, JetBrains Mono for labels. The smallest text is 32px on a 1080 px frame.
- **Motion:** durations, easing and stagger in `brand/tokens.json`. No bounce and no spin.
- **Logo:** "Signal G". A lime ring G with a solid source node and a short bar, plus three thin fading lime arcs. Lime only, no cyan in the mark. Files are in `brand/logo/`.
- **Frame:** 9:16, 1080 × 1920 px.

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

### Video style (approved in the project chat, 2026-11-25)
- **Main topics only on screen.** The voice carries the detail. Each topic shows one large title and one hero object.
- **Headline:** full size for the opening, then it shrinks and stays on screen.
- **Text animation:** every letter animates in, one after another.
- **Partner topic:** the US flag is in the centre of a hub, with partner flags branching out on a ring. Flags are circular.
- **Investigation topic (Section 301):** a radar scanner sweeps, and blips light up in lime or coral as it passes.
- **Rates topic:** a dial whose needle moves. No rate figure is shown, since none is in the source. Only a figure the owner supplies may be shown.
- **US–China topic:** the connection line flickers lime and coral, then settles on coral.
- **Alert colour:** Alert Coral #FF625C, as approved on 2026-11-19.

### Music (approved in the project chat, 2026-11-25)
- **Bed:** the 128 BPM track the owner supplied. The end is looped on its last full bar before the one-hit ending fades, so the fade is not played.
- **Level:** the bed sits under the narration. The owner asked for it to be raised a little.

## Open

These are not decided. Each needs an owner decision before work depends on it.

- **Fact-check rule for other sources:** whether to require two independent
  sources or manual sign-off for stories that do not come from the owner.
- **Article access:** some article pages, such as The Hindu and Times of India
  live blogs, could not be fetched. The owner may paste article text instead.
- **Thread model:** whether video build threads should move from the current
  model to Haiku 5.5 at medium effort.
- **Partner flags:** only the US, China, the EU and Japan have flags. The other partner flags await the owner's list of countries.
- **Hub and radar layout:** the owner has seen the latest version and has not signed off each detail.
- **Music level:** the mix level under narration may be adjusted after the owner listens.
- **Dark-only or light variant:** whether some videos need a light background.
- **Vertical format:** confirm 9:16 as the standard for all Shorts.
- **Ivory:** the owner chose #F7F8F2 for text. Whether it is clear of other brands' colors is not checked.
