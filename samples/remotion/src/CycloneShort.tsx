import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const BG_TOP = '#05070D';
const BG_BOT = '#0A1424';
const CYAN = '#3DE6FF';
const VIOLET = '#7B61FF';
const AMBER = '#FFB547';
const TEXT = '#F4F8FF';
const SUB = '#8FA3BF';
const FONT = 'Inter, "Helvetica Neue", Arial, sans-serif';
const W = 1080;
const H = 1920;
const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Scene: React.FC<{from: number; to: number; children: (f: number) => React.ReactNode}> = ({from, to, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + 12, to - 12, to], [0, 1, 1, 0], clamp);
  const push = interpolate(frame, [from, to], [1, 1.04], clamp);
  return <AbsoluteFill style={{opacity, transform: `scale(${push})`}}>{children(frame - from)}</AbsoluteFill>;
};

// Entrance: ease-out slide and fade with a stagger delay in frames.
const Rise: React.FC<{f: number; delay: number; children: React.ReactNode; style?: React.CSSProperties}> = ({f, delay, children, style}) => {
  const t = interpolate(f, [delay, delay + 22], [0, 1], {...clamp, easing: EASE});
  return <div style={{transform: `translateY(${(1 - t) * 40}px)`, opacity: t, ...style}}>{children}</div>;
};

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const off = (frame * 1.4) % 60;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 14);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG_TOP}, ${BG_BOT})`}} />
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <defs>
          <radialGradient id="glow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor={CYAN} stopOpacity={0.14 + 0.06 * pulse} />
            <stop offset="100%" stopColor={BG_TOP} stopOpacity={0} />
          </radialGradient>
          <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={frame % 7} /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" /></filter>
        </defs>
        <rect width={W} height={H} fill="url(#glow)" />
        {Array.from({length: 19}).map((_, i) => (
          <line key={`v${i}`} x1={i * 60 - off} y1={0} x2={i * 60 - off} y2={H} stroke="#FFFFFF" strokeOpacity={0.04} />
        ))}
        {Array.from({length: 34}).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 60 + off} x2={W} y2={i * 60 + off} stroke="#FFFFFF" strokeOpacity={0.04} />
        ))}
        <rect width={W} height={H} filter="url(#grain)" opacity={0.03} />
      </svg>
      <div style={{position: 'absolute', top: 60, left: 80, fontFamily: FONT, color: SUB, fontSize: 28, fontWeight: 600, letterSpacing: 6}}>GLYPHWIRE</div>
    </AbsoluteFill>
  );
};

const SpiralScene: React.FC<{f: number}> = ({f}) => {
  const cx = W / 2;
  const cy = 720;
  const dots = Array.from({length: 150}).map((_, i) => {
    const t = i / 150;
    const angle = t * Math.PI * 6 + f * 0.09;
    const r = 60 + t * 440;
    return {x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r * 0.6, size: 2.5 + t * 6, op: 0.3 + t * 0.7};
  });
  const rings = [0, 1, 2].map((k) => {
    const p = ((f + k * 20) % 60) / 60;
    return {r: 80 + p * 460, op: (1 - p) * 0.5};
  });
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      {rings.map((ring, k) => (
        <ellipse key={k} cx={cx} cy={cy} rx={ring.r} ry={ring.r * 0.6} fill="none" stroke={CYAN} strokeOpacity={ring.op} strokeWidth={2} />
      ))}
      <circle cx={cx} cy={cy} r={28} fill={CYAN} opacity={0.25} />
      <circle cx={cx} cy={cy} r={8} fill={CYAN} />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.size} fill={CYAN} opacity={d.op} />
      ))}
    </svg>
  );
};

const WindStreaks: React.FC<{f: number}> = ({f}) => {
  const streaks = Array.from({length: 14}).map((_, i) => {
    const speed = 8 + (i % 5) * 4;
    const x = ((i * 137 + f * speed) % (W + 400)) - 200;
    const y = 300 + i * 90;
    return {x, y, len: 160 + (i % 4) * 80, op: 0.2 + (i % 3) * 0.15};
  });
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="tail" x1="0" x2="1">
          <stop offset="0%" stopColor={VIOLET} stopOpacity={0} />
          <stop offset="100%" stopColor={CYAN} stopOpacity={1} />
        </linearGradient>
      </defs>
      {streaks.map((s, i) => (
        <line key={i} x1={s.x} y1={s.y} x2={s.x + s.len} y2={s.y} stroke="url(#tail)" strokeWidth={2} strokeLinecap="round" opacity={s.op} />
      ))}
    </svg>
  );
};

const Gauge: React.FC<{f: number; delay: number; frac: number; value: string; unit: string; label: string}> = ({f, delay, frac, value, unit, label}) => {
  const t = interpolate(f, [delay, delay + 44], [0, 1], {...clamp, easing: EASE});
  const p = frac * t;
  const r = 96;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 44, marginTop: 36}}>
      <svg width={260} height={260} viewBox="0 0 260 260">
        <defs>
          <linearGradient id={`g-${label}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={CYAN} />
            <stop offset="100%" stopColor={VIOLET} />
          </linearGradient>
        </defs>
        <circle cx={130} cy={130} r={r} fill="none" stroke="#FFFFFF" strokeOpacity={0.08} strokeWidth={14} />
        <circle cx={130} cy={130} r={r} fill="none" stroke={`url(#g-${label})`} strokeWidth={14} strokeLinecap="round"
          strokeDasharray={`${circ * p} ${circ}`} transform="rotate(-90 130 130)" />
      </svg>
      <div>
        <div style={{fontFamily: FONT, color: SUB, fontSize: 32, fontWeight: 600, letterSpacing: 6, textTransform: 'uppercase'}}>{label}</div>
        <div style={{fontFamily: FONT, color: TEXT, fontSize: 96, fontWeight: 600, lineHeight: 1.0, letterSpacing: -2, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums'}}>{value}</div>
        <div style={{fontFamily: FONT, color: SUB, fontSize: 44, fontWeight: 500}}>{unit}</div>
      </div>
    </div>
  );
};

const TrackScene: React.FC<{f: number}> = ({f}) => {
  const start = {x: 940, y: 760};
  const land = {x: 420, y: 1120};
  const ctrl = {x: 900, y: 1000};
  const path = `M ${start.x} ${start.y} Q ${ctrl.x} ${ctrl.y} ${land.x} ${land.y}`;
  const t = interpolate(f, [0, 60], [0, 1], {...clamp, easing: EASE});
  const bx = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * ctrl.x + t * t * land.x;
  const by = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * ctrl.y + t * t * land.y;
  const pulse = 0.5 + 0.5 * Math.sin(f / 5);
  const land_t = interpolate(f, [60, 80], [0, 1], {...clamp, easing: EASE});
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <path d="M 0 1180 Q 300 1110 540 1170 T 1080 1190" fill="none" stroke={SUB} strokeOpacity={0.5} strokeWidth={3} />
      <path d={path} fill="none" stroke={CYAN} strokeOpacity={0.4} strokeWidth={6} strokeDasharray="24 24" />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={bx} cy={by} r={60 + k * 45 + (f % 30) * 1.5} fill="none" stroke={CYAN} strokeOpacity={0.45 - k * 0.12} strokeWidth={3} />
      ))}
      <circle cx={bx} cy={by} r={22} fill={CYAN} opacity={0.35} />
      <circle cx={bx} cy={by} r={10} fill={CYAN} />
      <circle cx={land.x} cy={land.y} r={(26 + pulse * 22) * land_t} fill="none" stroke={AMBER} strokeWidth={4} strokeOpacity={(1 - pulse * 0.5) * land_t} />
      <circle cx={land.x} cy={land.y} r={12 * land_t} fill={AMBER} />
    </svg>
  );
};

const SurgeWaves: React.FC<{f: number}> = ({f}) => {
  const rows = [0, 1, 2];
  const opac = [0.6, 0.35, 0.2];
  const amp = interpolate(f, [0, 60], [4, 40], {...clamp, easing: EASE});
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      {rows.map((row) => {
        const phase = f * 0.12 + row * 1.6;
        let d = `M 0 ${1400 + row * 90}`;
        for (let x = 0; x <= W; x += 20) {
          d += ` L ${x} ${1400 + row * 90 + Math.sin(x / 90 + phase) * (amp - row * 6)}`;
        }
        return <path key={row} d={d} fill="none" stroke={row === 1 ? VIOLET : CYAN} strokeOpacity={opac[row]} strokeWidth={4} />;
      })}
    </svg>
  );
};

export const CycloneShort: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background />

      <Scene from={0} to={120}>
        {(f) => (
          <>
            <SpiralScene f={frame} />
            <div style={{position: 'absolute', top: 300, left: 80, right: 80, textAlign: 'center'}}>
              <Rise f={f} delay={0} style={{fontFamily: FONT, color: CYAN, fontSize: 32, fontWeight: 600, letterSpacing: 6}}>BREAKING · INDIA</Rise>
            </div>
            <div style={{position: 'absolute', bottom: 340, left: 80, right: 80, textAlign: 'center'}}>
              <Rise f={f} delay={12} style={{fontFamily: FONT, color: TEXT, fontSize: 120, fontWeight: 700, lineHeight: 1.0, letterSpacing: -2, textTransform: 'uppercase'}}>
                Severe cyclonic storm
              </Rise>
            </div>
          </>
        )}
      </Scene>

      <Scene from={120} to={270}>
        {(f) => (
          <>
            <WindStreaks f={frame} />
            <div style={{position: 'absolute', top: 260, left: 80, right: 80}}>
              <Rise f={f} delay={0} style={{fontFamily: FONT, color: AMBER, fontSize: 32, fontWeight: 600, letterSpacing: 6, marginBottom: 24}}>LOCATION</Rise>
              <Rise f={f} delay={6} style={{fontFamily: FONT, color: TEXT, fontSize: 88, fontWeight: 600, lineHeight: 1.05, letterSpacing: -1}}>
                ~530 km south of Gopalpur
              </Rise>
            </div>
            <div style={{position: 'absolute', top: 920, left: 80, right: 80}}>
              <Gauge f={f} delay={20} frac={0.9} value="90–100" unit="km/h sustained" label="Winds" />
              <Gauge f={f} delay={70} frac={1} value="110" unit="km/h gusts" label="Gusts" />
            </div>
          </>
        )}
      </Scene>

      <Scene from={270} to={370}>
        {(f) => (
          <>
            <TrackScene f={f} />
            <div style={{position: 'absolute', top: 260, left: 80, right: 80}}>
              <Rise f={f} delay={0} style={{fontFamily: FONT, color: CYAN, fontSize: 32, fontWeight: 600, letterSpacing: 6, marginBottom: 24}}>LANDFALL</Rise>
              <Rise f={f} delay={8} style={{fontFamily: FONT, color: TEXT, fontSize: 88, fontWeight: 600, lineHeight: 1.05, letterSpacing: -1}}>
                By noon Friday<br />20 Nov
              </Rise>
            </div>
            <div style={{position: 'absolute', bottom: 340, left: 80, right: 80, padding: '40px 44px', borderRadius: 32,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)'}}>
              <Rise f={f} delay={18} style={{fontFamily: FONT, color: SUB, fontSize: 44, fontWeight: 500, lineHeight: 1.4}}>
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
            <div style={{position: 'absolute', top: 260, left: 80, right: 80}}>
              <Rise f={f} delay={0} style={{fontFamily: FONT, color: AMBER, fontSize: 32, fontWeight: 600, letterSpacing: 6, marginBottom: 24}}>ALERT</Rise>
              <Rise f={f} delay={8} style={{fontFamily: FONT, color: TEXT, fontSize: 120, fontWeight: 700, lineHeight: 1.0, letterSpacing: -2}}>
                Storm surge<br />0.5–1.0 m
              </Rise>
              <Rise f={f} delay={18} style={{marginTop: 48, display: 'inline-block', fontFamily: FONT, color: AMBER, fontSize: 36, fontWeight: 600,
                padding: '14px 32px', borderRadius: 999, border: `2px solid ${AMBER}`}}>
                Fishing suspended
              </Rise>
              <Rise f={f} delay={24} style={{fontFamily: FONT, color: SUB, fontSize: 28, fontWeight: 400, marginTop: 40, opacity: 0.6}}>
                Source: IMD Bulletin 29, 19 Nov
              </Rise>
            </div>
          </>
        )}
      </Scene>
    </AbsoluteFill>
  );
};
