import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = React.lazy(() => import("./App"));

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
