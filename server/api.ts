import express, { type Express } from "express";
import type { Observation } from "../src/interfaces";
import {
  createInMemoryObservationStore,
  type ObservationStoreFactory,
} from "./observationStore";

export function createApi(
  storeFactory: ObservationStoreFactory = createInMemoryObservationStore,
): Express {
  const store = storeFactory();
  const app = express();

  app.use(express.json());

  app.post("/save", (req, res) => {
    store.save(req.body as Observation);

    res.status(200).send({ response: "OK" });
  });

  app.get("/load", (_req, res) => {
    res.status(200).json(store.loadAll());
  });

  return app;
}
