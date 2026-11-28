# GlyphWire — current status

## Production foundation (review branch)

- Approved identity and creative rules: [DECISIONS.md](DECISIONS.md).
- Existing tariff proof: 24 seconds, four topic heroes; original timings are carried forward as provisional, not acoustically verified. Source article and narration are not committed; ten partner placeholders remain unresolved. Not a release.
- The new TopicShort composition consumes structured story props. The legacy lower-third renderer is retained as LegacyShort. Existing TariffShort remains available as a visual reference.
- Content registry, validation tests, audio tooling and CI configuration are in place in this branch. No actual narration, soundtrack mix, full render, mobile QA, source verification or publication has been performed by this change.
- Next: validate CI and compare reference frames; obtain tariff source/narration and partner list, confirm music rights, loop boundaries and mix level, generate the approved voice, align actual cue timings, render and obtain owner approval.
- Open editorial/creative questions remain in DECISIONS.md. No change to approved brand, narration identity, music or publishing authority.

## Visual refinement prototype (2026-11-27)

Owner approved borrowing Bharat Mode's motion craft while preserving GlyphWire's original frame. Enhanced tariff hero geometry is now implemented in Hero.tsx and heroArt.ts; TariffBaseline preserves the original hero version, TariffShort uses the enhanced version. Both use identical headline, logo, label, progress, story timing, size and margins. Four hero scenes have layered formation, line drawing, pulses, scan trails and dial detail; no new factual labels or guessed flags/rates. Timings remain provisional. No actual Remotion render, real audio alignment or final owner visual approval asserted. Compare reference frames and verify CI/build before merge.

Browser proof inspected separately in chat; US flag crop and radar contrast adjusted in source. Native Remotion validation remains outstanding.

Latest visual review candidate: aligned header, stronger two-line headline, licensed circular flags. No final visual approval or actual narration sync yet.

## Adaptive news storytelling (2026-11-27)
Owner approved opening hero alongside headline, persistent headline, sources in description only, no outro, and broad adaptive storytelling/module direction. Further questions and map design choices remain open. NEWS_VISUAL_SYSTEM.md records implementation guidance and review candidates. Existing Remotion tariff previews are not yet migrated to this system; native build/CI remains unresolved. Visual showcase prepared separately for owner review, not a publishable story.

Owner selected both quotation, number, photography and weather variants, and all three adaptive geographic modes. Decisions recorded; individual module designs, precise map data/boundary choices and production implementation remain pending. No production code changes in this documentation update.

## Native 60fps migration (2026-11-27)
Owner approved 1080 × 1920 at 60fps for all previews and final videos. Review branch migrates compositions and actual story cue frames, keeps existing motion at continuous reference ticks, updates validation and sets PNG intermediate captures/high-quality CRF. Native Remotion build and visual regression checks still pending; standalone preview is separately rendered and is not proof of native Remotion success.

Owner approved constructive entrances and deconstructive exits, with meaningful transformations and shared object continuity preferred. V7 standalone news review tests staged bracket/silhouette removal, line retraction, and a recording-indicator callout returning to the glasses before the court graphic constructs. Native adaptive Remotion module implementation and validation remain outstanding; this is a documentation update, not a claim of production implementation.

Owner accepted V7 centered typography and constructive/deconstructive glyph motion and authorized adaptive supporting information treatments and optical header alignment. V8 standalone proof retains V7 glyph geometry, demonstrates takeaway, attributed paraphrase and key-data hierarchy; no invented direct quote. Native module implementation and font/Remotion validation remain outstanding.

Owner approved V8 visual direction and requested narration/music for the same preview. Visuals approved for this review, not publication. Actual approved voice synthesis, soundtrack mixing, timing and audio QA must be verified before reporting completion.

## V9 timeline refinement (2026-11-27)
Owner requested smaller, matching date typography in the V8 court timeline. The permanent paired-date rule is recorded in DECISIONS.md and NEWS_VISUAL_SYSTEM.md. A standalone edited V9 preview was shared in chat; it is not a native Remotion render or an approved final design. Native timeline implementation and visual QA remain pending.

## Audio-only Work handoff (2026-11-27)
Owner reports dedicated Work Kokoro environment ready; story-specific synthesis, WhisperX availability and independent QA remain unverified here. AUDIO_HANDOFF.md defines the scene-based ZIP and evidence requirements. Regular chat retains timing/mix/render duties. Approved music is available in the owner's Library as news-bed-128bpm.mp3; verify bytes per use. This documentation update does not implement a native aligner/validator, certify audio rights, approve a final mix or publish a story.

## Narrator review and HTML listening gate (2026-11-27)
Owner reports dissatisfaction with the Kokoro narration and absence of HTML review. Mandatory playable HTML review before final audio handoff is now documented. Female Qwen3-TTS auditions requested; no new voice selected, no Qwen setup or samples verified in this update. Final narration on hold pending selection and repeatability approval. Kokoro configuration unchanged; Bharat Mode repository/reference untouched.

Owner refined the audition sequence: compare distinct female identities in a shared normal speaking tone first, then test delivery styles on shortlisted voices. The audio handoff documents this staged approval; actual audition generation and selection are still pending.

## Narrator selection resolved (2026-11-28)
Owner rejected the Qwen female audition results and reaffirmed the original Kokoro af_jessica voice. Auditions are closed and the temporary narrator-selection hold is lifted; the original synthesis configuration is unchanged. Earlier audition status above is historical. Next: recover or generate the five-scene Meta glasses preview narration using the approved Kokoro settings, deliver a playable HTML preview for owner approval, then complete the verified alignment/QA ZIP and video integration. Existing audio is not automatically approved; actual synthesis, listening review and alignment must be verified. No changes to Bharat Mode or music configuration.

## Typography correction preview (2026-11-28)
The synchronized Meta camera glasses standalone proof inherited nonconforming headline and label fonts from flattened V8. The corrected review MP4 reconstructs those text layers using authentic Space Grotesk Bold and JetBrains Mono Medium outlines from upstream static TTFs (Git blobs f8eb245d1ec7fd02d77f5a9b55ef6afc4c9ed1c1 and dc2e5d08677d603b6755dc6c34fc8ad9aa6fc8a5); remaining body text is inherited from the previous preview and visually matched to Inter, not source-font verified. Paired dates use Space Grotesk Bold at the same 42px size for this review, not a new permanent typography decision. The existing video graphics and AAC stream were retained; 1080×1920, 60fps, 1350 frames, 22.5s, full decode passed and audio stream hash matched. Text reveal timings were reconstructed; not a native Remotion rerender. Owner video review, native font preflight implementation and render QA remain pending. No publication or further owner approval asserted.

## Typography redesign (2026-11-28)
Owner approved Oxanium, Space Grotesk and Montserrat with the role weights/sizes in brand/tokens.json and quotation-only genuine italics. Brand tokens, font loader and existing template font references updated. Native adaptive modules and native font-loading/CI/visual QA remain pending; legacy templates do not implement every new text role. Standalone Meta glasses review preview is separately reconstructed with actual selected font outlines and existing graphics/audio; no publication approval asserted.
