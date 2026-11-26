import React from "react";
import { palette } from "../brand/tokens";
import { enter } from "../brand/motion";
import type { HeroSpec } from "./topicTypes";
import { StoryGlyph } from "./Glyphs";
import { CIRCLE_FLAG_SRC } from "./circleFlagData";
import { heroArt } from "./heroArt";

// SVG contains only fixed geometry, palette tokens and the repository's allowlisted flags.
export const Hero: React.FC<{spec:HeroSpec;t:number;width:number}> = ({spec,t,width})=>{
  if(spec.kind==="trade" || spec.kind==="hub"){
    return <StoryGlyph kind={spec.kind} size={width*.7} progress={enter(t,0,22)}/>;
  }
  const height=spec.kind==="connection"?328:820;
  return <svg width={width} height={width*height/820} viewBox={`0 0 820 ${height}`} fill="none"
    aria-hidden="true" dangerouslySetInnerHTML={{__html:heroArt(spec,t,palette,CIRCLE_FLAG_SRC)}}/>;
};
