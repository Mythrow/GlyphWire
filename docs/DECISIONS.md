# GlyphWire: decisions

This log records only what the project owner has approved in the project chat.
Items still undecided are listed under **Open**, not as decisions.
Last updated: 2026-11-27.

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
- **Frame:** 9:16, native 1080 × 1920 px, 60 FPS for all previews and final videos (owner approved 2026-11-27).

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
- **Historical tariff layout:** one large title and one hero per topic was the initial approach. Superseded for future stories by the adaptive storytelling direction below.
- **Headline:** full size for the opening, then it shrinks and stays on screen.
- **Text animation:** every letter animates in, one after another.
- **Partner topic:** the US flag is in the centre of a hub, with partner flags branching out on a ring. Flags are circular.
- **Investigation topic (Section 301):** a radar scanner sweeps, and blips light up in lime or coral as it passes.
- **Rates topic:** a dial whose needle moves. No rate figure is shown, since none is in the source. Only a figure the owner supplies may be shown.
- **US–China topic:** the connection line flickers lime and coral, then settles on coral.
- **Alert colour:** Alert Coral #FF625C, as approved on 2026-11-19.

### Layouts (approved in the project chat, 2026-11-25)
- **Partner hub:** the US flag in the centre, with partner flags branching out on a ring.
- **Radar:** the Section 301 scanner, with lime and coral blips.

### Music file (approved in the project chat, 2026-11-25)
- **Project music file:** `brand/audio/news-bed-128bpm.mp3`, the 128 BPM bed the owner approved. Only this file is in the repo. Videos and renders stay in the project folder.

### Music (approved in the project chat, 2026-11-25)
- **Bed:** the 128 BPM track the owner supplied. The end is looped on its last full bar before the one-hit ending fades, so the fade is not played.
- **Level:** the bed sits under the narration. The owner asked for it to be raised a little.

### Visual refinement (owner confirmed 2026-11-27)
- Use Bharat Mode as a read-only reference for animation craft, scene construction, independent layers, constructive motion, narration-led cues, transitions and visual QA, not for brand styling.
- Preserve the existing GlyphWire frame: Signal G at top right (120px, top/right 96px), category top left, opening headline and shrink, original typography, dark Ink background, original topic/hero positioning for legacy previews, continuous lime progress bar (8px, 96px gutters and bottom), and existing margins.
- No segmented progress, relocated logo, additional captions, changed palette or new typography without owner approval. Keep current narration and music decisions.
- Prototype refined hero motion within the existing frame. 30fps was the original prototype standard; superseded by the approved 60fps standard below. Visual prototype approval remains separate from the general direction.

### Visual feedback (2026-11-27)
- Correct optical alignment of top-left BREAKING label with the top-right Signal G; preserve logo location and size.
- Use stronger two-line editorial headline styling, with an opening headline shrinking and remaining on screen. Preview treatment is subject to review.
- Use purpose-designed circular flags from kapowaz/circle-flags rather than cropping rectangular flags. Preserve flag identity and correct inaccurate artwork; unknown flags remain neutral placeholders.

### News storytelling system (owner approved direction, 2026-11-27)
- Opening: the first meaningful hero visual begins alongside the headline; no dedicated intro.
- Persistent headline: opening headline shrinks and remains throughout.
- Sources: full attribution in the video description only, not in-frame. Speaker identity, units, dates and other necessary factual context are not source citations and may appear.
- Ending: finish on the last meaningful news development, no separate outro.
- Approved overall direction: adaptive central storytelling area, one dominant message at a time with supporting elements as needed, optional topic title, meaningful continuity across beats, reusable news visual modules, and narration-led timing. Story dictates the sequence, not a mandatory slide order. See NEWS_VISUAL_SYSTEM.md. This replaces the rigid one-topic/one-glyph rule for future stories, not the fixed brand chrome.
- Owner wants a better map system than the earlier schematic example. Use genuine geospatial data in prototypes; final map styling, dataset version and boundary policy remain for review; supported variants are approved below.
- Owner agrees with the broad framework but has further questions. Detailed limits, module-specific styling, layout variants and transitions are candidates, not individually locked approvals.

### Approved visual module capabilities (2026-11-27)
- Quotations: support both typography-led and portrait-led quotes.
- Numerical information: support both large editorial numbers and compact data panels.
- Geography: adaptive selection from Equal Earth world overview, regional focus using an appropriate local projection, and orthographic globe; support meaningful transitions between modes when appropriate.
- Photography: support both circular portraits and rectangular editorial photography.
- Weather: support both minimal animated condition icons and detailed atmospheric visuals. Distinguish observations from forecasts and use verified data.

Choose variants according to the story, not a fixed sequence. Approval applies to supported capabilities, not final artwork, exact map styling, boundary policy or production implementation. Keep fixed brand chrome and source attribution in the description only.

### Render quality (owner approved 2026-11-27)
- Native 1080 × 1920 at 60fps for previews and final videos; no upscaling or frame interpolation. Keep elapsed-time motion consistent with the approved original animation, sampling at 60fps.
- Vector graphics where possible, original approved fonts, high-quality H.264 (12–20 Mbps reference target; quality-based encoding may vary with scene complexity). Lossless frame capture for native Remotion. Verify resolution, frame count, decoding and visible fine detail. Standalone fallback renders must be identified as such.

### Editorial alignment (owner confirmed 2026-11-27)
- Center the opening headline and the persistent reduced headline on the same horizontal centreline throughout scaling. Center supporting paragraphs, topic headings and their labels by default; align related local labels to their own glyph or timeline anchor. Keep the existing top-left category and top-right logo. Historical baseline retained for comparison.

### Glyph transitions (owner confirmed 2026-11-27)
- Default to constructive entrances and corresponding deconstructive exits: progressive drawing/retraction, staged assembly/disassembly, directional reveal/withdrawal, and staggered components.
- Preserve shared objects and prefer meaningful transformations or eased repositioning across related beats. Use a quiet dissolve when visuals are genuinely unrelated or removal by construction would distract. Keep the final news beat settled rather than forcing an outro. Retain centered typography and existing brand chrome.

### V7 visual review and supporting information (owner approved 2026-11-27)
- V7 centered text and constructive glyph entrances/deconstructive exits accepted by owner as visual direction. Preserve them in future previews. This approval is not publication approval or a native Remotion test.
- Header category and Signal G main ring must share an optical vertical centerline; retain logo position and size. Calibrate using actual visible glyph bounds and the selected font, not container alignment alone.
- Supporting information is adaptive rather than a mandatory bottom footer: key takeaway, verified direct quotation, attributed paraphrase, or key data. Center supporting text by default; local labels align to the corresponding glyph. Prefer 6–12 words and 1–2 lines, Inter 44–52px primary, 32–36px secondary. Highlight sparingly with semantic brand colors. Omit redundant text.
- Direct quotes must be verified verbatim; use a distinct quotation design, independent speaker identity/role reveal, optional portrait, original letter animation, and reverse stagger or directional withdrawal. Paraphrases must remain unquoted and explicitly attributed. Sources remain in description only.
- Give dates and numbers their own visual hierarchy. Supporting information may move relative to the glyph as the story requires; preserve readability and the fixed brand frame.

### V8 visual review (owner approved 2026-11-27)
- Owner accepted the V8 approach: optical alignment of category text to Signal G, adaptive supporting information hierarchy, centered text with selective semantic emphasis, explicitly attributed unquoted paraphrases, distinct date treatments, and reverse-stagger text exits, preserving the V7 glyph choreography. Retain this direction.
- Owner authorized adding approved Kokoro af_jessica narration and the existing 128 BPM music bed to the same visual preview. This is not publication approval; direct quotation module demonstration, actual audio timing/mix review and native Remotion validation remain separate.

### Paired timeline dates (owner feedback, 2026-11-27)
- Comparable dates on a timeline must use matching, compact typography, weight and baseline, with equally styled secondary labels and local anchor alignment. Make both dates smaller than the oversized V8 treatment; use semantic colour and wording for status rather than unequal scale. Preserve the brand's 32px minimum and existing motion. See NEWS_VISUAL_SYSTEM.md.

### Audio production handoff (owner directed 2026-11-27)
- Dedicated Work chat handles Kokoro narration only; regular chat supplies scene scripts, synchronizes visuals, mixes music and renders. Retain af_jessica, American English, speed 1.0; no paid services.
- Reuse Bharat Mode's scene-based handoff and evidence/QA process, not its narrator or brand. Require per-scene 24 kHz mono PCM16 WAVs, genuine WhisperX acoustic alignment tied to final audio SHA-256, independent ASR and pronunciation review, measured durations and one ZIP. See AUDIO_HANDOFF.md. No fabricated timings, rewritten scripts or unverified passes.

## Open
These are not decided. Each needs an owner decision before work depends on it.

- **Fact-check rule for other sources:** whether to require two independent
  sources or manual sign-off for stories that do not come from the owner.
- **Article access:** some article pages, such as The Hindu and Times of India
  live blogs, could not be fetched. The owner may paste article text instead.
- **Thread model:** whether video build threads should move from the current
  model to Haiku 5.5 at medium effort.
- **Partner flags:** only the US, China, the EU and Japan have flags. The other partner flags await the owner's list of countries.
- **Music level:** the mix level under narration may be adjusted after the owner listens.
- **Dark-only or light variant:** whether some videos need a light background.
- **Vertical format:** confirm 9:16 as the standard for all Shorts.
- **Ivory:** the owner chose #F7F8F2 for text. Whether it is clear of other brands' colors is not checked.
- **Visual module refinement:** final artwork, map detail/dataset/boundary handling, precise reading/hold times, subtitle policy and further owner questions. Supported variants are approved above; production render approval remains separate.

## Motion quality gate (owner feedback, 2026-11-27)
Context-driven glyphs and adaptive layouts must retain the constructive motion quality of the earlier tariff prototype. Every module needs a staged construction, meaningful development, readable sustain, semantically motivated transition and settled resolution. Draw paths progressively, stagger independent parts, retain shared objects across beats, and use eased repositioning or focus changes rather than replacing entire scenes. Avoid decorative motion, abrupt swaps and overlapping readable headings. Compare against the earlier tariff preview and the same-story baseline before approving a new treatment. Silent proofs are not production renders; final cues must follow actual narration.
