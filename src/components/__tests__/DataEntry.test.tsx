import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import DataEntry from "../DataEntry";
import { page } from "@vitest/browser/context";
// import { snapshotTest } from "../testing/snapshotTest";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("loads and displays greeting", async () => {
  const longitude = -118.78457706335006;
  const latitude = 34.04766593041692;
  // Render a React element into the DOM
  const component = render(
    <DataEntry
      location={{
        latitude,
        longitude,
      }}
      onSubmit={console.log}
    />
  );

  const { baseElement } = component;

  // assure component loads
  await wait(1000);

  expect(
    (baseElement.querySelector("#latitude") as unknown as { value: number })
      .value
  ).toBe(String(latitude));

  expect(
    (baseElement.querySelector("#longitude") as unknown as { value: number })
      .value
  ).toBe(String(longitude));

  await page.elementLocator(baseElement).screenshot({
    path: "./screenshots/data-entry.png",
  });

  // const snapshotTestResult = snapshotTest("data-entry", screenshot);

  // expect(snapshotTestResult).toBeGreaterThan(0);
});
