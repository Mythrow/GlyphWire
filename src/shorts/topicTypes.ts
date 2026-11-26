import type { FlagCode } from "./Flags";

export type HeroSpec =
  | { kind: "partner-hub"; center: FlagCode; partners: (FlagCode | null)[] }
  | { kind: "radar" }
  | { kind: "rate-dial" }
  | { kind: "connection"; left: FlagCode; right: FlagCode }
  | { kind: "trade" | "hub" };

export type Topic = { text: string; startFrame: number; hero: HeroSpec };
export type TopicShortProps = {
  category: string;
  headline: string;
  durationSeconds: number;
  timingStatus: "provisional" | "aligned";
  topics: Topic[];
  heroVersion?: "original" | "enhanced";
  audioPath?: string;
  alignmentSha256?: string;
};
