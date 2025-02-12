import {
  CalciteBlock,
  CalciteBlockSection,
  CalciteButton,
  CalciteInput,
  CalciteInputNumber,
  CalciteLabel,
  CalciteNotice,
} from "@esri/calcite-components-react";
import { useState } from "react";

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
  onSubmit: (observation: Observation) => void;
}

export default function DataEntry({ location, onSubmit }: DataEntryProps) {
  const [observation, setObservation] = useState<string>("");

  console.log("Received Location", { location });

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
                readOnly
                value={location ? String(location.latitude) : "0"}
              ></CalciteInputNumber>
            </CalciteLabel>
          </div>
          <div>
            <CalciteLabel>
              Longitude{" "}
              <CalciteInputNumber
                readOnly
                value={location ? String(location.longitude) : "0"}
              ></CalciteInputNumber>
            </CalciteLabel>
          </div>
          <div>
            <CalciteLabel>
              Observation{" "}
              <CalciteInput
                id="textInput"
                data-testid="textInput"
                onCalciteInputChange={(e) => setObservation(e.target.value)}
              ></CalciteInput>
            </CalciteLabel>
          </div>
          <div>
            <CalciteButton
              id="submitText"
              onClick={() => onSubmit({ location, observation })}
            >
              Submit
            </CalciteButton>
          </div>
        </CalciteBlockSection>
      )}
    </CalciteBlock>
  );
}
