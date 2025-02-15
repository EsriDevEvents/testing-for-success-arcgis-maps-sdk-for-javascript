import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { setAssetPath as setCalciteComponetsAssetPath } from "@esri/calcite-components/dist/components";

setCalciteComponetsAssetPath(
  "https://js.arcgis.com/calcite-components/2.13.2/assets"
);

import "@esri/calcite-components/dist/calcite/calcite.css";
import "../index.css";

afterEach(() => {
  cleanup();
});
