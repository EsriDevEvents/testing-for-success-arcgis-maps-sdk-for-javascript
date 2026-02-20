import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import DataEntry from "./DataEntry";
import { wait } from "../test-utils/interactions";

describe("DataEntry", () => {
  test("renders DataEntry, handles properties, and displays latitude and longitude", async () => {
    const longitude = -118.78457706335006;
    const latitude = 34.04766593041692;

    const component = render(
      <DataEntry
        location={{
          latitude,
          longitude,
        }}
        onSubmit={console.log}
      />,
    );

    const { baseElement } = component;

    await wait(1000);

    expect(
      (baseElement.querySelector("#latitude") as unknown as { value: number })
        .value,
    ).toBe(String(latitude));

    expect(
      (baseElement.querySelector("#longitude") as unknown as { value: number })
        .value,
    ).toBe(String(longitude));
  });
});
