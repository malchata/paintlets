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
        <link rel="stylesheet" href="${assets.commons.css}">
      </head>
      <body>
        <main>
          <div>
            ${render(component)}
          </div>
        </main>
      </body>
    </html>
  `;
}
