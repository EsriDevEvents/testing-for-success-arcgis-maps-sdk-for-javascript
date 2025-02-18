/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
    exclude: ["**/node_modules/**", "__tests__/**"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["setupTests.ts"],
    // viewport: { width: 800, height: 600 },
  },

  // test: {
  //   exclude: ["**/node_modules/**", "__tests__/**"],
  //   setupFiles: ["./src/testing/setupFile.ts"],
  //   browser: {
  //     enabled: true,
  //     provider: "playwright",
  //     instances: [{ browser: "chromium" }],
  //     viewport: { width: 800, height: 600 },
  //   },
  // },
});
