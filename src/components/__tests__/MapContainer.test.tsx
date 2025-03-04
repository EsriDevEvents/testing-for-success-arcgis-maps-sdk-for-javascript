import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import MapContainer from "../MapContainer";

// Mock out the ArcGIS Maps SDK components
vi.mock("@arcgis/core/Map", () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {
        add: vi.fn(),
      };
    }),
  };
});

vi.mock("@arcgis/core/views/MapView", () => {
  return {
    default: vi.fn().mockImplementation((map) => {
      return {
        map,
        when: (cb: () => any) => cb(),
        on: (event: string, callback: () => void) => {
          if (event == "click") {
            callback();
          }
        },
        hitTest: () => Promise.resolve({ results: [{}] }),
      };
    }),
  };
});

vi.mock("@arcgis/core/layers/GraphicsLayer", () => {
  return {
    default: vi.fn().mockImplementation(() => {
      let graphics: any[] = [];
      return {
        graphics,
        add: vi.fn().mockImplementation((graphic) => graphics.push(graphic)),
        removeAll: vi.fn().mockImplementation(() => (graphics = [])),
      };
    }),
  };
});

vi.mock("@arcgis/core/Graphic", () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {};
    }),
  };
});

vi.mock("@arcgis/core/symbols/SimpleMarkerSymbol", () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {};
    }),
  };
});

vi.mock("@arcgis/core/geometry/Point", () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {};
    }),
  };
});

describe("MapContainer", () => {
  test("It calls onMapLoad", () => {
    const callback = vi.fn();

    render(
      <MapContainer
        onMapLoad={callback}
        onMapClick={vi.fn()}
        location={null}
        setLocation={() => null}
        observations={[]}
      />
    );

    expect(callback).toHaveBeenCalled();
  });
});
