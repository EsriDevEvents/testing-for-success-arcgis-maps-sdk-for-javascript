import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import DataEntry from "../DataEntry";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("loads and displays longitude and latitude", async () => {
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
});
