import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Logo } from "../brand/Logo";
import { durationFrames, enter, staggerFrames } from "../brand/motion";
import { fontFamily } from "../brand/fonts";
import { palette, sizes, minTextPx } from "../brand/tokens";
import { LetterReveal } from "./LetterReveal";
import { Hero } from "./Hero";

// Main-topic script for the tariff story, 24 s at 30 fps. Voice carries the
// detail; the screen shows only the main topic text and its hero object.
// Topic starts follow the narration: 4.5 s, 9.0 s, 13.5 s, 16.5 s.
const TOPICS = [
  { text: "14+ trading partners", start: 135 },
  { text: "Section 301", start: 270 },
  { text: "Deal-based rates", start: 405 },
  { text: "US–China tension", start: 495 },
];
const TOTAL = 720;

export const TariffShort: React.FC = () => {
  const f = useCurrentFrame();
  const label = enter(f, 0, durationFrames.fast);
  const headline = enter(f, staggerFrames * 2, durationFrames.base);
  const shrink = enter(f, 135, 60);
  const topicIndex = TOPICS.reduce((acc, tp, i) => (f >= tp.start ? i : acc), 0);
  const topic = TOPICS[topicIndex];
  const topicT = f - topic.start;
  const progress = f / TOTAL;

  return (
    <AbsoluteFill style={{ background: palette.background, padding: 96, boxSizing: "border-box" }}>
      <div style={{ fontFamily: fontFamily.label, fontSize: Math.max(sizes.label, minTextPx), color: palette.primary, letterSpacing: ".06em", opacity: label, transform: `translateY(${(1 - label) * -20}px)` }}>
        <LetterReveal text="BREAKING · WORLD" start={0} perChar={1} duration={8} />
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
          transform: `translateY(${(1 - headline) * 24}px) scale(${1 - 0.42 * shrink})`,
          transformOrigin: "left top",
        }}
      >
        <LetterReveal text="US readies tariffs on 14+ trading partners" start={8} perChar={1} duration={8} />
      </div>

      <div style={{ position: "absolute", top: 96, right: 96 }}>
        <Logo size={120} progress={enter(f, 15, durationFrames.slow)} />
      </div>

      {f >= 135 ? (
        <div
          key={topicIndex}
          style={{
            position: "absolute",
            top: 640,
            left: 96,
            right: 96,
            fontFamily: fontFamily.display,
            fontWeight: 700,
            fontSize: 96,
            lineHeight: 1.05,
            color: palette.primary,
            textAlign: "center",
          }}
        >
          <LetterReveal text={topic.text} start={topic.start} perChar={1} duration={8} />
        </div>
      ) : null}

      {f >= 135 ? (
        <div style={{ position: "absolute", top: 860, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <Hero key={topicIndex} topic={topicIndex} t={topicIndex === 0 ? Math.max(0, f - 135) : topicT} width={820} />
        </div>
      ) : null}

      <div style={{ position: "absolute", left: 96, right: 96, bottom: 96, height: 8, background: palette.border, borderRadius: 4 }}>
        <div style={{ width: `${progress * 100}%`, height: 8, background: palette.primary, borderRadius: 4 }} />
      </div>
    </AbsoluteFill>
  );
};
