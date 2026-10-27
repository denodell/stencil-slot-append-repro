import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "repro",
  outputTargets: [{ type: "www", serviceWorker: null }],
  extras: {
    appendChildSlotFix: true,
  },
};
