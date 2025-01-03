import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setAssetPath as setCalciteComponetsAssetPath } from '@esri/calcite-components/dist/components';

setCalciteComponetsAssetPath('https://js.arcgis.com/calcite-components/2.13.2/assets');
import "@esri/calcite-components/dist/calcite/calcite.css"; 

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
