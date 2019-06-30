// Vendors
import render from "preact-render-to-string";

export default function (metadata, route, component, assets) {
  let includeScript = Object.keys(assets).map(assetKey => `
    ${assetKey}Script = document.createElement("script");

    if ("noModule" in HTMLScriptElement.prototype) {
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
          ${metadata.title !== "Home" ? `${metadata.title} &mdash; ` : ""}Paintlets!
        </title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        ${metadata.metaTags.map(metaTag => `<meta${Object.keys(metaTag).map(metaTagAttribute => ` ${metaTagAttribute}="${metaTag[metaTagAttribute]}"`).join("")}>`).join("")}
        <script>document.documentElement.classList.remove("no-js")</script>
        <link rel="stylesheet" href="${assets.home.css}">
      </head>
      <body>
        <main id="app">
          ${render(component)}
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
