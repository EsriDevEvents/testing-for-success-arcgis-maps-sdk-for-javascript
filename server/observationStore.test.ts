import { beforeEach, describe, expect, it } from "vitest";

import { createInMemoryObservationStore } from "./observationStore";
import type { Observation } from "../src/interfaces";

describe("observationStore", () => {
  let store: ReturnType<typeof createInMemoryObservationStore>;

  beforeEach(() => {
    store = createInMemoryObservationStore();
  });

  it("starts empty", () => {
    expect(store.loadAll()).toEqual([]);
  });

  it("saves and loads one observation", () => {
    // Arrange
    const observation: Observation = {
      latitude: 45.5,
      longitude: -122.6,
      observation: "Cloudy",
    };

    // Act
    store.save(observation);

    // Assert
    expect(store.loadAll()).toEqual([observation]);
  });

  it("saves and loads multiple observations", () => {
    // Arrange
    const first: Observation = {
      latitude: 45.5,
      longitude: -122.6,
      observation: "Cloudy",
    };
    const second: Observation = {
      latitude: 46.1,
      longitude: -123.2,
      observation: "Sunny",
    };

    // Act
    store.save(first);
    store.save(second);

    // Assert
    expect(store.loadAll()).toEqual([first, second]);
  });
});
