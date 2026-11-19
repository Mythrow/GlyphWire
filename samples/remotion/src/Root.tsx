import React from 'react';
import {Composition} from 'remotion';
import {CycloneShort} from './CycloneShort';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="CycloneShort"
    component={CycloneShort}
    durationInFrames={450}
    fps={30}
    width={1080}
    height={1920}
  />
);
