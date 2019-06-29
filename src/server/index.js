// Built-ins
import { readFile } from "fs";
import { resolve } from "path";

// Vendors
import express from "express";
import compression from "compression";
import { h } from "preact";

// App-specific
import { IS_PRODUCTION, PORT } from "Helpers/constants";
import html from "Helpers/html";
import Home from "Components/Home";
import worklets from "./worklets";

// Init express app
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
app.listen(PORT, () => {
  readFile(resolve(process.cwd(), "dist", "server", "assets.json"), (error, data) => {
    if (error) {
      throw error;
    }

    app.get("/", (req, res) => {
      const metadata = {
        title: "Home"
      };

      res.set("Content-Type", "text/html");
      res.status(200);
      res.send(html(metadata, "/", <Home worklets={worklets} />, JSON.parse(data.toString())));
    });
  });
});
