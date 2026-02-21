import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";

import { createApi } from "./api";
import type { Observation } from "../src/interfaces";
import {
  InMemoryObservationStore,
  type ObservationStoreFactory,
} from "./observationStore";

const createSeededStoreFactory = (
  initial: Observation[] = [],
): ObservationStoreFactory => {
  return () => {
    const store = new InMemoryObservationStore();

    initial.forEach((observation) => store.save(observation));

    return store;
  };
};

let app: ReturnType<typeof createApi>;

describe("GET /load", () => {
  it("should load pre-populated observations", async () => {
    const existing: Observation = {
      latitude: 45.5,
      longitude: -122.6,
      observation: "Foggy",
    };
    const seededApp = createApi(createSeededStoreFactory([existing]));

    const response = await request(seededApp).get("/load");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([existing]);
  });
});

describe("POST /save and GET /load", () => {
  beforeAll(() => {
    app = createApi();
  });

  it("should save and load observations", async () => {
    const first = {
      latitude: 45.5,
      longitude: -122.6,
      observation: "Cloudy",
    };

    const second = {
      latitude: 46.1,
      longitude: -123.2,
      observation: "Sunny",
    };

    await request(app).post("/save").send(first);
    await request(app).post("/save").send(second);

    const response = await request(app).get("/load");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([first, second]);
  });
});
