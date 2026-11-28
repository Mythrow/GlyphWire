# GlyphWire visual refinement prototype

Authority: DECISIONS.md. This is an implementation description, not a newly approved finished visual.

Fixed frame: 1080 × 1920, 60 fps, 96px margins; existing top-left category, top-right Signal G, headline entrance/shrink, topic text at y=640, hero at y=860, continuous bottom progress. No change to fixed typography or colors. Original and enhanced compositions share the same frame and story props.

Motion inside the hero only:
- Partner hub: draw ring, establish source flag, trace radial connectors, dock partner flags, send understated pulses. Existing unknown partner slots remain neutral placeholders; no publication until confirmed.
- Section 301: assemble radar rings, graduations and crosshair, animate sweep trail and light existing symbolic blips. No data values are implied.
- Rates: construct the unlabeled dial, reveal fine graduations and animate the needle; no rate number or percentage.
- US–China: flags enter independently, link draws between them, alternating lime/coral resolves to coral, then a restrained pulse. No additional claim.
- Fade only outgoing hero over 16 output frames (8 original 30Hz motion ticks) before the next topic; preserve original text reveals.

Studio compositions: TariffBaseline and TariffShort. At 60fps use frames 270,540,810,990 as scene starts. Review intermediate and settled frames and full mobile playback. Existing source and voice are missing; actual acoustic cues and final publication approval are pending. Motion is deterministic from frame index, no wall-clock/random animation. No external image requests.

Latest review: header label centered on the existing 120px logo row; two-line headline in ivory/lime and original shrink behavior; native circular flag art. Continuous progress and hero positions retained. EU badge corrected to twelve upright stars. The approved original baseline remains available; this refinement is a review candidate.

The explicit two-line candidate uses 90px headline type and no wrapping within each line, after browser layout checking; baseline retains original headline styling. Actual approved-font fit must still be verified in Remotion.

## Superseding storytelling direction
See DECISIONS.md and NEWS_VISUAL_SYSTEM.md for owner-approved adaptive storytelling. The fixed topic and hero positions above describe the tariff preview, not mandatory future scene layout. Module-specific styling remains under review.

At 60fps, original LetterReveal displacement remains 18px, with a 16-output-frame (8 reference tick) entrance and 2-output-frame (1 reference tick) stagger, preserving original elapsed-time easing. The legacy geometry helpers receive continuous 30Hz reference ticks, not rounded 30fps samples. Story startFrame values are actual 60fps frame indices.
