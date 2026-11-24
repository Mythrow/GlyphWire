import React from "react";
import { palette } from "./tokens";

export type LogoProps = {
  size: number;
  // 0 to 1. Ring and node reveal from this value; arcs follow.
  progress?: number;
  // Draw the dark tile behind the mark. Off for transparent overlays.
  tile?: boolean;
};

// Signal G mark. Geometry matches brand/logo/glyphwire-mark.svg exactly.
export const Logo: React.FC<LogoProps> = ({ size, progress = 1, tile = true }) => {
  const lime = palette.primary;

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="GlyphWire logo">
      {tile && <rect width="120" height="120" rx="24" fill={palette.background} />}
      <g fill="none" stroke={lime} strokeLinecap="round">
        <path
          d="M74.84 36.25A28 28 0 1 0 88 60H67"
          strokeWidth={9}
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - progress}
        />
        <path d="M81.24 27.29A39 39 0 0 1 96.41 46.02" strokeWidth={4} opacity={progress} />
        <path d="M85.05 21.42A46 46 0 0 1 102.94 43.52" strokeWidth={4} opacity={0.65 * progress} />
        <path d="M88.87 15.55A53 53 0 0 1 109.48 41.01" strokeWidth={4} opacity={0.4 * progress} />
      </g>
      <circle cx="62" cy="60" r="7.5" fill={lime} opacity={progress} />
    </svg>
  );
};
