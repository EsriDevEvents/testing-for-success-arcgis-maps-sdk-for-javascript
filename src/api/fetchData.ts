
export async function loadObservations() {
  return fetch("/load").then((response) => response.json()).then((data) => { return data }).catch((error) => { console.error(error); throw error; });
}

export async function saveObservation(observation: any) {
  return fetch("/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(observation),
  }).then((response) => response.json()).then((data) => { console.log("observation saved"); return data }).catch((error) => { console.error(error); throw error; });
}