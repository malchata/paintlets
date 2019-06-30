// Built-ins
import { readFile } from "fs";
import { resolve } from "path";

// Vendors
import express from "express";
import compression from "compression";
import { h } from "preact";

// App-specific
import html from "Helpers/html";
import Home from "Components/Home";
import worklets from "./worklets";

// Init express app
const app = express();

// Static content paths
app.use("/js", express.static(resolve(process.cwd(), "dist", "client", "js")));
app.use("/worklets", express.static(resolve(process.cwd(), "dist", "client", "worklets")));
app.use("/css", express.static(resolve(process.cwd(), "dist", "client", "css")));

// Use compression.
app.use(compression());

// Spin up web server
app.listen(process.env.PORT || 8080, () => {
  readFile(resolve(process.cwd(), "dist", "server", "assets.json"), (error, data) => {
    if (error) {
      throw error;
    }

    app.get("/", (req, res) => {
      const metadata = {
        title: "Home",
        metaTags: [
          {
            name: "description",
            content: "A gallery of tweakable and downloadable paint worklets!"
          }
        ]
      };

      res.set("Content-Type", "text/html");
      res.status(200);
      res.send(html(metadata, "/", <Home worklets={worklets} />, JSON.parse(data.toString())));
    });
  });
});
