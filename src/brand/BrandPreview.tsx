import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Logo } from "./Logo";
import { enter } from "./motion";
import { fontFamily, fontsReady } from "./fonts";
import { palette, sizes, frame as frameSize, minTextPx } from "./tokens";
import { durationFrames, staggerFrames } from "./motion";

// Preview of the brand on a Short frame. Used to check tokens, type and logo in motion.
export const BrandPreview: React.FC = () => {
  const f = useCurrentFrame();
  // Wait for fonts so the first frames never render in a fallback face.
  const fontsLoaded = fontsReady !== undefined;
  const logoProgress = enter(f, 0, durationFrames.slow);
  const headline = enter(f, staggerFrames * 2, durationFrames.base);
  const label = enter(f, 0, durationFrames.fast);
  const lower = enter(f, durationFrames.slow, durationFrames.base);

  return (
    <AbsoluteFill style={{ background: palette.background, padding: 96, boxSizing: "border-box" }}>
      <div
        style={{
          fontFamily: fontFamily.label,
          fontSize: sizes.label,
          color: palette.primary,
          letterSpacing: ".06em",
          opacity: label,
        }}
      >
        BREAKING · WORLD
      </div>

      <div
        style={{
          fontFamily: fontFamily.display,
          fontWeight: 700,
          fontSize: sizes.headline,
          lineHeight: 1.04,
          color: palette.text,
          marginTop: 48,
          opacity: headline,
          transform: `translateY(${(1 - headline) * 24}px)`,
        }}
      >
        Headline goes here in two lines
      </div>

      <div style={{ position: "absolute", top: 120, right: 96 }}>
        <Logo size={180} progress={logoProgress} />
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
          opacity: lower,
          transform: `translateY(${(1 - lower) * 40}px)`,
        }}
      >
        <div style={{ fontFamily: fontFamily.label, fontSize: sizes.label, color: palette.primary }}>
          CONFIRMED · 2 SOURCES
        </div>
        <div style={{ marginTop: 24 }}>Body line for the lower third, one idea only.</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 96,
          bottom: 140,
          fontFamily: fontFamily.label,
          fontSize: Math.max(sizes.label, minTextPx),
          color: palette.muted,
        }}
      >
        Source: [wire service]
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
        <div style={{ width: `${(f / 150) * 100}%`, height: 8, background: palette.primary, borderRadius: 4 }} />
      </div>
      {fontsLoaded && null}
      <span style={{ display: "none" }}>{frameSize.aspect}</span>
    </AbsoluteFill>
  );
};
