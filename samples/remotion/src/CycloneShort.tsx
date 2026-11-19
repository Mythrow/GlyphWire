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
const IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Words fly up from a mask with a spring, staggered per word.
const SplitText: React.FC<{text: string; f: number; delay: number; stagger?: number; style?: React.CSSProperties}> = ({
  text, f, delay, stagger = 3, style,
}) => {
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  return (
    <div style={{...style}}>
      {words.map((w, i) => {
        const s = spring({frame: f - delay - i * stagger, fps, config: {damping: 14, stiffness: 170, mass: 0.6}});
        return (
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em'}}>
            <span style={{display: 'inline-block', transform: `translateY(${(1 - s) * 110}%) rotate(${(1 - s) * 6}deg)`, opacity: s}}>
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
};

// Scene window with overlapping crossfade: scale and blur on the way in and out.
const Scene: React.FC<{from: number; to: number; children: (f: number) => React.ReactNode}> = ({from, to, children}) => {
  const frame = useCurrentFrame();
  const inT = interpolate(frame, [from, from + 12], [0, 1], {...clamp, easing: IN_OUT});
  const outT = interpolate(frame, [to - 12, to], [0, 1], {...clamp, easing: IN_OUT});
  const opacity = inT * (1 - outT);
  const scale = interpolate(inT, [0, 1], [0.94, 1]) * interpolate(outT, [0, 1], [1, 1.08]);
  const blur = outT * 6;
  return (
    <AbsoluteFill style={{opacity, transform: `scale(${scale})`, filter: blur > 0 ? `blur(${blur}px)` : undefined}}>
      {children(frame - from)}
    </AbsoluteFill>
  );
};

// Camera keyframes from the brief: one shared transform for every scene.
const CAM = [
  {f: 0, x: 0, y: 60, s: 1.12, r: -2},
  {f: 110, x: 0, y: 0, s: 1.0, r: 0},
  {f: 128, x: -20, y: -40, s: 1.04, r: 1},
  {f: 260, x: 10, y: -20, s: 1.02, r: 0},
  {f: 285, x: 60, y: -80, s: 1.06, r: -1},
  {f: 360, x: 90, y: -140, s: 1.08, r: 0},
  {f: 380, x: 0, y: 0, s: 1.0, r: 0},
  {f: 450, x: 0, y: 20, s: 1.05, r: 0.5},
];

const useCamera = () => {
  const frame = useCurrentFrame();
  const frames = CAM.map((k) => k.f);
  const pick = (key: 'x' | 'y' | 's' | 'r') => interpolate(frame, frames, CAM.map((k) => k[key]), {
    ...clamp, easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const driftX = 4 * Math.sin(frame / 23);
  const driftY = 3 * Math.sin(frame / 31);
  return {x: pick('x') + driftX, y: pick('y') + driftY, s: pick('s'), r: pick('r'), bx: driftX, by: driftY};
};

const Background: React.FC<{px: number; py: number}> = ({px, py}) => {
  const frame = useCurrentFrame();
  const off = (frame * 1.4) % 60;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 14);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG_TOP}, ${BG_BOT})`}} />
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, transform: `translate(${px * 0.3}px, ${py * 0.3}px)`}}>
        <defs>
          <radialGradient id="glow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor={CYAN} stopOpacity={0.14 + 0.06 * pulse} />
            <stop offset="100%" stopColor={BG_TOP} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect x={-200} y={-200} width={W + 400} height={H + 400} fill="url(#glow)" />
        {Array.from({length: 23}).map((_, i) => (
          <line key={`v${i}`} x1={i * 60 - off - 60} y1={-60} x2={i * 60 - off - 60} y2={H + 60} stroke="#FFFFFF" strokeOpacity={0.04} />
        ))}
        {Array.from({length: 38}).map((_, i) => (
          <line key={`h${i}`} x1={-60} y1={i * 60 + off - 60} x2={W + 60} y2={i * 60 + off - 60} stroke="#FFFFFF" strokeOpacity={0.04} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// Scene 1: three depth layers of rotating particles around a glowing core.
const SpiralScene: React.FC<{f: number}> = ({f}) => {
  const cx = W / 2;
  const cy = 720;
  const layers = [
    {n: 60, mult: 0.7, op: 0.35, rot: 0.06, blur: false},
    {n: 60, mult: 1.0, op: 0.7, rot: 0.09, blur: false},
    {n: 60, mult: 1.3, op: 1.0, rot: 0.13, blur: true},
  ];
  const rings = [0, 1, 2].map((k) => {
    const p = ((f + k * 20) % 60) / 60;
    return {r: 80 + p * 460, op: (1 - p) * 0.5};
  });
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <defs>
        <filter id="blurGlow"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      {rings.map((ring, k) => (
        <ellipse key={k} cx={cx} cy={cy} rx={ring.r} ry={ring.r * 0.6} fill="none" stroke={CYAN} strokeOpacity={ring.op} strokeWidth={2} />
      ))}
      {/* thin HUD crosshair */}
      <line x1={cx - 300} y1={cy} x2={cx + 300} y2={cy} stroke={CYAN} strokeOpacity={0.2} strokeWidth={1} />
      <line x1={cx} y1={cy - 300} x2={cx} y2={cy + 300} stroke={CYAN} strokeOpacity={0.2} strokeWidth={1} />
      {layers.map((L, li) => {
        const dots = Array.from({length: L.n}).map((_, i) => {
          const t = i / L.n;
          const angle = t * Math.PI * 6 + f * L.rot;
          const r = (60 + t * 440) * (0.85 + 0.15 * li);
          return {x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r * 0.6, size: (2.5 + t * 6) * L.mult};
        });
        return (
          <g key={li}>
            {L.blur && dots.map((d, i) => <circle key={`g${i}`} cx={d.x} cy={d.y} r={d.size * 1.8} fill={CYAN} opacity={0.18} filter="url(#blurGlow)" />)}
            {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.size} fill={CYAN} opacity={L.op} />)}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={28} fill={CYAN} opacity={0.25} />
      <circle cx={cx} cy={cy} r={8} fill={CYAN} />
    </svg>
  );
};

const WindStreaks: React.FC<{f: number}> = ({f}) => {
  const rows = [
    {speed: 6, width: 1, count: 6, op: 0.25},
    {speed: 12, width: 2, count: 6, op: 0.4},
    {speed: 22, width: 3, count: 6, op: 0.55},
  ];
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="tail" x1="0" x2="1">
          <stop offset="0%" stopColor={VIOLET} stopOpacity={0} />
          <stop offset="100%" stopColor={CYAN} stopOpacity={1} />
        </linearGradient>
      </defs>
      {rows.map((row, ri) =>
        Array.from({length: row.count}).map((_, i) => {
          const x = ((i * 220 + f * row.speed) % (W + 400)) - 200;
          const y = 260 + ri * 0 + i * 110 + ri * 40;
          const len = 180 + ri * 60;
          return <line key={`${ri}-${i}`} x1={x} y1={y} x2={x + len} y2={y} stroke="url(#tail)" strokeWidth={row.width} strokeLinecap="round" opacity={row.op} />;
        }),
      )}
    </svg>
  );
};

const Gauge: React.FC<{f: number; delay: number; frac: number; value: string; unit: string; label: string}> = ({f, delay, frac, value, unit, label}) => {
  const t = interpolate(f, [delay, delay + 44], [0, 1], {...clamp, easing: EASE});
  const p = frac * t;
  const r = 96;
  const circ = 2 * Math.PI * r;
  const ticks = Array.from({length: 40}).map((_, i) => {
    const a = (i / 40) * 2 * Math.PI;
    return <line key={i} x1={130 + Math.cos(a) * 118} y1={130 + Math.sin(a) * 118} x2={130 + Math.cos(a) * 124} y2={130 + Math.sin(a) * 124} stroke="#FFFFFF" strokeOpacity={0.15} strokeWidth={2} />;
  });
  const tipA = -Math.PI / 2 + 2 * Math.PI * p;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 44, marginTop: 36}}>
      <svg width={260} height={260} viewBox="0 0 260 260" style={{overflow: 'visible'}}>
        <defs>
          <linearGradient id={`g-${label}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={CYAN} />
            <stop offset="100%" stopColor={VIOLET} />
          </linearGradient>
        </defs>
        {ticks}
        <circle cx={130} cy={130} r={r} fill="none" stroke="#FFFFFF" strokeOpacity={0.08} strokeWidth={14} />
        <circle cx={130} cy={130} r={r} fill="none" stroke={`url(#g-${label})`} strokeWidth={14} strokeLinecap="round"
          strokeDasharray={`${circ * p} ${circ}`} transform="rotate(-90 130 130)" />
        {p > 0.01 && <circle cx={130 + Math.cos(tipA) * r} cy={130 + Math.sin(tipA) * r} r={7} fill={CYAN} style={{filter: 'drop-shadow(0 0 12px #3DE6FF)'}} />}
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
  const landT = interpolate(f, [60, 80], [0, 1], {...clamp, easing: EASE});
  const dash = 1 - t;
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="trail" x1="0" x2="1">
          <stop offset="0%" stopColor={CYAN} stopOpacity={0} />
          <stop offset="100%" stopColor={VIOLET} stopOpacity={0.9} />
        </linearGradient>
      </defs>
      <path d="M 0 1180 Q 300 1110 540 1170 T 1080 1190 L 1080 1400 L 0 1400 Z" fill="#0F1E33" opacity={0.6} />
      <path d="M 0 1180 Q 300 1110 540 1170 T 1080 1190" fill="none" stroke={SUB} strokeOpacity={0.5} strokeWidth={3} />
      <path d={path} fill="none" stroke={CYAN} strokeOpacity={0.4} strokeWidth={6} strokeDasharray="24 24" strokeDashoffset={dash * 400} />
      <path d={path} fill="none" stroke="url(#trail)" strokeWidth={6} strokeLinecap="round" strokeDasharray={`${t * 1000} 1000`} />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={bx} cy={by} r={60 + k * 45 + (f % 30) * 1.5} fill="none" stroke={CYAN} strokeOpacity={0.45 - k * 0.12} strokeWidth={3} />
      ))}
      <circle cx={bx} cy={by} r={22} fill={CYAN} opacity={0.35} />
      <circle cx={bx} cy={by} r={10} fill={CYAN} />
      <circle cx={land.x} cy={land.y} r={(26 + pulse * 22) * landT} fill="none" stroke={AMBER} strokeWidth={4} strokeOpacity={(1 - pulse * 0.5) * landT} />
      <circle cx={land.x} cy={land.y} r={12 * landT} fill={AMBER} />
      <text x={-20 + 20 * landT} y={1700} fill="#FFFFFF" opacity={0.04} fontSize={160} fontWeight={800} fontFamily={FONT}>LANDFALL</text>
    </svg>
  );
};

const SurgeWaves: React.FC<{f: number}> = ({f}) => {
  const rows = [0, 1, 2];
  const opac = [0.6, 0.35, 0.2];
  const amp = interpolate(f, [0, 60], [4, 40], {...clamp, easing: EASE});
  const rise = interpolate(f, [0, 40], [60, 0], {...clamp, easing: EASE});
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CYAN} stopOpacity={0.25} />
          <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
        </linearGradient>
      </defs>
      {rows.map((row) => {
        const base = 1400 + row * 90 - (row === 0 ? rise : 0);
        const phase = f * 0.12 + row * 1.6;
        let d = `M 0 ${base}`;
        for (let x = 0; x <= W; x += 20) {
          d += ` L ${x} ${base + Math.sin(x / 90 + phase) * (amp - row * 6)}`;
        }
        const fillD = `${d} L ${W} ${H} L 0 ${H} Z`;
        return (
          <g key={row}>
            {row === 0 && <path d={fillD} fill="url(#fill)" />}
            <path d={d} fill="none" stroke={row === 1 ? VIOLET : CYAN} strokeOpacity={opac[row]} strokeWidth={4} />
          </g>
        );
      })}
    </svg>
  );
};

const Pill: React.FC<{f: number}> = ({f}) => {
  const border = interpolate(f, [0, 10], [0, 1], {...clamp, easing: EASE});
  const glow = 0.5 + 0.5 * Math.sin((f / 30) * Math.PI * 2);
  return (
    <div style={{
      display: 'inline-block', fontFamily: FONT, color: AMBER, fontSize: 36, fontWeight: 600,
      padding: '14px 32px', borderRadius: 999, border: `2px solid rgba(255,181,71,${border})`,
      boxShadow: `0 0 ${10 + glow * 14}px rgba(255,181,71,${0.2 + glow * 0.3})`,
    }}>
      Fishing suspended
    </div>
  );
};

export const CycloneShort: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = useCamera();
  return (
    <AbsoluteFill style={{background: BG_TOP}}>
      <Background px={cam.x} py={cam.y} />
      <AbsoluteFill style={{transformOrigin: '540px 960px', transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.s}) rotate(${cam.r}deg)`}}>
        <Scene from={0} to={128}>
          {(f) => (
            <>
              <SpiralScene f={frame} />
              <div style={{position: 'absolute', top: 300, left: 96, right: 96, textAlign: 'center'}}>
                <SplitText text="BREAKING · INDIA" f={f} delay={0} stagger={1.2}
                  style={{fontFamily: FONT, color: CYAN, fontSize: 32, fontWeight: 600, letterSpacing: 6}} />
              </div>
              <div style={{position: 'absolute', bottom: 340, left: 96, right: 96, textAlign: 'center'}}>
                <SplitText text="Severe cyclonic storm" f={f} delay={12} stagger={3}
                  style={{fontFamily: FONT, color: TEXT, fontSize: 120, fontWeight: 700, lineHeight: 1.0, letterSpacing: -2, textTransform: 'uppercase'}} />
              </div>
            </>
          )}
        </Scene>

        <Scene from={116} to={278}>
          {(f) => (
            <>
              <WindStreaks f={frame} />
              <div style={{position: 'absolute', top: 260, left: 96, right: 96}}>
                <SplitText text="LOCATION" f={f} delay={0} stagger={1.2}
                  style={{fontFamily: FONT, color: AMBER, fontSize: 32, fontWeight: 600, letterSpacing: 6, marginBottom: 24}} />
                <SplitText text="~530 km south of Gopalpur" f={f} delay={6} stagger={3}
                  style={{fontFamily: FONT, color: TEXT, fontSize: 88, fontWeight: 600, lineHeight: 1.05, letterSpacing: -1}} />
              </div>
              <div style={{position: 'absolute', top: 920, left: 96, right: 96}}>
                <Gauge f={f} delay={20} frac={0.9} value="90–100" unit="km/h sustained" label="Winds" />
                <Gauge f={f} delay={70} frac={1} value="110" unit="km/h gusts" label="Gusts" />
              </div>
            </>
          )}
        </Scene>

        <Scene from={266} to={380}>
          {(f) => (
            <>
              <TrackScene f={f} />
              <div style={{position: 'absolute', top: 260, left: 96, right: 96}}>
                <SplitText text="LANDFALL" f={f} delay={0} stagger={1.2}
                  style={{fontFamily: FONT, color: CYAN, fontSize: 32, fontWeight: 600, letterSpacing: 6, marginBottom: 24}} />
                <SplitText text="By noon Friday" f={f} delay={8} stagger={3}
                  style={{fontFamily: FONT, color: TEXT, fontSize: 88, fontWeight: 600, lineHeight: 1.05, letterSpacing: -1}} />
                <SplitText text="20 Nov" f={f} delay={14} stagger={3}
                  style={{fontFamily: FONT, color: TEXT, fontSize: 88, fontWeight: 600, lineHeight: 1.05, letterSpacing: -1}} />
              </div>
              <div style={{position: 'absolute', bottom: 340, left: 96, right: 96, padding: '40px 44px', borderRadius: 32,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)'}}>
                <SplitText text="Between Narsapur and Puri, near Gopalpur" f={f} delay={18} stagger={2}
                  style={{fontFamily: FONT, color: SUB, fontSize: 44, fontWeight: 500, lineHeight: 1.4}} />
              </div>
            </>
          )}
        </Scene>

        <Scene from={368} to={450}>
          {(f) => (
            <>
              <SurgeWaves f={f} />
              <div style={{position: 'absolute', top: 260, left: 96, right: 96}}>
                <SplitText text="ALERT" f={f} delay={0} stagger={1.2}
                  style={{fontFamily: FONT, color: AMBER, fontSize: 32, fontWeight: 600, letterSpacing: 6, marginBottom: 24}} />
                <SplitText text="Storm surge 0.5–1.0 m" f={f} delay={8} stagger={3}
                  style={{fontFamily: FONT, color: TEXT, fontSize: 112, fontWeight: 700, lineHeight: 1.0, letterSpacing: -2}} />
                <div style={{marginTop: 48}}><Pill f={f - 18} /></div>
                <SplitText text="Source: IMD Bulletin 29, 19 Nov" f={f} delay={24} stagger={2}
                  style={{fontFamily: FONT, color: SUB, fontSize: 28, fontWeight: 400, marginTop: 40, opacity: 0.6}} />
              </div>
            </>
          )}
        </Scene>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
