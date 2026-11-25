import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Logo } from "../brand/Logo";
import { durationFrames, enter, staggerFrames } from "../brand/motion";
import { fontFamily } from "../brand/fonts";
import { palette, sizes, minTextPx } from "../brand/tokens";
import type { ShortProps } from "./types";

// Shared Short layout, drawn from the approved kit frame.
// Motion: label fades in, headline rises, logo draws, lower third slides up,
// progress bar fills across the whole video.
export const ShortTemplate: React.FC<ShortProps> = (props) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const logoProgress = enter(f, 0, durationFrames.slow);
  const label = enter(f, 0, durationFrames.fast);
  const headline = enter(f, staggerFrames * 2, durationFrames.base);
  const lower = enter(f, durationFrames.slow, durationFrames.base);
  const playhead = Math.min(1, f / durationInFrames);
  const progress = props.progress ?? playhead;
  // Lower third stays visible through the last quarter of the video.
  const lowerOut = enter(f, durationInFrames - durationFrames.base, durationFrames.base);
  const lowerOpacity = Math.min(lower, 1 - lowerOut);

  return (
    <AbsoluteFill style={{ background: palette.background, padding: 96, boxSizing: "border-box" }}>
      <div
        style={{
          fontFamily: fontFamily.label,
          fontSize: Math.max(sizes.label, minTextPx),
          color: palette.primary,
          letterSpacing: ".06em",
          opacity: label,
        }}
      >
        {props.category}
      </div>

      <div
        style={{
          fontFamily: fontFamily.display,
          fontWeight: 700,
          fontSize: sizes.headline,
          lineHeight: 1.04,
          color: palette.text,
          marginTop: 120,
          opacity: headline,
          transform: `translateY(${(1 - headline) * 24}px)`,
        }}
      >
        {props.headline}
      </div>

      <div style={{ position: "absolute", top: 96, right: 96 }}>
        <Logo size={120} progress={logoProgress} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          bottom: 260,
          background: palette.panel,
          border: `2px solid ${palette.border}`,
          borderRadius: 32,
          padding: 56,
          fontFamily: fontFamily.body,
          fontSize: sizes.body,
          lineHeight: 1.35,
          color: palette.text,
          opacity: lowerOpacity,
          transform: `translateY(${(1 - lower) * 40}px)`,
        }}
      >
        <div>{props.body}</div>
      </div>


      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          bottom: 96,
          height: 8,
          background: palette.border,
          borderRadius: 4,
        }}
      >
        <div style={{ width: `${progress * 100}%`, height: 8, background: palette.primary, borderRadius: 4 }} />
      </div>
    </AbsoluteFill>
  );
};
