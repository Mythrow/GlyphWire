import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const BG = '#050B14';
const CYAN = '#38E8FF';
const AMBER = '#FFB020';
const WHITE = '#F4F8FF';
const MUTED = '#6B7F99';
const FONT = 'Inter, "Helvetica Neue", Arial, sans-serif';
const W = 1080;
const H = 1920;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Scene wrapper: fades in/out and gives children a local frame counter.
const Scene: React.FC<{from: number; to: number; children: (f: number) => React.ReactNode}> = ({from, to, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + 8, to - 8, to], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{opacity}}>
      {children(frame - from)}
    </AbsoluteFill>
  );
};

// Text that slides up and fades in with a spring.
const Rise: React.FC<{f: number; delay: number; children: React.ReactNode; style?: React.CSSProperties}> = ({f, delay, children, style}) => {
  const {fps} = useVideoConfig();
  const s = spring({frame: f - delay, fps, config: {damping: 200}});
  return <div style={{transform: `translateY(${(1 - s) * 50}px)`, opacity: s, ...style}}>{children}</div>;
};

// Background: moving grid plus a slowly pulsing glow.
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const off = (frame * 1.4) % 80;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 14);
  return (
    <AbsoluteFill>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <defs>
          <radialGradient id="glow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor={CYAN} stopOpacity={0.18 + 0.08 * pulse} />
            <stop offset="100%" stopColor={BG} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#glow)" />
        {Array.from({length: 30}).map((_, i) => (
          <line key={`v${i}`} x1={i * 40 - off} y1={0} x2={i * 40 - off} y2={H} stroke={CYAN} strokeOpacity={0.12} />
        ))}
        {Array.from({length: 50}).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 40 + off} x2={W} y2={i * 40 + off} stroke={CYAN} strokeOpacity={0.12} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// Scene 1: rotating particle spiral with pulsing rings.
const SpiralScene: React.FC<{f: number}> = ({f}) => {
  const cx = W / 2;
  const cy = 760;
  const dots = Array.from({length: 140}).map((_, i) => {
    const t = i / 140;
    const angle = t * Math.PI * 6 + f * 0.09;
    const r = 60 + t * 440;
    return {x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r * 0.6, size: 2.5 + t * 6, op: 0.3 + t * 0.7};
  });
  const rings = [0, 1, 2].map((k) => {
    const p = ((f + k * 20) % 60) / 60;
    return {r: 80 + p * 460, op: 1 - p};
  });
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      {rings.map((ring, k) => (
        <ellipse key={k} cx={cx} cy={cy} rx={ring.r} ry={ring.r * 0.6} fill="none" stroke={CYAN} strokeOpacity={ring.op * 0.5} strokeWidth={2} />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.size} fill={CYAN} opacity={d.op} />
      ))}
    </svg>
  );
};

// Scene 2 helpers: wind streaks sweeping left to right.
const WindStreaks: React.FC<{f: number}> = ({f}) => {
  const streaks = Array.from({length: 14}).map((_, i) => {
    const speed = 8 + (i % 5) * 4;
    const x = ((i * 137 + f * speed) % (W + 400)) - 200;
    const y = 300 + i * 90;
    return {x, y, len: 160 + (i % 4) * 80, op: 0.25 + (i % 3) * 0.2};
  });
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      {streaks.map((s, i) => (
        <line key={i} x1={s.x} y1={s.y} x2={s.x + s.len} y2={s.y} stroke={CYAN} strokeWidth={3} strokeLinecap="round" opacity={s.op} />
      ))}
    </svg>
  );
};

// Gauge arc: animates from 0 to target fraction.
const Gauge: React.FC<{f: number; delay: number; frac: number; color: string; label: string; value: string}> = ({f, delay, frac, color, label, value}) => {
  const p = interpolate(f, [delay, delay + 40], [0, frac], clamp);
  const r = 130;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 40, marginTop: 40}}>
      <svg width={320} height={320} viewBox="0 0 320 320">
        <circle cx={160} cy={160} r={r} fill="none" stroke={MUTED} strokeOpacity={0.3} strokeWidth={16} />
        <circle cx={160} cy={160} r={r} fill="none" stroke={color} strokeWidth={16} strokeLinecap="round"
          strokeDasharray={`${circ * p} ${circ}`} transform="rotate(-90 160 160)" />
      </svg>
      <div>
        <div style={{fontFamily: FONT, color: MUTED, fontSize: 32, letterSpacing: 4, textTransform: 'uppercase'}}>{label}</div>
        <div style={{fontFamily: FONT, color, fontSize: 72, fontWeight: 800, lineHeight: 1.05, whiteSpace: 'nowrap'}}>{value}</div>
      </div>
    </div>
  );
};

// Scene 3: storm track curving in to the coast, with a moving marker.
const TrackScene: React.FC<{f: number}> = ({f}) => {
  // Path from the storm (top right) curving to the landfall point near Gopalpur (lower middle).
  const start = {x: 940, y: 900};
  const land = {x: 420, y: 1440};
  const ctrl = {x: 900, y: 1280};
  const path = `M ${start.x} ${start.y} Q ${ctrl.x} ${ctrl.y} ${land.x} ${land.y}`;
  const t = interpolate(f, [0, 70], [0, 1], clamp);
  // Quadratic Bezier position at t.
  const bx = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * ctrl.x + t * t * land.x;
  const by = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * ctrl.y + t * t * land.y;
  const pulse = 0.5 + 0.5 * Math.sin(f / 5);
  const cloud = Array.from({length: 3}).map((_, k) => ({r: 60 + k * 45 + (f % 30) * 1.5, op: 0.5 - k * 0.12}));
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      {/* coastline */}
      <path d="M 0 1500 Q 300 1430 540 1490 T 1080 1510" fill="none" stroke={MUTED} strokeWidth={3} />
      <path d={path} fill="none" stroke={CYAN} strokeOpacity={0.35} strokeWidth={4} strokeDasharray="14 14" />
      {cloud.map((c, k) => (
        <circle key={k} cx={bx} cy={by} r={c.r} fill="none" stroke={CYAN} strokeOpacity={c.op} strokeWidth={3} />
      ))}
      <circle cx={bx} cy={by} r={18} fill={CYAN} />
      <circle cx={land.x} cy={land.y} r={26 + pulse * 22} fill="none" stroke={AMBER} strokeWidth={4} strokeOpacity={1 - pulse * 0.5} />
      <circle cx={land.x} cy={land.y} r={10} fill={AMBER} />
    </svg>
  );
};

// Scene 4: surge waves rising and moving.
const SurgeWaves: React.FC<{f: number}> = ({f}) => {
  const rows = [0, 1, 2, 3, 4];
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      {rows.map((row) => {
        const amp = interpolate(f, [0, 60], [4, 36 + row * 6], clamp);
        const phase = f * 0.12 + row * 0.8;
        let d = `M 0 ${1300 + row * 90}`;
        for (let x = 0; x <= W; x += 20) {
          d += ` L ${x} ${1300 + row * 90 + Math.sin(x / 90 + phase) * amp}`;
        }
        return <path key={row} d={d} fill="none" stroke={row % 2 ? AMBER : CYAN} strokeOpacity={0.3 + row * 0.12} strokeWidth={4} />;
      })}
    </svg>
  );
};

export const CycloneShort: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: BG}}>
      <Background />

      <Scene from={0} to={120}>
        {(f) => (
          <>
            <SpiralScene f={frame} />
            <div style={{position: 'absolute', top: 300, left: 90, right: 90, textAlign: 'center'}}>
              <Rise f={f} delay={0} style={{fontFamily: FONT, color: CYAN, fontSize: 40, letterSpacing: 8}}>BREAKING · INDIA</Rise>
            </div>
            <div style={{position: 'absolute', bottom: 380, left: 90, right: 90, textAlign: 'center'}}>
              <Rise f={f} delay={12} style={{fontFamily: FONT, color: WHITE, fontSize: 124, fontWeight: 900, lineHeight: 1.02}}>
                SEVERE CYCLONIC STORM
              </Rise>
            </div>
          </>
        )}
      </Scene>

      <Scene from={120} to={270}>
        {(f) => (
          <>
            <WindStreaks f={frame} />
            <div style={{position: 'absolute', top: 360, left: 90, right: 90}}>
              <Rise f={f} delay={0} style={{fontFamily: FONT, color: AMBER, fontSize: 40, letterSpacing: 8, marginBottom: 30}}>LOCATION</Rise>
              <Rise f={f} delay={6} style={{fontFamily: FONT, color: WHITE, fontSize: 104, fontWeight: 800, lineHeight: 1.05}}>
                ~530 km south of Gopalpur
              </Rise>
            </div>
            <div style={{position: 'absolute', top: 980, left: 90, right: 90}}>
              <Gauge f={f} delay={20} frac={0.9} color={CYAN} label="Sustained winds" value="90–100 km/h" />
              <Gauge f={f} delay={70} frac={1} color={AMBER} label="Gusts" value="110 km/h" />
            </div>
          </>
        )}
      </Scene>

      <Scene from={270} to={370}>
        {(f) => (
          <>
            <TrackScene f={f} />
            <div style={{position: 'absolute', top: 360, left: 90, right: 90}}>
              <Rise f={f} delay={0} style={{fontFamily: FONT, color: CYAN, fontSize: 40, letterSpacing: 8, marginBottom: 30}}>LANDFALL</Rise>
              <Rise f={f} delay={8} style={{fontFamily: FONT, color: WHITE, fontSize: 96, fontWeight: 800, lineHeight: 1.08}}>
                By noon Friday<br />20 Nov
              </Rise>
              <Rise f={f} delay={18} style={{fontFamily: FONT, color: MUTED, fontSize: 44, marginTop: 30, lineHeight: 1.4}}>
                Between Narsapur and Puri,<br />near Gopalpur
              </Rise>
            </div>
          </>
        )}
      </Scene>

      <Scene from={370} to={450}>
        {(f) => (
          <>
            <SurgeWaves f={f} />
            <div style={{position: 'absolute', top: 360, left: 90, right: 90}}>
              <Rise f={f} delay={0} style={{fontFamily: FONT, color: AMBER, fontSize: 40, letterSpacing: 8, marginBottom: 30}}>ALERT</Rise>
              <Rise f={f} delay={8} style={{fontFamily: FONT, color: WHITE, fontSize: 96, fontWeight: 800, lineHeight: 1.1}}>
                Storm surge<br />0.5–1.0 m
              </Rise>
              <Rise f={f} delay={18} style={{fontFamily: FONT, color: CYAN, fontSize: 44, marginTop: 30}}>
                Fishing suspended
              </Rise>
              <Rise f={f} delay={24} style={{fontFamily: FONT, color: MUTED, fontSize: 30, marginTop: 20}}>
                Source: IMD Bulletin 29, 19 Nov
              </Rise>
            </div>
          </>
        )}
      </Scene>
    </AbsoluteFill>
  );
};
