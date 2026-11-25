import React from "react";
import { AbsoluteFill } from "remotion";
import { palette, sizes } from "../brand/tokens";
import { fontFamily } from "../brand/fonts";
import { FlagIcon } from "./Flags";
import { StoryGlyph } from "./Glyphs";

// Storyboard frames for the Chen Jining Short. Shows one still per beat.
export const ChinaShort: React.FC<{ beat: number }> = ({ beat }) => {
  const beats = [
    { label: "BREAKING · WORLD", head: "China probes a rising leader", topic: "", hero: null as React.ReactNode },
    { label: "BREAKING · WORLD", head: "China probes a rising leader", topic: "Shanghai party chief", hero: <FlagIcon code="CN" size={460} /> },
    { label: "BREAKING · WORLD", head: "China probes a rising leader", topic: "Anti-corruption probe", hero: <StoryGlyph kind="hub" size={460} progress={1} /> },
    { label: "BREAKING · WORLD", head: "China probes a rising leader", topic: "Politburo member", hero: <StoryGlyph kind="trade" size={460} /> },
    { label: "BREAKING · WORLD", head: "China probes a rising leader", topic: "Analysts disagree", hero: <div style={{ width: 460, height: 460, borderRadius: "50%", border: `8px solid ${palette.primary}`, opacity: 0.6 }} /> },
    { label: "BREAKING · WORLD", head: "China probes a rising leader", topic: "Fourth since 2022", hero: <div style={{ display: "flex", gap: 40, alignItems: "center" }}><FlagIcon code="US" size={260} /><div style={{ width: 200, height: 8, background: palette.alert }} /><FlagIcon code="CN" size={260} /></div> },
  ];
  const b = beats[beat];
  return (
    <AbsoluteFill style={{ background: palette.background, padding: 96, boxSizing: "border-box", color: palette.text }}>
      <div style={{ fontFamily: fontFamily.label, fontSize: 32, color: palette.primary }}>{b.label}</div>
      <div style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: sizes.headline, marginTop: 120 }}>{b.head}</div>
      {b.topic ? <div style={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: 96, color: palette.primary, textAlign: "center", marginTop: 300 }}>{b.topic}</div> : null}
      {b.hero ? <div style={{ position: "absolute", top: 860, left: 0, right: 0, display: "flex", justifyContent: "center" }}>{b.hero}</div> : null}
    </AbsoluteFill>
  );
};
