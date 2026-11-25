// Props for the reusable Short layout. Every story-specific value comes in here,
// so a video is a props object, not a new component.
export type ShortProps = {
  category: string; // e.g. "BREAKING · WORLD"
  headline: string; // two lines max
  body: string; // one idea, lower third
  status: string; // e.g. "CONFIRMED · 2 SOURCES"
  source: string; // e.g. "Source: [wire service]"
  progress?: number; // 0 to 1, shown on the bar; defaults to the playhead
  durationSeconds: number; // 15 to 60
};

export const defaultShortProps: ShortProps = {
  category: "BREAKING · WORLD",
  headline: "Headline goes here in two lines",
  body: "Body line for the lower third, one idea only.",
  status: "CONFIRMED · 2 SOURCES",
  source: "Source: [wire service]",
  durationSeconds: 15,
};
