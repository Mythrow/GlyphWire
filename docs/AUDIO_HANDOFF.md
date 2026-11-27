# GlyphWire — narration and acoustic alignment

Authority: DECISIONS.md for owner-approved decisions; config/audio.json for synthesis parameters. This is the operational audio handoff contract. Bharat Mode is a read-only reference for production QA, not a dependency or narrator/brand source.

## Responsibilities and input
Regular chat prepares story research, canonical script and visual beat plan, and supplies a copyable story-specific prompt to the dedicated GlyphWire Audio Production Work chat. Work generates narration only; no news research, script rewriting, video, music mixing, publication or repository writes. Return one ZIP to regular chat for timing, mix and rendering.
Include story key (clearly identify previews), title, branch, ordered scene IDs, exact spoken text, pronunciation risks, voice settings and QA/delivery requirements. Beat labels and provisional durations are metadata, never spoken. Read this document and config/audio.json. Preserve exact wording; document any pronunciation-only synthesis input separately from canonical script. No extra tagline. Do not force a provisional duration.

## Generation
Kokoro-82M, af_jessica exclusively, American English (lang_code a), speed 1.0. Natural, composed, clear professional news narration, consistent voice identity, pacing and level; natural sentence pauses. One 24 kHz mono PCM16 WAV per scene, no music or SFX. Local free inference only. Verify actual installed model/voice identity, dependency versions, model revision or weight hashes where available; do not assume cached environment persists. Report unavailable provenance.

## Acoustic alignment and QA
Run local WhisperX English acoustic word alignment on each actual final WAV and exact spoken transcript; install/cache dependencies and weights if necessary. No invented, proportional, inherited or interpolated timestamps; Kokoro token timing alone is not a substitute. Each successful alignment JSON contains source: "final-audio-acoustic-alignment", scene_id, transcript, audio_sha256 (lowercase SHA-256), duration_seconds (sample count/sample rate), words (array of word, start, end in seconds). Document punctuation/case and tokenization normalization; account for every spoken word without silent substitution or omission. Require finite monotonic non-overlapping intervals, 0 <= start < end <= duration_seconds. Missing or invalid timings fail the alignment gate. Regenerate alignment and hashes whenever audio changes.
Independently run offline ASR against the canonical transcript; record recognized text, normalization, differences and pass/fail. Forced alignment is transcript-conditioned and does not prove correct pronunciation. Separately listen for correct proper names, dates, abbreviations, complete speech, natural pauses, clipping and voice consistency where possible. Report unavailable listening or unresolved pronunciation honestly. Check WAV format, sample count, peaks/clipping and measured duration. Regenerate failed scenes and re-run QA. Never mark incomplete QA as passed.

## ZIP deliverable
Return <story-key>-narration.zip with:
- audio/scene-01.wav etc. (one final WAV per scene)
- alignment/scene-01.json etc. (genuine successful alignment only; explicitly report failures)
- script.json (story key, ordered IDs and exact text; separate pronunciation-only inputs if used)
- durations.json (measured seconds per scene and sum, no invented gaps)
- checksums.sha256 (all delivered payload files except checksum file itself)
- transcript-qa.jsonl (per-scene ASR comparison and result)
- alignment-qa.log (method, checks, failures)
- QA-notes.txt (settings, provenance, dependency versions, listening/pronunciation and format QA, limitations).
Report per-scene durations, total and QA status. If alignment or QA is unavailable, deliver a clearly marked partial package, never a fabricated pass. Keep generated/private audio outside Git.

## Integration
Regular chat verifies hashes, scene count, canonical text, format and alignment before deriving global offsets and narration-led cues; account for explicitly chosen pauses. No forced captions or brand changes. Mix only approved 128 BPM music after verifying loop boundary and levels. Library/Project Files news-bed-128bpm.mp3 is the runtime binary source if GitHub binary retrieval fails; verify against repository master. Final render and owner publication approval gates remain in PRODUCTION.md. Native alignment validator and end-to-end integration remain engineering work, not implemented by this document.
