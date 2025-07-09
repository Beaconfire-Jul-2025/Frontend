import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./vitest.setup.ts",
      coverage: {
        reporter: ["text", "json-summary", "json"],
        reportOnFailure: true,
      },
    },
  }),
);
