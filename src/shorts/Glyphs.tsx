import React from "react";
import { palette } from "../brand/tokens";

// Story glyphs drawn in the Signal G language: lime line work, round caps,
// one solid node. Each glyph is picked for the story it sits with.
export type GlyphKind = "trade" | "hub";

export const StoryGlyph: React.FC<{ kind: GlyphKind; size: number; progress?: number }> = ({ kind, size, progress = 1 }) => {
  if (kind === "trade") {
    // Cargo ship with containers: trade across borders.
    return (
      <svg width={size} height={size} viewBox="0 0 240 240" fill="none" stroke={palette.primary} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round">
        <rect x="46" y="112" width="58" height="42" rx="6" />
        <rect x="112" y="112" width="58" height="42" rx="6" />
        <rect x="79" y="62" width="58" height="42" rx="6" />
        <path d="M24 170 H216 L192 206 H48 Z" />
        <circle cx="120" cy="190" r="6" fill={palette.primary} stroke="none" />
      </svg>
    );
  }
  if (kind === "hub") {
    // One hub, many partners: 14 nodes on a ring around a solid source node.
    const n = 14;
    const pts = Array.from({ length: n }, (_, i) => {
      const a = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
      return { x: 120 + 100 * Math.cos(a), y: 120 + 100 * Math.sin(a) };
    });
    return (
      <svg width={size} height={size} viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="100" stroke={palette.primary} strokeWidth={4} opacity={0.35} />
        {pts.map((q, i) => {
          const p = Math.min(1, Math.max(0, progress * n - i * 0.6));
          return (
            <line key={i} x1="120" y1="120" x2={120 + (q.x - 120) * p} y2={120 + (q.y - 120) * p} stroke={palette.primary} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
          );
        })}
        {pts.map((q, i) => {
          const p = Math.min(1, Math.max(0, progress * n - i * 0.6));
          return <circle key={`d${i}`} cx={q.x} cy={q.y} r={9 * p} fill={palette.primary} />;
        })}
        <circle cx="120" cy="120" r={22 * Math.min(1, progress * 3)} fill={palette.primary} />
      </svg>
    );
  }
  return null;
};
