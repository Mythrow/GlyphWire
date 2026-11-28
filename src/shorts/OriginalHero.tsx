import React from "react";
import { palette } from "../brand/tokens";
import { enter } from "../brand/motion";
import { FlagIcon } from "./Flags";
import type { HeroSpec } from "./topicTypes";
import { StoryGlyph } from "./Glyphs";

// Approved colours for the scanner and tension states.
const LIME = palette.primary;
const CORAL = palette.alert;

// The hero object for each main topic. `t` is frames since the topic began.
export const OriginalHero: React.FC<{ spec: HeroSpec; t: number; width: number }> = ({ spec, t, width }) => {
  if (spec.kind === "trade" || spec.kind === "hub") {
    return <StoryGlyph kind={spec.kind} size={width * 0.7} progress={enter(t, 0, 22)} />;
  }
  if (spec.kind === "partner-hub") {
    // Hub: US flag in the centre, partner flags branching out on the ring.
    const cx = width / 2, cy = width / 2, R = width * 0.36;
    const codes = spec.partners;
    const nodes = codes.length;
    const hub = enter(t, 0, 14);
    return (
      <div style={{ position: "relative", width, height: width }}>
        <svg width={width} height={width} style={{ position: "absolute", inset: 0 }} fill="none">
          <circle cx={cx} cy={cy} r={R} stroke={LIME} strokeWidth={4} opacity={0.35} />
          {codes.map((_, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / nodes;
            const k = enter(t, 20 + i * 5, 12);
            return <line key={i} x1={cx} y1={cy} x2={cx + R * Math.cos(a) * k} y2={cy + R * Math.sin(a) * k} stroke={LIME} strokeWidth={4} opacity={0.6 * k} />;
          })}
        </svg>
        <div style={{ position: "absolute", left: cx - 105, top: cy - 105, opacity: hub, transform: `scale(${0.6 + 0.4 * hub})` }}>
          <FlagIcon code={spec.center} size={210} />
        </div>
        {codes.map((code, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / nodes;
          const k = enter(t, 20 + i * 5, 12);
          const size = 96;
          return (
            <div key={i} style={{ position: "absolute", left: cx + R * Math.cos(a) - size / 2, top: cy + R * Math.sin(a) - size / 2, opacity: k, transform: `scale(${0.4 + 0.6 * k})` }}>
              {code ? <FlagIcon code={code} size={size} /> : <div style={{ width: size, height: size, borderRadius: "50%", background: "#2A3644" }} />}
            </div>
          );
        })}
      </div>
    );
  }

  if (spec.kind === "radar") {
    // Radar: a sweep rotates; blips light up as it passes, green or red.
    const sweep = (t * 3) % 360;
    const a = (sweep * Math.PI) / 180;
    const blips = [
      { r: 60, ang: 40, col: LIME }, { r: 85, ang: 130, col: CORAL }, { r: 45, ang: 210, col: LIME },
      { r: 75, ang: 290, col: CORAL }, { r: 95, ang: 330, col: LIME }, { r: 30, ang: 90, col: CORAL },
    ];
    return (
      <svg width={width} height={width} viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="110" stroke={LIME} strokeWidth={3} opacity={0.3} />
        <circle cx="120" cy="120" r="75" stroke={LIME} strokeWidth={2} opacity={0.2} />
        <circle cx="120" cy="120" r="40" stroke={LIME} strokeWidth={2} opacity={0.2} />
        <line x1="120" y1="120" x2={120 + 110 * Math.cos(a)} y2={120 + 110 * Math.sin(a)} stroke={LIME} strokeWidth={3} />
        {blips.map((b, i) => {
          const passed = ((sweep - b.ang + 360) % 360);
          const lit = passed < 120 ? 1 - passed / 120 : 0.15;
          const rad = (b.ang * Math.PI) / 180;
          return <circle key={i} cx={120 + b.r * Math.cos(rad)} cy={120 + b.r * Math.sin(rad)} r={6} fill={b.col} opacity={lit} />;
        })}
        <circle cx="120" cy="120" r="6" fill={LIME} />
      </svg>
    );
  }

  if (spec.kind === "rate-dial") {
    // Deal-based rates: a dial whose needle keeps moving. No figure shown.
    const sweep = 0.5 + 0.45 * Math.sin(t / 14);
    const theta = Math.PI * (1 - sweep);
    const cx = 120, cy = 150, r = 100;
    const nx = cx + 80 * Math.cos(theta), ny = cy - 80 * Math.sin(theta);
    return (
      <svg width={width} height={width} viewBox="0 0 240 240" fill="none">
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} stroke={LIME} strokeWidth={10} opacity={0.3} />
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(theta)} ${cy - r * Math.sin(theta)}`} stroke={LIME} strokeWidth={10} strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={LIME} strokeWidth={6} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={12} fill={LIME} />
      </svg>
    );
  }

  // Two confirmed flags: connection flickers lime and coral, then settles on coral.
  if (spec.kind !== "connection") return null;
  const flickerEnd = 40;
  const flicker = t < flickerEnd;
  const on = Math.floor(t / 3) % 2 === 0;
  const lineColor = flicker ? (on ? LIME : CORAL) : CORAL;
  const k = enter(t, 0, 12);
  return (
    <div style={{ position: "relative", width, height: width * 0.4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ opacity: k, transform: `scale(${0.7 + 0.3 * k})` }}><FlagIcon code={spec.left} size={width * 0.3} /></div>
      <div style={{ position: "absolute", left: width * 0.3, right: width * 0.3, top: "50%", height: 8, background: lineColor, borderRadius: 4, opacity: 0.4 + 0.6 * k }} />
      <div style={{ opacity: k, transform: `scale(${0.7 + 0.3 * k})` }}><FlagIcon code={spec.right} size={width * 0.3} /></div>
    </div>
  );
};
