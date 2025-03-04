import { beforeEach, describe, vi, Mock } from "vitest";
import { loadObservations, saveObservation } from "../fetchData";
import { Observation } from "../../types";

beforeEach(() => {
  globalThis.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fetchData functions", () => {
  it("loadObservations should fetch and return data", async () => {
    const mockData: Observation[] = [
      { latitude: 0, longitude: 0, observation: "test" },
    ];

    (fetch as Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockData),
    });

    const data = await loadObservations();
    expect(fetch).toHaveBeenCalledWith("/load");
    expect(data).toEqual(mockData);
  });

  it("saveObservation should send a POST request and return response", async () => {
    const mockObservation: Observation = {
      latitude: 0,
      longitude: 0,
      observation: "test",
    };
    const mockResponse = { response: "OK" };

    (fetch as Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const data = await saveObservation(mockObservation);

    expect(fetch).toHaveBeenCalledWith("/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockObservation),
    });
    expect(data).toEqual(mockResponse);
  });
});
