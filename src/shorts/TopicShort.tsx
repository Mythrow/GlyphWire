import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Logo } from "../brand/Logo";
import { durationFrames, enter, staggerFrames, motionTicks } from "../brand/motion";
import { fontFamily } from "../brand/fonts";
import { palette, sizes, minTextPx, typeRoles } from "../brand/tokens";
import { LetterReveal } from "./LetterReveal";
import { Hero } from "./Hero";
import { OriginalHero } from "./OriginalHero";
import type { TopicShortProps } from "./topicTypes";

export const TopicShort: React.FC<TopicShortProps> = (props) => {
  const f = motionTicks(useCurrentFrame());
  const { durationInFrames: outputDuration } = useVideoConfig();
  const durationInFrames = motionTicks(outputDuration);
  // Story cues are actual 60fps frames; existing choreography uses continuous reference ticks.
  const topics = props.topics.map(topic => ({...topic, startFrame: motionTicks(topic.startFrame)}));
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
      <div style={{ ...(original ? {} : {position: "absolute", left: 96, top: 156, transformOrigin: "left center"}), fontFamily: fontFamily.label, fontSize: Math.max(sizes.header, minTextPx), fontWeight: typeRoles.header.weight, color: palette.primary, letterSpacing: ".06em", opacity: label, transform: `translateY(${(original ? 0 : -50)}%) translateY(${(1 - label) * -20}px)` }}>
        <LetterReveal text={props.category} start={0} perChar={1} duration={8} />
      </div>

      <div
        style={{
          fontFamily: fontFamily.display,
          fontWeight: typeRoles.openingHeadline.weight,
          fontSize: sizes.headline,
          lineHeight: 1.04,
          color: palette.text,
          ...(original ? {marginTop: 120} : {position: "absolute", top: 258, left: 96, right: 96}),
          textAlign: original ? "left" : "center",
          letterSpacing: original ? 0 : "-0.025em",
          opacity: headline,
          transform: `translateY(${(1 - headline) * 24}px) scale(${1 - (1 - sizes.persistentHeadline / sizes.headline) * shrink})`,
          // Keep the editorial headline on the vertical centreline throughout its scale animation.
          transformOrigin: original ? "left top" : "center top",
        }}
      >
        {!original && props.headlineLines ? <>
          <div style={{whiteSpace: "nowrap"}}><LetterReveal text={props.headlineLines[0]} start={8} perChar={1} duration={8}/></div>
          <div style={{color: palette.primary, whiteSpace: "nowrap"}}><LetterReveal text={props.headlineLines[1]} start={8 + Array.from(props.headlineLines[0]).length + 1} perChar={1} duration={8}/></div>
        </> : <LetterReveal text={props.headline} start={8} perChar={1} duration={8} />}
      </div>

      <div style={{ position: "absolute", top: 96, right: 96 }}>
        <Logo size={120} progress={enter(f, 15, durationFrames.slow)} />
      </div>

      {topic ? (
        <div
          key={`text-${topicIndex}`}
          style={{
            position: "absolute",
            top: 640,
            left: 96,
            right: 96,
            fontFamily: fontFamily.label,
            fontWeight: typeRoles.topicSubtext.weight,
            fontSize: sizes.subhead,
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
