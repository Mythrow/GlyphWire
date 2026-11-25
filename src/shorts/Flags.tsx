import React from "react";
import { FLAG_SRC } from "./flagData";

export type FlagCode = "US" | "CN" | "EU" | "JP";

// Circular flag badge using free public flag artwork (flagcdn.com).
export const FlagIcon: React.FC<{ code: FlagCode; size: number }> = ({ code, size }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", display: "block", boxShadow: "0 0 0 2px #1F2A36" }}>
    <img src={FLAG_SRC[code]} width={size} height={size} style={{ width: size, height: size, objectFit: "cover", display: "block" }} alt="" />
  </div>
);
