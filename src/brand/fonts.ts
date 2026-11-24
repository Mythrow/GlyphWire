import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

// Loaded once at module import. Each call returns the font family name
// and a promise that resolves when the font is ready to render.
const display = loadSpaceGrotesk("normal", { weights: ["500", "700"] });
const body = loadInter("normal", { weights: ["400", "500", "600"] });
const label = loadJetBrainsMono("normal", { weights: ["500", "700"] });

export const fontFamily = {
  display: display.fontFamily,
  body: body.fontFamily,
  label: label.fontFamily,
};

export const fontsReady = Promise.all([
  display.waitUntilDone(),
  body.waitUntilDone(),
  label.waitUntilDone(),
]);
