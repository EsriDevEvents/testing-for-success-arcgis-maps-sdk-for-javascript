import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-block-section";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-notice";
import {
  CalciteBlock,
  CalciteBlockSection,
  CalciteButton,
  CalciteInput,
  CalciteInputNumber,
  CalciteLabel,
  CalciteNotice,
} from "@esri/calcite-components-react";

import { useRef } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

export interface Observation {
  location: Location;
  observation: string;
}

interface DataEntryProps {
  location: Location | null;
  onSubmit: (observation: string) => void | Promise<void>;
}

export default function DataEntry({ location, onSubmit }: DataEntryProps) {
  const observationRef = useRef<HTMLCalciteInputElement | null>(null);

  return (
    <CalciteBlock open heading="Selected Location">
      {!location && (
        <CalciteBlockSection open>
          <CalciteNotice open>
            <div slot="message">Click the map to start</div>
          </CalciteNotice>
        </CalciteBlockSection>
      )}
      {location && (
        <CalciteBlockSection open>
          <div>
            <CalciteLabel>
              Latitude
              <CalciteInputNumber
                id="latitude"
                readOnly
                value={location ? String(location.latitude) : "0"}
              ></CalciteInputNumber>
            </CalciteLabel>
          </div>
          <div>
            <CalciteLabel>
              Longitude
              <CalciteInputNumber
                id="longitude"
                readOnly
                value={location ? String(location.longitude) : "0"}
              ></CalciteInputNumber>
            </CalciteLabel>
          </div>
          <div>
            <CalciteLabel>
              Observation{" "}
              <CalciteInput
                ref={observationRef}
                id="textInput"
                data-testid="textInput"
              ></CalciteInput>
            </CalciteLabel>
          </div>
          <div>
            <CalciteButton
              id="submitText"
              onClick={() => onSubmit(observationRef.current!.value)}
            >
              Submit
            </CalciteButton>
          </div>
        </CalciteBlockSection>
      )}
    </CalciteBlock>
  );
}
