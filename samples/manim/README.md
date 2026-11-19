# Cyclone sample (Manim, comparison only)

Kept for side-by-side comparison. Scene: `cyclone_manim.py`, class `CycloneShort`.

## Setup
System packages needed by manimpango (Debian/Ubuntu): `sudo apt-get install -y libpango1.0-dev pkg-config`

```bash
python3 -m venv ~/manim-env
~/manim-env/bin/pip install -r requirements.txt
```

## Render
```bash
~/manim-env/bin/manim -qh --resolution 1080,1920 --fps 30 -o cyclone_manim.mp4 cyclone_manim.py CycloneShort
```
