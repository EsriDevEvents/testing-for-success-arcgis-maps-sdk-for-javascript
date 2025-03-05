import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Look for test files in the "__visualregression__" directory, relative to this configuration file.
  testDir: "__visualregression__",

  // Run all tests in parallel.
  fullyParallel: true,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: "json",

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "http://localhost:3000",

    // Collect trace when retrying the failed test.
    trace: "on-first-retry",
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            "--use-gl=angle",
            "--use-angle=swiftshader",
            "--in-process-gpu",
            "--window-size=1920,1040",
          ],
        },
      },
    },
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
