"""Generate the approved narrator locally; no metered API calls."""
import argparse
import json
from pathlib import Path

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("script", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    text = args.script.read_text(encoding="utf-8").strip()
    if not text:
        parser.error("empty narration")
    if args.output.suffix.lower() != ".wav":
        parser.error("output must be WAV")
    import numpy as np
    import soundfile as sf
    from kokoro import KPipeline
    config = json.loads((Path(__file__).resolve().parents[1] / "config/audio.json").read_text())["voice"]
    pipeline = KPipeline(lang_code=config["language"])
    chunks = [np.asarray(audio, dtype=np.float32) for _, _, audio in pipeline(text, voice=config["voice"], speed=config["speed"]) if audio is not None]
    if not chunks:
        raise RuntimeError("Kokoro produced no audio")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    sf.write(args.output, np.concatenate(chunks), 24000, subtype="PCM_16")
    print("Generated candidate narration; verify transcript, pronunciation and timing before approval.")

if __name__ == "__main__":
    main()
