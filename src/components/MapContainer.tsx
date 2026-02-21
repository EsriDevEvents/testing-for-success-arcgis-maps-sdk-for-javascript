import { useRef, useEffect, Dispatch, SetStateAction, useState } from "react";
import type { Location, Observation } from "../interfaces";

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";

import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

interface MapContainerProps {
  setLocation: Dispatch<SetStateAction<Location | null>>;
  observations: Observation[];
  location: Location | null;
  onMapLoad?: () => void;
  onMapClick?: () => void;
}

const MapContainer = ({
  setLocation,
  observations,
  location,
  onMapLoad,
  onMapClick,
}: MapContainerProps) => {
  const mapRef = useRef<HTMLArcgisMapElement>(null);
  const pinLayerRef = useRef(new GraphicsLayer());
  const pointLayerRef = useRef(new GraphicsLayer());
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (mapReady && mapRef.current) {
      const map = mapRef.current;
      if (pinLayerRef.current instanceof GraphicsLayer) {
        map.map?.add(pinLayerRef.current);
      }
      if (pointLayerRef.current instanceof GraphicsLayer) {
        map.map?.add(pointLayerRef.current);
      }

      // append ready to the class for testing
      map.classList.add("ready");

      if (onMapLoad) {
        onMapLoad();
      }
    }
  }, [mapReady]);

  useEffect(() => {
    if (!mapReady) return;
    if (location) {
      pinLayerRef.current.graphics.removeAll();
      const { latitude, longitude } = location;
      const pin = new Graphic({
        geometry: new Point({ latitude, longitude }),
        symbol: new SimpleMarkerSymbol({
          style: "x",
          size: 10,
          outline: { width: 3 },
        }),
      });
      pinLayerRef.current.graphics.push(pin);
    } else {
      pinLayerRef.current.graphics.removeAll();
    }
  }, [location, mapReady]);

  useEffect(() => {
    if (observations.length > 0 && mapReady) {
      pointLayerRef.current.graphics.removeAll();
      observations.forEach(({ latitude, longitude, observation }) => {
        const point = new Graphic({
          geometry: new Point({ latitude, longitude }),
          symbol: new SimpleMarkerSymbol({
            style: "circle",
            size: 10,
            outline: { width: 1 },
          }),
          attributes: { latitude, longitude, observation },
          popupTemplate: {
            title: "Observation",
            content:
              "<b>Latitude. </b> {latitude}<br/><b>Longitude. </b> {longitude}<br/><br/><b>Observation</b><br/>{observation}",
          },
        });
        pointLayerRef.current.graphics.push(point);
      });
    }
  }, [observations, mapReady]);

  return (
    <arcgis-map
      ref={mapRef}
      basemap="streets-navigation-vector"
      zoom={13}
      center={[-118.805, 34.027]}
      onarcgisViewReadyChange={(e) => {
        setMapReady(e.currentTarget.ready);
      }}
      onarcgisViewClick={async (e) => {
        const { latitude, longitude } = e.detail.mapPoint;
        const view = mapRef.current!.view;
        const { x, y } = e.detail;

        const { results } = await view.hitTest(
          { x, y },
          { include: pointLayerRef.current },
        );

        if (results.length === 0) {
          setLocation({ latitude: latitude!, longitude: longitude! });
        }

        if (onMapClick) {
          onMapClick();
        }
      }}
    >
      <arcgis-zoom slot="top-right"></arcgis-zoom>
    </arcgis-map>
  );
};

export default MapContainer;
