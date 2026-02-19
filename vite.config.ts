/// <reference types="vitest/config" />

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
    globals: true,
    setupFiles: ["setupTests.ts"],
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {
          args: ["--use-gl=angle"],
        },
      }),
      instances: [
        {
          browser: "chromium",
          viewport: { width: 800, height: 600 },
        },
      ],
    },
  },
});
