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

    await userEvent.click(map, { position: { x: 400, y: 300 } });

    await expect.poll(() => setLocationSpy).toHaveBeenCalled();
    expect(setLocationSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      }),
    );
  });

  it("opens popup when observation is clicked", async () => {
    const component = await render(
      <div style={{ width: "800px", height: "600px" }}>
        <MapContainer
          location={{ latitude: 0, longitude: 0 }}
          setLocation={() => {}}
          observations={[
            {
              latitude: 34.027,
              longitude: -118.805,
              observation: "☀️",
            },
          ]}
        />
      </div>,
    );

    const map = component.container.querySelector("arcgis-map")!;
    await expect.poll(() => map.updating, { timeout: 10_000 }).toBeFalsy();

    await userEvent.click(map, { position: { x: 400, y: 300 } });

    await expect.element(component.getByText("☀️")).toBeVisible();

    await expect.element(component.locator).toMatchScreenshot();
  });
});
