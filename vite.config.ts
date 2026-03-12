/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import observationApi from "./api/observationsApi";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    observationApi([
      {
        latitude: 34.02771190164404,
        longitude: -118.81032193749677,
        observation: "☀️",
      },
    ]),
  ],
  test: {
    browser: {
      enabled: true,
      provider: playwright({
        // Ensure WebGL is available in the test environment
        launchOptions: { args: ["--use-gl=angle"] },
      }),
      // https://vitest.dev/config/browser/playwright
      instances: [{ browser: "chromium" }],
      viewport: { width: 800, height: 600 },
    },
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "html", "clover", "json", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
    },
    onConsoleLog: (msg) => {
      const ignores = [/^Lit is in dev mode/u, /^Using Calcite Components/u];
      return !ignores.some((re) => re.test(msg));
    },
  },
});
