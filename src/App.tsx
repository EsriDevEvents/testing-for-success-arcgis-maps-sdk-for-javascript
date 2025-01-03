import { useEffect, useState } from 'react'
import MapContainer from './components/MapContiainer';
import './App.css'

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";

import "@arcgis/map-components/dist/components/arcgis-map";
import { CalciteShell, CalciteShellPanel, CalcitePanel } from '@esri/calcite-components-react';
import DataEntry, { Observation } from './components/DataEntry';
import { loadObservations, saveObservation } from './api/fetchData';

function App() {
  const [currentPoint, setCurrentPoint] = useState(null);
  const [currentObservation, setCurrentObservation] = useState<Observation | null>(null);
  const [loadedPoints, setLoadedPoints] = useState([]);

  useEffect(() => {
    if (currentObservation !== null) {
      saveObservation(currentObservation).then(() => {
        console.log("Observation saved");
        loadObservations().then((data) => {
          setLoadedPoints(data);
        }).catch((error) => {console.error(error)});
      });
    }
  }, [currentObservation]);

  // Load all of the current observations to the map
  useEffect(() => {
    loadObservations().then((data) => {
      setLoadedPoints(data);
    }).catch((error) => {console.error(error)});
  }, []);

  return (
    <CalciteShell contentBehind>
      <CalciteShellPanel slot='panel-start' position='start'>
        <CalcitePanel heading='Data Entry'>
          <DataEntry location={currentPoint} onSubmit={(observation) => setCurrentObservation(observation)} />
        </CalcitePanel>
      </CalciteShellPanel>
      <MapContainer onMapLoad={() => { console.log("Map loaded") }} onMapClick={(mapPoint) => setCurrentPoint(mapPoint)} loadedPoints={loadedPoints} />
    </CalciteShell>
  )
}

export default App
