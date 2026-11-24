import tokens from "../../brand/tokens.json";

// Single source: brand/tokens.json. Edit that file, not these constants.
export const palette = tokens.palette;
export const frame = tokens.frame;
export const sizes = tokens.typography.sizes1080;
export const durations = tokens.motion.durationMs;
export const easing = tokens.motion.easing;
export const staggerMs = tokens.motion.staggerMs;

export const fonts = {
  display: tokens.typography.display,
  body: tokens.typography.body,
  label: tokens.typography.label,
} as const;

// Minimum readable text size on a 1080 px wide frame.
export const minTextPx = tokens.typography.sizes1080.minimum;
