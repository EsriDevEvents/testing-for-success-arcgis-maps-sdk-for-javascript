/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { playwright } from "@vitest/browser-playwright";

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
    reporters: ["default", "json"],
    outputFile: "test-results.json",
    exclude: ["**/node_modules/**"],
    globals: true,
    setupFiles: ["setupTests.ts"],
    projects: [
      {
        test: {
          name: "unit",
          include: ["src/**/*.test.[jt]s?(x)"],
          exclude: [
            "src/**/*.integration.test.[jt]s?(x)",
            "src/**/*.e2e.[jt]s?(x)",
          ],
          environment: "jsdom",
          browser: {
            enabled: false,
          },
        },
      },
      {
        test: {
          name: "integration",
          include: ["src/**/*.integration.test.[jt]s?(x)"],
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
      },
    ],
  },
});
