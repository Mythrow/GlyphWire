# GlyphWire — news storytelling system

Authority: DECISIONS.md. Owner approved overall direction on 2026-11-27; individual showcase treatments remain candidates.

## Fixed / persistent / adaptive
- Fixed: original 1080×1920 Ink frame, top-right Signal G at 96px/120px, aligned category at left, approved fonts/palette, continuous bottom progress bar, original gutters; native 60fps (all previews and final videos).
- Persistent: opening two-line editorial headline reveals with the hero and shrinks; stays legible throughout.
- Adaptive: central content can be a number, quote, image, map, chart, timeline, mechanism or combination. Heading is optional; avoid duplicated facts and arbitrary slide boxes. One dominant message, with subordinate visual cues as needed.
- Source links and attribution belong in the description only. Speaker names/roles, units, dates, locations, and claim qualifiers are factual context rather than citations. No separate outro.
- Use genuine imagery and data where better than symbolic graphics; verify rights and never pass synthetic illustrations off as actual event evidence.

## Story flow
Capture → establish → develop → connect → resolve are functions, not required scene slots. Establish meaningful content immediately; preserve relevant objects across beats. Use continuation, focus, expansion, transformation, comparison or quiet replacement when semantically appropriate. Tie cues to actual narration; estimates are preview-only. Give reading time; validate mobile UI obstruction, legibility, contrast, factual scope, units, forecast status and final settle. No decorative unsupported quantities, fake quotes or labels. Use BREAKING only for breaking news.

## Module catalogue (review candidates)
| Module | Required factual inputs | Motion |
|---|---|---|
| Quote | exact text, speaker, role, context | progressive text reveal and identification |
| Key number | value, unit, scope, period | number reveal, no misleading intermediate values |
| Comparison | comparable values, units, periods | common baseline, reveal differences |
| Chart | verified series, labels, units, time range | path draw / bars from honest baseline |
| Weather | location, valid time, conditions, units, forecast vs observation | condition icon, forecast progression |
| Map | geodata, location or region, route status | focus, layer reveal, geographic zoom |
| Timeline | dates, events, status | sequential milestone construction |
| Alert | actual severity, affected area, timeframe | restrained coral focus |
| Profile | name, role, licensed photo if available | portrait/identifier reveal |
| Organizations/network | entities, actual relationship | connections draw and nodes attach |
| Mechanism | verified components/process | layered construction |
| Document/policy | real provision, status, effective date if known | document focus, exact highlight |

Possible extensions: election results, markets, transport, event footage, scientific simulation, product reveal, sports scores only if appropriate to editorial scope. Do not add templates indiscriminately.

## Map design review
Use pinned Natural Earth vector geometry (public domain; https://www.naturalearthdata.com/about/). Start with 1:110m for world overview, 1:50m regional, 1:10m or better authoritative data when close-up needs precision. Use Equal Earth for world scale comparisons, regional appropriate projection for local detail, orthographic globe for spatial context. Keep labels readable and use confirmed geocoordinates; geodesic paths are illustrative unless actual route data exists. Natural Earth default is de facto, not universally appropriate; disputed boundaries and India-relevant worldview must be checked per story before publication (https://www.naturalearthdata.com/about/disputed-boundaries-policy/). Avoid default treating disputed boundaries as settled. Prototype maps are not navigational or legal maps. No remote tile requests in final render; record source version, projection, and boundary choices. Choose world overview, regional focus, or globe by story; all three modes approved as capabilities. Exact styling and boundary treatment remain open.

## Approved module variants (2026-11-27)
- Quotations: support both typography-led and portrait-led quotes.
- Numerical information: support both large editorial numbers and compact data panels.
- Geography: adaptive selection from Equal Earth world overview, regional focus using an appropriate local projection, and orthographic globe; support meaningful transitions between modes when appropriate.
- Photography: support both circular portraits and rectangular editorial photography.
- Weather: support both minimal animated condition icons and detailed atmospheric visuals. Distinguish observations from forecasts and use verified data.

Selection guidance: text-led quotes emphasize the statement, portrait-led quotes emphasize the speaker; use large numbers for a dominant fact and compact panels for related context. Choose portraits for identification and editorial imagery for scene context. Use weather icons for compact forecasts and atmospheric treatments for relevant conditions or hazards; illustrative imagery must not masquerade as event footage. Map transitions should clarify geographic relationships. These are implementation guidelines, not individually approved designs. No mandatory panel or photo crop; respect existing frame, rights, readability and narration timing.

## Showcase
A silent, non-news visual review reel uses explicitly fictional/demonstration text and numbers, not real claims. Each sample isolates a repeatable module; it is not a news story. The map variant reel uses geographic example locations only. The showcase is separate from published content and does not enter the news registry. Supported variants are approved; review specific artwork and test production modules in Remotion before release. Existing tariff compositions remain reference previews.

## Motion quality gate (owner feedback, 2026-11-27)
Context-driven glyphs and adaptive layouts must retain the constructive motion quality of the earlier tariff prototype. Every module needs a staged construction, meaningful development, readable sustain, semantically motivated transition and settled resolution. Draw paths progressively, stagger independent parts, retain shared objects across beats, and use eased repositioning or focus changes rather than replacing entire scenes. Avoid decorative motion, abrupt swaps and overlapping readable headings. Compare against the earlier tariff preview and the same-story baseline before approving a new treatment. Silent proofs are not production renders; final cues must follow actual narration.

## Editorial alignment
Center headline lines and their scale origin on the 540px centreline of the 1080px frame. Center supporting paragraph lines, topic headings and associated section labels. Preserve stable line breaks and character positions during reveal. Local data labels align to their graphic anchors; keep category and logo in their fixed corners. Historical baseline remains unchanged.

## Constructive/deconstructive glyph motion (approved)
Choose an entrance and exit together for each object. Paths may retract toward their origin, layered parts disassemble in reverse order, or explanatory details return to their source object. Shared objects may persist and move or morph when the story warrants it. Use opacity to support geometry, not as the default exit for an entire related scene. Quiet dissolves remain available when continuity is not meaningful. Preserve readable dwell time and narration-led timing; do not force every object to leave at the end.

## Supporting text and optical header alignment (owner-approved direction)
Header: align the settled category ink bounds to the main Signal G ring center at y=156px, keeping logo and margins fixed. Measure actual selected font metrics; no universal hardcoded offset across fonts. Preserve original entrance timing.
Supporting information: select by meaning, not a fixed footer. Key takeaway uses centered concise text with selective emphasis; attributed paraphrase identifies speaker/organization and does not use quotation marks; direct quote has a distinct animated quotation mark, exact words, speaker identification and optional portrait; key data uses large values with units/date/qualifier. Prefer 6–12 words, 1–2 lines, Montserrat 500/48px primary and role-specific 32px secondary (see current typography rules below). Avoid duplicates. Use original letter-rise/fade entrance and reverse stagger or directional exit where applicable. For a final news beat, settle rather than remove. V7 centered text and glyph entrance/exit motion accepted by owner. Individual text designs still subject to preview review.

V8's optical header alignment and adaptive supporting-text treatments are approved as the visual direction. Preserve V7 glyph entrances/exits and centered typography. The V8 example has paraphrases, not direct quotes; the direct quote module still needs a genuine quote demonstration.

## Paired timeline dates (owner feedback, 2026-11-27)
For comparable milestones, use the same compact date font size, weight, baseline and optical alignment. Center each date and its secondary label under its own anchor; secondary labels share sizing and vertical spacing. Distinguish status through restrained semantic colour and explicit wording, not by making one date larger. Keep both dates smaller than the previous dominant V8 date; respect the 32px minimum at 1080p. Preserve the existing timeline geometry, reveal sequence and narration-led timing. An isolated dominant date may use a larger treatment when the story calls for it, but paired dates must remain balanced.

## Typography system (owner approved 2026-11-28)
Use the owner-approved typography roles in brand/tokens.json (2026-11-28): Oxanium 500/32px header; Space Grotesk 600/80–96px opening headline shrinking as one fixed layer to 40px; Oxanium 600/36px topic, Oxanium 500/60px topic subtext; Montserrat 500/48px supporting/bottom text; Montserrat 500/48px genuine italic only for verified direct quotations; Montserrat 500/32px upright attribution; Oxanium 600 adaptive key figures and Oxanium 500/32px secondary labels. Paired dates share font, weight, size and baseline. Preserve 32px minimum. Inter and JetBrains Mono are superseded for new production. Keep all other brand/motion rules. Use the existing semantic accent colours sparingly, preserve the font size, weight and style of highlighted text, and do not confuse paraphrase with a quote. This rule supersedes earlier family and size guidance.
Text reveals use 1 reference tick (2 frames at 60fps) per character and 8 ticks (16 frames) per character, 18px rise/fade, cubic Bézier (0.2, 0.8, 0.2, 1), reverse-stagger exit, fixed text positions and smooth scaling of a single headline composition. No synthetic italics or unverified fallback. Preserve visual emphasis semantics rather than adding effects.

## Caption and theme policy (2026-11-28)
Owner approved no continuous narration captions in GlyphWire videos (meaningful editorial text, exact quotations, labels and data remain). Support a light-background variant in addition to dark; exact light-theme tokens and visual treatment are subject to preview approval. Theme variation does not by itself establish YouTube monetization eligibility: each story requires original editorial substance and story-specific visuals. Do not add captions or change the approved typography/brand layout.

## Light preview corrections (owner feedback 2026-11-28)
Owner requested music 2 dB below prior reference and 3 dB duck depth rather than 6 dB. Voice +3 dB (141.3%), music -11 dB (28.2%), ducked music -14 dB (20.0%). config/audio.json is authoritative. Rights and loop verification remain pending. Owner rejected the Belgium light preview's crude low-resolution map, box-like map mask, static logo, overly basic visuals and changed accent colours. Preserve exact Signal Lime #A3E635, Wire Cyan #38BDF8 and Alert Coral #FF625C in both themes; light uses Ivory background and Ink body text. Use high-contrast text treatment as necessary, without silently redefining the brand palette; exact treatment awaits review. Use accurate higher-detail geographic data with verified provenance/licensing and suitable projection, continuous camera movement without rectangular map panels, anchored non-overlapping labels, animated original Signal G and layered story-specific visuals. No new preview design is approved by this feedback.
