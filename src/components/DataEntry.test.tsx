/* eslint-disable prettier/prettier */
import { describe, it, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import DataEntry from "./DataEntry";

describe("DataEntry", () => {
  it("renders initial state", async () => {
    const component = await render(
      <DataEntry location={null} onSubmit={() => {}} />,
    );

    await expect.element(component.locator).toBeVisible();
    await expect
      .element(component.getByText("Click the map to start"))
      .toBeVisible();

    await expect
      .element(component.locator)
      .toMatchScreenshot("data-entry-init");
  });

  it("renders w/ location", async () => {
    const component = await render(
      <DataEntry
        location={{
          latitude: 34.02771190164404,
          longitude: -118.81032193749677,
        }}
        onSubmit={() => {}}
      />,
    );

    await expect
      .element(component.getByTestId("data-entry-latitude-input"))
      .toHaveValue("34.02771190164404");
    await expect
      .element(component.getByTestId("data-entry-longitude-input"))
      .toHaveValue("-118.81032193749677");

    await expect
      .element(component.locator)
      .toMatchScreenshot("data-entry-w-location");
  });

  it("calls onSubmit when submit button is clicked", async () => {
    const onSubmit = vi.fn();

    const component = await render(
      <DataEntry
        location={{
          latitude: 34.02771190164404,
          longitude: -118.81032193749677,
        }}
        onSubmit={onSubmit}
      />,
    );

    await component.getByTestId("data-entry-observation-input").click();
    await expect
      .element(component.getByTestId("data-entry-observation-input"))
      .toHaveFocus();
    await userEvent.keyboard("☀️");
    await component.getByRole("button", { name: "submit" }).click();

    expect(onSubmit).toHaveBeenCalledWith("☀️");

    await expect
      .element(component.locator)
      .toMatchScreenshot("data-entry-add-observation");
  });

  it("can submit w/ keyboard only", async () => {
    const onSubmit = vi.fn();

    const component = await render(
      <DataEntry
        location={{
          latitude: 34.02771190164404,
          longitude: -118.81032193749677,
        }}
        onSubmit={onSubmit}
      />,
    );

    await component.getByTestId("data-entry-observation-input").click();
    await userEvent.keyboard("☀️");
    await userEvent.keyboard("{Enter}");

    expect(onSubmit).toHaveBeenCalledWith("☀️");
  });
});
