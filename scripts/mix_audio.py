"""Mix approved bed and actual voice; loop the explicitly supplied last full bar."""
import argparse
import json
import math
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]

def probe(path):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)], text=True).strip())

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--voice", type=Path, required=True)
    p.add_argument("--out", type=Path, required=True)
    p.add_argument("--duration", type=float, required=True)
    p.add_argument("--loop-end", type=float, required=True)
    p.add_argument("--voice-gain", type=float, required=True)
    p.add_argument("--music-gain", type=float, required=True)
    args = p.parse_args()
    cfg = json.loads((ROOT / "config/audio.json").read_text())["music"]
    bed = ROOT / cfg["path"]
    bar = 60 / cfg["bpm"] * cfg["beatsPerBar"]
    if not all(map(math.isfinite, [args.duration, args.loop_end, args.voice_gain, args.music_gain])):
        p.error("finite values required")
    if not 15 <= args.duration <= 60 or not bar < args.loop_end <= probe(bed):
        p.error("invalid duration or loop end")
    if not (0 < args.voice_gain <= 1 and 0 < args.music_gain <= 1):
        p.error("gains must be in (0,1]")
    if probe(args.voice) > args.duration + 0.01:
        p.error("narration exceeds video duration")
    if args.out.suffix.lower() != ".wav" or args.out.resolve() == args.voice.resolve():
        p.error("choose a distinct WAV output")
    args.out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as directory:
        loop = Path(directory) / "bar.wav"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(bed), "-af", f"atrim=start={args.loop_end-bar}:end={args.loop_end},asetpts=PTS-STARTPTS", "-ar", "48000", "-ac", "2", str(loop)], check=True)
        # Concat the master introduction and the repeated last complete bar.
        filt = (f"[0:a]atrim=end={args.loop_end},asetpts=PTS-STARTPTS,aformat=sample_rates=48000:channel_layouts=stereo[intro];"
                f"[1:a]atrim=duration={args.duration},asetpts=PTS-STARTPTS[loop];"
                f"[intro][loop]concat=n=2:v=0:a=1,atrim=duration={args.duration},volume={args.music_gain}[bed];"
                f"[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume={args.voice_gain},apad[voice];"
                f"[bed][voice]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95:level=false[out]")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(bed), "-stream_loop", "-1", "-i", str(loop), "-i", str(args.voice), "-filter_complex", filt, "-map", "[out]", "-t", str(args.duration), "-ar", "48000", "-c:a", "pcm_s16le", str(args.out)], check=True)
    print("Candidate mix created. Verify audible loop, loudness, speech and rights before release.")

if __name__ == "__main__":
    main()
