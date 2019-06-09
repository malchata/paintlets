// Vendors
import render from "preact-render-to-string";

// App-specific
import { DEFAULT_META_TAGS } from "./constants.js";

export default function (metadata, route, component, assets) {
  metadata.metaTags = "metaTags" in metadata ? [...metadata.metaTags, ...DEFAULT_META_TAGS] : DEFAULT_META_TAGS;

  return `
    <!DOCTYPE html>
    <html class="no-js" lang="en" dir="ltr">
      <head>
        <title>
          ${metadata.title} &mdash; Paintlets!
        </title>
        <script>document.documentElement.classList.remove("no-js")</script>
      </head>
      <body>
        <main>
          <div>
            ${render(component)}
          </div>
        </main>
      </body>
      <script>
          var scriptEl = document.createElement("script");

          if ("noModule" in scriptEl) {
            scriptEl.src = "/js/${assets.modern["./src/client/routes/home.js"]}";
            scriptEl.type = "module";
          } else {
            scriptEl.src = "/js/${assets.legacy["./src/client/routes/home.js"]}";
            scriptEl.defer = true;
          }

          document.body.appendChild(scriptEl);
      </script>
    </html>
  `;
}
