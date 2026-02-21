import type { Observation } from "../src/interfaces";

export interface ObservationStore {
  save(observation: Observation): void;
  loadAll(): Observation[];
}

export class InMemoryObservationStore implements ObservationStore {
  private readonly db: Observation[] = [];

  save(observation: Observation): void {
    this.db.push(observation);
  }

  loadAll(): Observation[] {
    return this.db;
  }
}

export type ObservationStoreFactory = () => ObservationStore;

export const createInMemoryObservationStore: ObservationStoreFactory = () =>
  new InMemoryObservationStore();
