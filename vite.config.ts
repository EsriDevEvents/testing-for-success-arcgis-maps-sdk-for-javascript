/// <reference types="vitest/config" />
/// <reference types="vitest" />

import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { createApi } from "./server/api";

const api = createApi();

const apiPlugin = (): Plugin => ({
  name: "local-api",
  configureServer(server) {
    server.middlewares.use(api);
  },
  configurePreviewServer(server) {
    server.middlewares.use(api);
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
  test: {
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "html", "clover", "json", "lcov"],
      include: ["server/**/*.ts", "src/**/*.{ts,tsx}"],
    },
    projects: [
      {
        test: {
          name: "api:unit",
          include: ["./server/**/*.test.ts"],
          exclude: ["./server/**/*.integration.test.ts"],
        },
      },
      {
        test: {
          name: "api:integration",
          include: ["./server/**/*.integration.test.ts"],
        },
      },
    ],
  },
});
