import React from "react";
import { Composition } from "remotion";
import { BrandPreview, TOTAL_FRAMES } from "./brand/BrandPreview";
import { frame } from "./brand/tokens";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BrandPreview"
      component={BrandPreview}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={frame.width}
      height={frame.height}
    />
  );
};
