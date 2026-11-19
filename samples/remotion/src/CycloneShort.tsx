import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const BG = '#050B14';
const CYAN = '#38E8FF';
const AMBER = '#FFB020';
const WHITE = '#F4F8FF';
const MUTED = '#6B7F99';

const FONT = 'Inter, "Helvetica Neue", Arial, sans-serif';

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Scene: React.FC<{from: number; to: number; children: React.ReactNode}> = ({from, to, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + 8, to - 8, to], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{opacity, padding: '0 90px', justifyContent: 'center'}}>{children}</AbsoluteFill>;
};

const Grid: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = (frame * 1.2) % 80;
  return (
    <AbsoluteFill style={{opacity: 0.18}}>
      <svg width="1080" height="1920">
        {Array.from({length: 30}).map((_, i) => (
          <line key={`v${i}`} x1={i * 40 - offset} y1={0} x2={i * 40 - offset} y2={1920} stroke={CYAN} strokeWidth={1} />
        ))}
        {Array.from({length: 50}).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 40 + offset} x2={1080} y2={i * 40 + offset} stroke={CYAN} strokeWidth={1} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

const Spiral: React.FC<{frame: number}> = ({frame}) => {
  const points: string[] = [];
  for (let i = 0; i < 220; i++) {
    const t = i / 220;
    const angle = t * Math.PI * 7 + frame * 0.04;
    const r = 30 + t * 300;
    points.push(`${540 + Math.cos(angle) * r},${760 + Math.sin(angle) * r * 0.62}`);
  }
  return (
    <svg width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
      <polyline points={points.join(' ')} fill="none" stroke={CYAN} strokeWidth={3} opacity={0.85} />
    </svg>
  );
};

const Stat: React.FC<{label: string; value: string; color: string; delay: number}> = ({label, value, color, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 200}});
  return (
    <div style={{transform: `translateY(${(1 - s) * 40}px)`, opacity: s, marginBottom: 46}}>
      <div style={{fontFamily: FONT, color: MUTED, fontSize: 36, letterSpacing: 4, textTransform: 'uppercase'}}>{label}</div>
      <div style={{fontFamily: FONT, color, fontSize: 96, fontWeight: 800, lineHeight: 1.05}}>{value}</div>
    </div>
  );
};

export const CycloneShort: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: BG}}>
      <Grid />
      <Scene from={0} to={120}>
        <Spiral frame={frame} />
        <div style={{position: 'absolute', top: 420, left: 90, right: 90, fontFamily: FONT, color: CYAN, fontSize: 40, letterSpacing: 8, opacity: fade(frame, 10, 30)}}>
          BREAKING · INDIA
        </div>
        <div style={{position: 'absolute', bottom: 520, left: 90, right: 90, fontFamily: FONT, color: WHITE, fontSize: 124, fontWeight: 900, lineHeight: 1.02, opacity: fade(frame, 20, 50)}}>
          SEVERE CYCLONIC STORM
        </div>
      </Scene>

      <Scene from={120} to={270}>
        <div style={{fontFamily: FONT, color: AMBER, fontSize: 40, letterSpacing: 8, marginBottom: 40}}>LOCATION</div>
        <div style={{fontFamily: FONT, color: WHITE, fontSize: 110, fontWeight: 800, lineHeight: 1.05, marginBottom: 60}}>
          ~530 km south of Gopalpur
        </div>
        <Stat label="Sustained winds" value="90–100 km/h" color={CYAN} delay={150} />
        <Stat label="Gusts" value="110 km/h" color={AMBER} delay={180} />
      </Scene>

      <Scene from={270} to={370}>
        <div style={{fontFamily: FONT, color: CYAN, fontSize: 40, letterSpacing: 8, marginBottom: 40}}>LANDFALL</div>
        <div style={{fontFamily: FONT, color: WHITE, fontSize: 100, fontWeight: 800, lineHeight: 1.08}}>
          By noon Friday, 20 Nov
        </div>
        <div style={{fontFamily: FONT, color: MUTED, fontSize: 48, marginTop: 40, lineHeight: 1.4}}>
          Between Narsapur and Puri, near Gopalpur
        </div>
      </Scene>

      <Scene from={370} to={450}>
        <div style={{fontFamily: FONT, color: AMBER, fontSize: 40, letterSpacing: 8, marginBottom: 40}}>ALERT</div>
        <div style={{fontFamily: FONT, color: WHITE, fontSize: 96, fontWeight: 800, lineHeight: 1.1, marginBottom: 50}}>
          Storm surge 0.5–1.0 m
        </div>
        <div style={{fontFamily: FONT, color: MUTED, fontSize: 48, lineHeight: 1.4}}>
          Fishing suspended. Source: IMD Bulletin 29, 19 Nov
        </div>
      </Scene>
    </AbsoluteFill>
  );
};
