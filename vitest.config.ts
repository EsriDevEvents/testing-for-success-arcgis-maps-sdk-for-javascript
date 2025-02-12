import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.{test,spec,e2e}.?(c|m)[jt]s?(x)"],
    setupFiles: ["./src/testing/setupFile.ts"],
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
      viewport: { width: 800, height: 600 },
    },
  },
  define: {
    "process.env": process.env,
  },
});
