import { render, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import MapContainer from "./MapContainer";

vi.mock("@arcgis/core/layers/GraphicsLayer", () => {
  return {
    default: vi.fn().mockImplementation(function () {
      const graphics = {
        removeAll: () => null,
        push: () => null,
      };
      return {
        graphics,
      };
    }),
  };
});

vi.mock("@arcgis/core/Graphic", () => {
  return {
    default: vi.fn().mockImplementation(function () {
      return {};
    }),
  };
});

vi.mock("@arcgis/core/symbols/SimpleMarkerSymbol", () => {
  return {
    default: vi.fn().mockImplementation(function () {
      return {};
    }),
  };
});

vi.mock("@arcgis/core/geometry/Point", () => {
  return {
    default: vi.fn().mockImplementation(function () {
      return {};
    }),
  };
});

describe("MapContainer", () => {
  test("webgl enabled", () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    expect(gl).not.toBeNull();
  });

  test("renders and trigger onMapLoad when map is ready", async () => {
    const callback = vi.fn();

    render(
      <div style={{ width: "800px", height: "600px" }}>
        <MapContainer
          onMapLoad={callback}
          onMapClick={vi.fn()}
          location={null}
          setLocation={() => null}
          observations={[]}
        />
      </div>,
    );

    await waitFor(() => expect(callback).toHaveBeenCalled(), {
      timeout: 10_000,
      onTimeout(error) {
        throw new Error(
          error.message +
            "\n\nMake sure you are calling onMapLoad in the useEffect hook.",
        );
      },
    });
  });
});
