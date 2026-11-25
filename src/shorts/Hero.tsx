import React from "react";
import { palette } from "../brand/tokens";
import { enter } from "../brand/motion";
import { FlagIcon, FlagCode } from "./Flags";

// Approved colours for the scanner and tension states.
const LIME = palette.primary;
const CORAL = palette.alert;

// The hero object for each main topic. `t` is frames since the topic began.
export const Hero: React.FC<{ topic: number; t: number; width: number }> = ({ topic, t, width }) => {
  if (topic === 0) {
    // Hub: US flag in the centre, partner flags branching out on the ring.
    const cx = width / 2, cy = width / 2, R = width * 0.36;
    const nodes = 13;
    const codes: (FlagCode | null)[] = ["CN", "EU", "JP", ...Array(nodes - 3).fill(null)];
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
          <FlagIcon code="US" size={210} />
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

  if (topic === 1) {
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

  if (topic === 2) {
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

  // US and China: the connection flickers lime and coral, then settles on coral.
  const flickerEnd = 40;
  const flicker = t < flickerEnd;
  const on = Math.floor(t / 3) % 2 === 0;
  const lineColor = flicker ? (on ? LIME : CORAL) : CORAL;
  const k = enter(t, 0, 12);
  return (
    <div style={{ position: "relative", width, height: width * 0.4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ opacity: k, transform: `scale(${0.7 + 0.3 * k})` }}><FlagIcon code="US" size={width * 0.3} /></div>
      <div style={{ position: "absolute", left: width * 0.3, right: width * 0.3, top: "50%", height: 8, background: lineColor, borderRadius: 4, opacity: 0.4 + 0.6 * k }} />
      <div style={{ opacity: k, transform: `scale(${0.7 + 0.3 * k})` }}><FlagIcon code="CN" size={width * 0.3} /></div>
    </div>
  );
};
