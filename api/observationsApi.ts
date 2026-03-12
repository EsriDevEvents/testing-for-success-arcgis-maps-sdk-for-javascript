import type { Plugin, ViteDevServer } from "vite";
import { Observation } from "../src/interfaces";
import express from "express";

const observationApi = (observations: Observation[]): Plugin => ({
  name: "observations-api",
  configureServer(server: ViteDevServer) {
    const app = express();
    app.use(express.json());

    app.get("/api/load", (req, res) => {
      console.log(`[observation-api] GET ${req.originalUrl}`);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(observations));
    });
    app.post("/api/save", (req, res) => {
      console.log(`[observation-api] POST ${req.originalUrl}`);
      const data = req.body;

      if (data) {
        observations.push(data);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ success: true }));
        return;
      }

      res
        .status(400)
        .json({ success: false, message: "Invalid observation data" });
    });

    server.middlewares.use(app);
  },
});

export default observationApi;
