import { useRef, useEffect } from "react";

import Map from "@arcgis/core/Map"; // Import the Map class from the arcgis core library
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Point from "@arcgis/core/geometry/Point";

import "./MapContainer.css";

interface MapContainerProps {
  onMapLoad: () => void;
  onMapClick: (event: any) => void;
  loadedPoints: any[];
}

const map = new Map({
  basemap: "streets-navigation-vector",
});

const view = new MapView({
  map: map,
  center: [-118.805, 34.027],
  zoom: 13,
});

const pinLayer = new GraphicsLayer();
map.add(pinLayer);

const pointLayer = new GraphicsLayer();
map.add(pointLayer);

export default function MapContainer({ onMapLoad, onMapClick, loadedPoints}: MapContainerProps) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      view.container = mapRef.current;
      view.when(() => {
        onMapLoad();
      });
    }
  }, [mapRef]);

  useEffect(() => {
    view.on("click", (event) => {
      // Determine if the user clicked on a point or a blank area...
      view.hitTest(event, {include:[pointLayer]}).then((hits) => {
        if (hits.results.length === 0) {
          // add a point to the map
          pinLayer.removeAll();

          const pinGraphic = new Graphic({
            geometry: new Point({ latitude: event.mapPoint.latitude, longitude: event.mapPoint.longitude }),
            symbol: new SimpleMarkerSymbol({ style: "x", size: 10, outline: {width: 3}}),
          });

          pinLayer.add(pinGraphic);

          // Call event handler
          onMapClick(event.mapPoint);
        }
      });
    });
  }, [onMapClick]);

  useEffect(() => {
    pointLayer.removeAll();
    loadedPoints.forEach((point) => {
      const pointGraphic = new Graphic({
        geometry: new Point({latitude: point.latitude, longitude: point.longitude}),
        symbol: new SimpleMarkerSymbol({
          style: "circle",
          size: "10",
          outline: { width: 1 }
        }),
        attributes: { observation: point.observation },
        popupTemplate: {
          title: "Observation",
          content: "{observation}"
        }
      });
      pointLayer.add(pointGraphic);
    });
    pinLayer.removeAll();
  }, [loadedPoints]);

  return <div ref={mapRef} className="mapDiv"/>;
};