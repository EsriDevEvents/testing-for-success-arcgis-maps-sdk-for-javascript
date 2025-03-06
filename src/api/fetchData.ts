import { Observation } from "../types";

// requests to load observations from our express server
export async function loadObservations() {
  return fetch("/load")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// requests to save an observation in our express server
export async function saveObservation(observation: Observation) {
  return fetch("/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(observation),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
