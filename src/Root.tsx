import React from "react";
import { Composition } from "remotion";
import { BrandPreview, TOTAL_FRAMES } from "./brand/BrandPreview";
import { frame } from "./brand/tokens";
import { ShortTemplate } from "./shorts/ShortTemplate";
import { TariffShort } from "./shorts/TariffShort";
import { defaultShortProps, ShortProps } from "./shorts/types";

const FPS = 30;

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
        id="Short"
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
        id="TariffShort"
        component={TariffShort}
        durationInFrames={720}
        fps={FPS}
        width={frame.width}
        height={frame.height}
      />
    </>
  );
};
