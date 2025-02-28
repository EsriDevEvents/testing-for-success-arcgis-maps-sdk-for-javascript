import { useEffect, useState } from "react";
import MapContainer from "./components/MapContainer";
import "./App.css";

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";

import "@arcgis/map-components/dist/components/arcgis-map";
import {
  CalciteShell,
  CalciteShellPanel,
  CalcitePanel,
} from "@esri/calcite-components-react";
import DataEntry from "./components/DataEntry";
import { loadObservations, saveObservation } from "./api/fetchData";

function App() {
  const [currentPoint, setCurrentPoint] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loadedPoints, setLoadedPoints] = useState([]);

  const onSaveObservation = async (observation: string) => {
    if (currentPoint !== null) {
      console.log("Saving observation");
      await saveObservation({
        location: currentPoint,
        observation,
      });
      await loadObservations().then(setLoadedPoints).catch(console.error);
      setCurrentPoint(null);
    }
  };

  // Load all of the current observations to the map
  useEffect(() => {
    loadObservations().then(setLoadedPoints).catch(console.error);
  }, []);

  return (
    <CalciteShell contentBehind>
      <CalciteShellPanel slot="panel-start" position="start">
        <CalcitePanel heading="Data Entry">
          <DataEntry
            location={currentPoint}
            onSubmit={(observation) => onSaveObservation(observation)}
          />
        </CalcitePanel>
      </CalciteShellPanel>
      <MapContainer
        onMapLoad={() => {
          console.log("Map loaded");
        }}
        onMapClick={(mapPoint) => setCurrentPoint(mapPoint)}
        loadedPoints={loadedPoints}
      />
    </CalciteShell>
  );
}

export default App;
