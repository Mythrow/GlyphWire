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
Supporting information: select by meaning, not a fixed footer. Key takeaway uses centered concise text with selective emphasis; attributed paraphrase identifies speaker/organization and does not use quotation marks; direct quote has a distinct animated quotation mark, exact words, speaker identification and optional portrait; key data uses large values with units/date/qualifier. Prefer 6–12 words, 1–2 lines, Inter 44–52px primary and 32–36px secondary. Avoid duplicates. Use original letter-rise/fade entrance and reverse stagger or directional exit where applicable. For a final news beat, settle rather than remove. V7 centered text and glyph entrance/exit motion accepted by owner. Individual text designs still subject to preview review.
