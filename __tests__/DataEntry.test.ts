import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Visual Regression", () => {
  test("DataEntry", async ({ page }) => {
    // wait for map to load
    await page.waitForSelector(".mapDiv.ready", {
      timeout: 10_000,
    });

    const map = page.locator(".mapDiv.ready");
    const box = (await map.boundingBox())!;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

    await page.waitForTimeout(1000);

    const calcitePanel = await page.locator(
      "calcite-shell-panel[slot='panel-start']"
    );

    await page.evaluate(() => {});

    await expect(calcitePanel).toHaveScreenshot(
      "./screenshots/calcite-panel.png",
      {
        maxDiffPixelRatio: 0.05,
      }
    );
  });
});
