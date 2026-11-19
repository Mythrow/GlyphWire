import React from 'react';
import {color, font} from './tokens';

// GlyphWire mark: a stylised wire loop with a single node, plus the wordmark.
export const LogoMark: React.FC<{size?: number}> = ({size = 48}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-label="GlyphWire">
    <path d="M6 30 C 14 6, 34 6, 42 24 S 30 42, 24 34 S 14 22, 24 16" fill="none" stroke={color.accent} strokeWidth={3} strokeLinecap="round" />
    <circle cx={24} cy={16} r={4} fill={color.accent2} />
  </svg>
);

export const Wordmark: React.FC<{size?: number}> = ({size = 28}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
    <LogoMark size={size * 1.6} />
    <span style={{fontFamily: font.family, color: color.textMuted, fontSize: size, fontWeight: 600, letterSpacing: 6}}>GLYPHWIRE</span>
  </div>
);
