import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.{test,spec,e2e}.?(c|m)[jt]s?(x)"],
    exclude: ["**/node_modules/**", "__tests__/**"],
    setupFiles: ["./src/testing/setupFile.ts"],
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
      viewport: { width: 800, height: 600 },
    },
  },
});
