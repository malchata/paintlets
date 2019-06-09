// Built-ins
import { readFile } from "fs";
import { resolve } from "path";
import { promisify } from "util";

// Vendors
import express from "express";
import compression from "compression";
import { h } from "preact";

// App-specific
import { IS_PRODUCTION } from "./helpers/constants.js";
import generateManifest from "./helpers/generate-manifest.js";
import html from "./helpers/html.js";
import PaintletList from "../client/components/PaintletList.js";
import worklets from "./worklets.js";

// Init express app
const readFileAsync = promisify(readFile);
const app = express();

// Static content paths
app.use("/js", express.static(resolve(process.cwd(), "dist", "client", "js")));
app.use("/worklets", express.static(resolve(process.cwd(), "dist", "client", "worklets")));
app.use("/css", express.static(resolve(process.cwd(), "dist", "client", "css")));
// app.use("/images", express.static(resolve(process.cwd(), "dist", "client", "images")));

// If in production, use compression.
if (IS_PRODUCTION) {
  app.use(compression());
}

// Spin up web server
app.listen(IS_PRODUCTION ? "80" : "8080", () => {
  const legacyAssets = resolve(process.cwd(), "dist", "server", "assets-legacy.json");
  const modernAssets = resolve(process.cwd(), "dist", "server", "assets-modern.json");

  Promise.all([readFileAsync(legacyAssets), readFileAsync(modernAssets)]).then(assets => {
    app.get("/", (req, res) => {
      const metadata = {
        title: "Home"
      };

      res.set("Content-Type", "text/html");
      res.status(200);
      res.send(html(metadata, "/", <PaintletList worklets={worklets} />, generateManifest(assets)));
    });
  }).catch(error => {
    throw error;
  });
});
