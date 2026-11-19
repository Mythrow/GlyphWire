// GlyphWire design tokens. Every scene reads from here; do not hardcode colours or sizes in scenes.
import {Easing} from 'remotion';

export const color = {
  bgTop: '#05070D',
  bgBottom: '#0A1424',
  accent: '#3DE6FF', // primary cyan
  accent2: '#7B61FF', // violet, secondary
  warning: '#FFB547', // amber, landfall and alerts only
  text: '#F4F8FF',
  textMuted: '#8FA3BF',
  hairline: 'rgba(255,255,255,0.08)',
  glass: 'rgba(255,255,255,0.06)',
  glassBorder: 'rgba(255,255,255,0.12)',
} as const;

export const font = {
  family: 'Inter, "Helvetica Neue", Arial, sans-serif',
  // Type scale for a 1080px-wide frame. Nothing below 28px.
  display: {size: 120, weight: 700, tracking: -2, leading: 1.0},
  headline: {size: 88, weight: 600, tracking: -1, leading: 1.05},
  metric: {size: 96, weight: 600, tracking: -2, leading: 1.0},
  body: {size: 44, weight: 500, tracking: 0, leading: 1.4},
  label: {size: 32, weight: 600, tracking: 6, leading: 1.0},
  caption: {size: 28, weight: 400, tracking: 0, leading: 1.4},
} as const;

export const layout = {
  width: 1080,
  height: 1920,
  safeX: 96, // side margin
  safeTop: 220,
  safeBottom: 340, // Shorts UI overlays the bottom
  gap: 24,
} as const;

export const motion = {
  // Ease-out for entrances, ease-in-out for scene changes.
  enter: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  exit: Easing.bezier(0.7, 0, 0.84, 0),
  spring: {damping: 14, stiffness: 170, mass: 0.6},
  sceneOverlap: 12, // frames of crossfade between scenes
  wordStagger: 3, // frames between words
  labelStagger: 1.2, // frames between letters in labels
} as const;
