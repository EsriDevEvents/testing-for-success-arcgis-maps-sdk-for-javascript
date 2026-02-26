import { describe, it, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import MapContainer from "./MapContainer";

describe("MapContainer", () => {
  it("renders", async () => {
    const component = await render(
      <div style={{ width: "800px", height: "600px" }}>
        <MapContainer
          observations={[]}
          location={null}
          setLocation={() => {}}
        />
      </div>,
    );
    const map = component.container.querySelector("arcgis-map")!;
    await expect.poll(() => map.updating, { timeout: 10_000 }).toBeFalsy();
  });

  it("renders and accepts clicks", async () => {
    const setLocationSpy = vi.fn();

    const component = await render(
      <div style={{ width: "800px", height: "600px" }}>
        <MapContainer
          observations={[]}
          location={null}
          setLocation={setLocationSpy}
        />
      </div>,
    );
    const map = component.container.querySelector("arcgis-map")!;
    await expect.poll(() => map.updating, { timeout: 10_000 }).toBeFalsy();

    await userEvent.click(map, { position: { x: 100, y: 100 } });

    await expect.poll(() => setLocationSpy).toHaveBeenCalled();
    expect(setLocationSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      }),
    );
  });

  it("renders marker", async () => {
    const component = await render(
      <div style={{ width: "800px", height: "600px" }}>
        <MapContainer
          observations={[]}
          location={{ latitude: 34.027, longitude: -118.805 }}
          setLocation={() => {}}
        />
      </div>,
    );

    const map = component.container.querySelector("arcgis-map")!;
    await expect.poll(() => map.updating, { timeout: 10_000 }).toBeFalsy();

    await expect.element(component.locator).toMatchScreenshot();
  });

  it("renders observation", async () => {
    const component = await render(
      <div style={{ width: "800px", height: "600px" }}>
        <MapContainer
          observations={[
            { latitude: 34.027, longitude: -118.805, observation: "☀️" },
          ]}
          location={null}
          setLocation={() => {}}
        />
      </div>,
    );

    const map = component.container.querySelector("arcgis-map")!;
    await expect.poll(() => map.updating, { timeout: 10_000 }).toBeFalsy();

    await expect.element(component.locator).toMatchScreenshot();
  });

  it("opens popup when observation is clicked", async () => {
    const component = await render(
      <div style={{ width: "400px", height: "720px" }}>
        <MapContainer
          location={{ latitude: 0, longitude: 0 }}
          setLocation={() => {}}
          observations={[
            {
              latitude: 34.02771190164404,
              longitude: -118.81032193749677,
              observation: "☀️",
            },
          ]}
        />
      </div>,
    );

    const map = component.container.querySelector("arcgis-map")!;
    await expect.poll(() => map.updating, { timeout: 10_000 }).toBeFalsy();

    await userEvent.click(map, { position: { x: 10, y: 10 } });

    await expect.element(component.getByText("☀️")).toBeVisible();
    await expect.element(component.locator).toMatchScreenshot();
  });
});
