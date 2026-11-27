import React from "react";
import { Composition } from "remotion";
import { BrandPreview, TOTAL_FRAMES } from "./brand/BrandPreview";
import { frame } from "./brand/tokens";
import { ShortTemplate } from "./shorts/ShortTemplate";
import { TariffShort, tariffPreview } from "./shorts/TariffShort";
import { TopicShort } from "./shorts/TopicShort";
import type { TopicShortProps } from "./shorts/topicTypes";
import { defaultShortProps, ShortProps } from "./shorts/types";

const FPS = frame.fps;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BrandPreview"
        component={BrandPreview}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={frame.width}
        height={frame.height}
      />
      <Composition
        id="LegacyShort"
        component={ShortTemplate}
        defaultProps={defaultShortProps}
        calculateMetadata={({ props }) => {
          const p = props as ShortProps;
          const seconds = Math.min(60, Math.max(15, p.durationSeconds));
          return { durationInFrames: Math.round(seconds * FPS) };
        }}
        durationInFrames={defaultShortProps.durationSeconds * FPS}
        fps={FPS}
        width={frame.width}
        height={frame.height}
      />
      <Composition
        id="Short"
        component={TopicShort}
        defaultProps={tariffPreview}
        calculateMetadata={({ props }) => {
          const p = props as TopicShortProps;
          return { durationInFrames: Math.round(p.durationSeconds * FPS) };
        }}
        durationInFrames={tariffPreview.durationSeconds * FPS}
        fps={FPS}
        width={frame.width}
        height={frame.height}
      />
      <Composition
        id="TariffBaseline"
        component={TopicShort}
        defaultProps={{...tariffPreview, heroVersion: "original"} as TopicShortProps}
        durationInFrames={24 * FPS}
        fps={FPS}
        width={frame.width}
        height={frame.height}
      />
      <Composition
        id="TariffShort"
        component={TariffShort}
        durationInFrames={24 * FPS}
        fps={FPS}
        width={frame.width}
        height={frame.height}
      />
    </>
  );
};
