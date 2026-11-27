import { Easing, interpolate } from "remotion";
import { durations, easing, staggerMs, frame } from "./tokens";

// Established choreography is authored in 30Hz reference ticks, sampled continuously at output fps.
const fps = 30;
export const motionTicks = (outputFrame: number): number => outputFrame * fps / frame.fps;
export const outputFrames = (ticks: number): number => ticks * frame.fps / fps;

// Convert a token duration in ms to frames at the composition fps.
export const msToFrames = (ms: number): number => Math.round((ms / 1000) * fps);

export const durationFrames = {
  fast: msToFrames(durations.fast),
  base: msToFrames(durations.base),
  slow: msToFrames(durations.slow),
};

export const staggerFrames = msToFrames(staggerMs);

const outCurve = Easing.bezier(easing.out[0], easing.out[1], easing.out[2], easing.out[3]);
const inCurve = Easing.bezier(easing.in[0], easing.in[1], easing.in[2], easing.in[3]);

// Entering: 0 -> 1 over `duration` frames, starting at `start`.
export const enter = (frame: number, start: number, duration: number): number =>
  interpolate(frame, [start, start + duration], [0, 1], {
    easing: outCurve,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Leaving: 1 -> 0 over `duration` frames, starting at `start`.
export const exit = (frame: number, start: number, duration: number): number =>
  interpolate(frame, [start, start + duration], [1, 0], {
    easing: inCurve,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
