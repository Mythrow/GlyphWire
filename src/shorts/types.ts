// Props for the reusable Short layout. Every story-specific value comes in here,
// so a video is a props object, not a new component.
export type ShortProps = {
  category: string; // e.g. "WORLD · CLIMATE"
  headline: string; // two lines max
  body: string; // one idea, lower third
  progress?: number; // 0 to 1, shown on the bar; defaults to the playhead
  durationSeconds: number; // 15 to 60
};

export const defaultShortProps: ShortProps = {
  category: "BREAKING · WORLD",
  headline: "Headline goes here in two lines",
  body: "Body line for the lower third, one idea only.",
  durationSeconds: 15,
};
