import { expect, describe, it } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import App from "./App";

describe("App", () => {
  it("can save an observation and display it in a popup", async () => {
    const results = await render(<App />);

    const map = results.container.querySelector("arcgis-map")!;
    await expect.poll(() => map.updating, { timeout: 150000 }).toBeFalsy();

    await userEvent.click(map, { position: { x: 450, y: 350 } });
    // await page.screenshot();

    await userEvent.click(page.getByTestId("data-entry-observation-input"));
    // await page.screenshot();

    await userEvent.keyboard("☀️");
    // await page.screenshot();

    await userEvent.click(page.getByRole("button", { name: "Submit" }));
    // await page.screenshot();

    await userEvent.click(map, { position: { x: 450, y: 350 } });
    await expect.poll(() => page.getByText("☀️")).toBeVisible();
    await page.screenshot();
  });
});
