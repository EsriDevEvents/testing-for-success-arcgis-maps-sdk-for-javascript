import { useRef } from "react";
import { Location } from "../types";

import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-block-section";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-notice";

export interface DataEntryProps {
  location: Location | null;
  onSubmit: (observation: string) => void | Promise<void>;
}

export default function DataEntry({ location, onSubmit }: DataEntryProps) {
  const observationRef = useRef<HTMLCalciteInputElement | null>(null);

  return (
    <calcite-block expanded heading="Selected Location">
      {!location && (
        <calcite-block-section expanded>
          <calcite-notice open>
            <div slot="message">Click the map to start</div>
          </calcite-notice>
        </calcite-block-section>
      )}
      {location && (
        <calcite-block-section expanded>
          <div>
            <calcite-label>
              Latitude
              <calcite-input-number
                id="latitude"
                readOnly
                value={location ? String(location.latitude) : "0"}
              ></calcite-input-number>
            </calcite-label>
          </div>
          <div>
            <calcite-label>
              Longitude
              <calcite-input-number
                id="longitude"
                readOnly
                value={location ? String(location.longitude) : "0"}
              ></calcite-input-number>
            </calcite-label>
          </div>
          <div>
            <calcite-label>
              Observation
              <calcite-input
                ref={observationRef}
                id="observation"
                data-testid="observation"
              ></calcite-input>
            </calcite-label>
          </div>
          <div>
            <calcite-button
              id="submit-button"
              onClick={() => {
                onSubmit(observationRef.current!.value);
              }}
            >
              Submit
            </calcite-button>
          </div>
        </calcite-block-section>
      )}
    </calcite-block>
  );
}
