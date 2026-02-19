/// <reference types="vitest/config" />
/// <reference types="@vitest/browser/providers/playwright" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { playwright } from '@vitest/browser-playwright'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/load": "http://localhost:4000",
      "/save": "http://localhost:4000",
    },
  },
  test: {
    include: ["**/__tests__/**/*.[jt]s?(x)"],
    reporters: ["default", "json"],
    outputFile: "test-results.json",
    exclude: ["**/node_modules/**", "__tests__/**"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["setupTests.ts"],
    browser: {
      enabled: true,
      instances: [
        {
          browser: "chromium",
          viewport: { width: 800, height: 600 },
          provider: playwright({
            launchOptions: {
              args: ["--use-gl=angle"],
            },
          }),
        },
      ],
    },
  },
});
