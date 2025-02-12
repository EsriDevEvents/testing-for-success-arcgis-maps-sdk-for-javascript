import fetchMock from "@fetch-mock/vitest";
import { afterAll, assert, beforeAll, beforeEach, describe, test } from "vitest";
import { loadObservations, saveObservation } from "../fetchData";
import { Observation } from "../../components/DataEntry";


describe("loadObservations", () => {
  beforeAll(() => {
    fetchMock.mockGlobal();
  });

  beforeEach(() => {
    fetchMock.mockClear();
    fetchMock.config.allowRelativeUrls = true;
  });

  afterAll(() => {
    fetchMock.unmockGlobal();
  });

  test("it returns an array", async () => {
    // Have fetchMock return a specific value
    fetchMock.get("*", JSON.stringify([]));

    const obs = await loadObservations()
    assert.sameMembers(obs, []);

    const callLog = fetchMock.callHistory.callLogs[0];
    assert.exists(callLog);
    assert.equal(callLog.url, "http://localhost:3000/load");
  });

  test("it throws an exception", async () => {
    // Force fetch to throw an error
    fetchMock.get("*", 500, "expected");

    try {
      await loadObservations()
      assert.fail("No Exception thrown");
    } catch (error) {
    }
  });
});

describe("saveObservation", () => {
  const observation:Observation = { location: { latitude: 0, longitude: 0 }, observation: "test" };

  beforeAll(() => {
    fetchMock.mockGlobal();
  });
  
  beforeEach(() => {
    fetchMock.mockClear();
    fetchMock.config.allowRelativeUrls = true;
  });

  afterAll(() => {
    fetchMock.unmockGlobal();
  });

  test("it sends the observations", async () => {
    fetchMock.post("*", { response: "ok"});

    const response = await saveObservation(observation);

    assert.deepEqual(response, {response: "ok"});
    const callLog = fetchMock.callHistory.callLogs[0];
    assert.exists(callLog);
    assert.equal(callLog.url, "http://localhost:3000/save");
    assert.equal(callLog.options.body, JSON.stringify(observation));
  });
});