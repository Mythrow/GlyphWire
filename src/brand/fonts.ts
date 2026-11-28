import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadOxanium } from "@remotion/google-fonts/Oxanium";

// Approved 2026-11-28. Wait for actual font loading; no intentional fallbacks.
const display = loadSpaceGrotesk("normal", { weights: ["600"] });
const body = loadMontserrat("normal", { weights: ["500"] });
const quote = loadMontserrat("italic", { weights: ["500"] });
const label = loadOxanium("normal", { weights: ["500", "600"] });

export const fontFamily = {
  display: display.fontFamily,
  body: body.fontFamily,
  quote: quote.fontFamily,
  label: label.fontFamily,
};
export const fontsReady = Promise.all([
  display.waitUntilDone(), body.waitUntilDone(),
  quote.waitUntilDone(), label.waitUntilDone(),
]);
