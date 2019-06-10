// Vendors
import render from "preact-render-to-string";

export default function (metadata, route, component, assets) {
  let includeScript = "var moduleSupport = \"noModule\" in HTMLScriptElement.prototype";

  includeScript += Object.keys(assets).map(assetKey => `
    ${assetKey}Script = document.createElement("script");

    if (moduleSupport) {
      ${assetKey}Script.src = "${assets[assetKey].mjs}";
      ${assetKey}Script.type = "module";
    } else {
      ${assetKey}Script.src = "${assets[assetKey].js}";
      ${assetKey}Script.defer = true;
    }

    ${assetKey}Script.async = false;
    document.body.appendChild(${assetKey}Script);
  `).join("");

  return `
    <!DOCTYPE html>
    <html class="no-js" lang="en" dir="ltr">
      <head>
        <title>
          ${metadata.title} &mdash; Paintlets!
        </title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <script>document.documentElement.classList.remove("no-js")</script>
        <link rel="stylesheet" href="${assets.commons.css}">
      </head>
      <body>
        <main id="app">
          <div>
            ${render(component)}
          </div>
        </main>
        <script>
          (function(document) {
            ${includeScript}
          })(document);
        </script>
      </body>
    </html>
  `;
}
