import { Config } from "@remotion/cli/config";

// Lossless intermediate frame captures and high-quality H.264 output.
Config.setVideoImageFormat("png");
Config.setCrf(14);
Config.setOverwriteOutput(true);
