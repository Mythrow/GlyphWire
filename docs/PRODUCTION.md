# GlyphWire production workflow

This is implementation guidance, not a new owner-approved editorial policy. See DECISIONS.md for approved rules.

1. Intake: register the event with a stable GW ID and unique event key; record original source URLs or explicitly owner-reported provenance, event and source dates if known, claims, caveats and approval state. Search prior records before making another video. External-source fact-check policy is unresolved; do not assert that a story has passed it.
2. Write a concise narration and information-sequence storyboard using docs/NEWS_VISUAL_SYSTEM.md. Establish the headline and first hero together, use optional headings and appropriate visual modules, preserve continuity between beats and finish on the last news development. Use structured story data under stories/; source citations go only in the description. Keep facts, provenance and claim status in the research record. The tariff sample is a visual proof, not verified news.
3. Generate the approved Kokoro voice, then listen for accuracy and pronunciation. Use real acoustic timestamps from the final narration (e.g. a locally run aligner) to set topic start frames; record the source and audio hash. Do not present estimated timings as verified alignment. No captions or alternative narrator are mandated.
4. Confirm music rights, last full bar boundaries and the mix level before mixing. At 128 BPM a four-beat bar is 1.875 seconds. The approved bed should run from its start, looping only the supplied last full bar before the one-hit ending. Do not guess edit points.
5. Render, inspect headline wrapping, safe margins, each module's reveal, reading time, transitions and settled state, timing, audio, full decode and mobile legibility. Verify no placeholder flags or unsupported figures remain. Final owner approval and manual upload remain required.
6. Record the approved output hash, title, description, sources and publication status. Do not promote scheduled/uploaded items to published without confirmation. Record analytics after publication at comparable ages (e.g. 24h and 7d); mark missing values null.

## Commands

Node 22 recommended; install pinned direct dependencies with npm install. Run npm run validate and npm run typecheck. Use npm start to open Studio. npm run render:tariff renders the existing visual proof; npm run render:story -- --props=stories/example.json overrides the default props (supply a valid story). These are previews, not an automatic publishing path.

For local audio tooling install Python Kokoro and soundfile in an isolated environment, and FFmpeg/ffprobe. Use a private environment and record actual dependency versions and model revision. The Python script requires explicit text input; it refuses empty narration. Example:
```sh
python scripts/narrate.py private/script.txt public/private/narration.wav
python scripts/mix_audio.py --voice public/private/narration.wav --out public/private/mix.wav --duration 24 --loop-end SECONDS --voice-gain GAIN --music-gain GAIN
```
Replace SECONDS with the verified end of the last complete bar; gains are explicit linear values, not approved defaults. The mix script uses the existing master and repeats its last 1.875-second bar after playing the introduction. It does not infer musical boundaries. Verify clipping, loudness and mix on mobile. Set audioPath in a private render-props JSON to private/mix.wav (relative to public/); keep it and the actual media out of Git. A missing audioPath means visual-only preview.

The tooling does not yet run a forced aligner, perform full rights checks, or automatically generate a release. Owner-approved final video must include verified audio and sources; the current branch makes no approval or publishing claim.
