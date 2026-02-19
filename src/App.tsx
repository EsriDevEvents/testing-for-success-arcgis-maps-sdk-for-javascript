import { useEffect, useState } from "react";

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";

import MapContainer from "./components/MapContainer";
import DataEntry from "./components/DataEntry";

import { loadObservations, saveObservation } from "./api/fetchData";
import { Observation, Location } from "./types";

function App() {
  const [currentPoint, setCurrentPoint] = useState<Location | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);

  const onSaveObservation = async (observation: string) => {
    if (currentPoint !== null) {
      await saveObservation({
        ...currentPoint,
        observation,
      });
      await loadObservations().then(setObservations).catch(console.error);
      setCurrentPoint(null);
    }
  };

  // Load all of the current observations to the map
  useEffect(() => {
    loadObservations().then(setObservations).catch(console.error);
  }, []);

  return (
    <calcite-shell contentBehind={true}>
      <calcite-shell-panel slot="panel-start">
        <calcite-panel heading="Data Entry">
          <DataEntry location={currentPoint} onSubmit={onSaveObservation} />
        </calcite-panel>
      </calcite-shell-panel>
      <MapContainer
        location={currentPoint}
        setLocation={setCurrentPoint}
        observations={observations}
      />
    </calcite-shell>
  );
}

export default App;
