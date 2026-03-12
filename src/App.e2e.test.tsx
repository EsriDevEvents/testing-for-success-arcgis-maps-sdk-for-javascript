import { setupWorker } from "msw/browser";
import { http, HttpResponse, passthrough } from "msw";
import { describe, it as itBase } from "vitest";

import { type Observation } from "./interfaces";

const initialObservations: Observation[] = [];
let observations = [...initialObservations];

/**********************************
 * Mock service setup.
 **********************************/
const worker = setupWorker(
  http.get("/api/load", () => {
    return HttpResponse.json(observations);
  }),
  http.post("/api/save", async ({ request }) => {
    const data = (await request.json()) as Observation | null;
    if (data) {
      observations = [...observations, data];
    }
    return HttpResponse.json({ success: true });
  }),
  http.get("*", () => {
    passthrough();
  }),
);

// Based on https://mswjs.io/docs/recipes/vitest-browser-mode
const it = itBase.extend({
  worker: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // Start the worker before the test.
      await worker.start({ quiet: true });
      // Expose the worker object on the test's context.
      await use(worker);
      // Remove any request handlers added in individual test cases.
      // This prevents them from affecting unrelated tests.
      worker.resetHandlers();
      // Stop the worker after the test is done.
      worker.stop();
    },
    {
      auto: true,
    },
  ],
});

/**********************************
 * Tests.
 **********************************/

describe("App", () => {
  it.todo("can save an observation and display it in a popup", async () => {});
});
