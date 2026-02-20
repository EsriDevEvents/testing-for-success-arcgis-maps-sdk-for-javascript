import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("DataEntry Visual Regression", () => {
  test("Regression Test", async ({ page }) => {
    // wait for map to be ready to interact with
    await page.waitForSelector("arcgis-map.ready", {
      timeout: 10_000,
    });

    // get the rect of the map and click in the center
    const map = page.locator("arcgis-map.ready");
    const box = (await map.boundingBox())!;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

    // allow time to update the map itself
    await page.waitForTimeout(1000);

    // take a screenshot of the data entry panel and check visual regression
    const dataEntryPanel = await page.locator(
      "calcite-shell-panel[slot='panel-start']",
    );
    const dataEntryScreenshotPath = "./screenshots/data-entry.png";
    await expect(dataEntryPanel).toHaveScreenshot(dataEntryScreenshotPath, {
      maxDiffPixelRatio: 0.05,
    });
  });
});
