import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Logo } from "../brand/Logo";
import { durationFrames, enter, staggerFrames } from "../brand/motion";
import { fontFamily } from "../brand/fonts";
import { palette, sizes, minTextPx } from "../brand/tokens";
import { LetterReveal } from "./LetterReveal";
import { Hero } from "./Hero";
import { OriginalHero } from "./OriginalHero";
import type { TopicShortProps } from "./topicTypes";

export const TopicShort: React.FC<TopicShortProps> = (props) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const topics = props.topics;
  const first = topics[0]?.startFrame ?? durationInFrames;
  const label = enter(f, 0, durationFrames.fast);
  const headline = enter(f, staggerFrames * 2, durationFrames.base);
  const shrink = enter(f, first, 60);
  const topicIndex = topics.reduce((acc, tp, i) => (f >= tp.startFrame ? i : acc), -1);
  const topic = topics[topicIndex];
  const topicT = topic ? f - topic.startFrame : 0;
  const original = props.heroVersion === "original";
  const HeroComponent = original ? OriginalHero : Hero;
  const nextStart = topics[topicIndex + 1]?.startFrame;
  // Only the hero dissolves; fixed chrome and the original letter reveal stay unchanged.
  const heroOpacity = original || nextStart === undefined ? 1 : 1 - enter(f, nextStart - 8, 8);
  const progress = f / durationInFrames;

  return (
    <AbsoluteFill style={{ background: palette.background, padding: 96, boxSizing: "border-box" }}>
      {props.audioPath ? <Audio src={staticFile(props.audioPath)} /> : null}
      <div style={{ fontFamily: fontFamily.label, fontSize: Math.max(sizes.label, minTextPx), color: palette.primary, letterSpacing: ".06em", opacity: label, transform: `translateY(${(1 - label) * -20}px)` }}>
        <LetterReveal text={props.category} start={0} perChar={1} duration={8} />
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
        <LetterReveal text={props.headline} start={8} perChar={1} duration={8} />
      </div>

      <div style={{ position: "absolute", top: 96, right: 96 }}>
        <Logo size={120} progress={enter(f, 15, durationFrames.slow)} />
      </div>

      {topic ? (
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
          <LetterReveal text={topic.text} start={topic.startFrame} perChar={1} duration={8} />
        </div>
      ) : null}

      {topic ? (
        <div style={{ position: "absolute", top: 860, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: heroOpacity }}>
          <HeroComponent key={topicIndex} spec={topic.hero} t={topicT} width={820} />
        </div>
      ) : null}

      <div style={{ position: "absolute", left: 96, right: 96, bottom: 96, height: 8, background: palette.border, borderRadius: 4 }}>
        <div style={{ width: `${progress * 100}%`, height: 8, background: palette.primary, borderRadius: 4 }} />
      </div>
    </AbsoluteFill>
  );
};
