import React from "react";
import { useCurrentFrame } from "remotion";
import { enter } from "../brand/motion";

// Reveals text one character at a time. Words stay whole so line breaks
// fall between words: each letter rises and fades in, staggered by `perChar`
// frames, with the running character index carried across words.
export const LetterReveal: React.FC<{
  text: string;
  start: number;
  perChar?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ text, start, perChar = 1, duration = 10, style }) => {
  const f = useCurrentFrame();
  let index = 0;
  const words = text.split(" ");
  return (
    <span style={style}>
      {words.map((word, w) => {
        const letters = Array.from(word).map((ch) => {
          const i = index++;
          const k = enter(f, start + i * perChar, duration);
          return (
            <span
              key={i}
              style={{ display: "inline-block", opacity: k, transform: `translateY(${(1 - k) * 18}px)` }}
            >
              {ch}
            </span>
          );
        });
        index++; // the space advances the clock too
        return (
          <React.Fragment key={w}>
            <span style={{ whiteSpace: "nowrap" }}>{letters}</span>
            {w < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </span>
  );
};
