import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "repro",
  outputTargets: [{ type: "www", serviceWorker: null }],
  extras: {
    // The setting this repro is about. Ionic turns it on through experimentalSlotFixes.
    appendChildSlotFix: true,
  },
};
