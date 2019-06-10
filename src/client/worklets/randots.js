/* global registerPaint */

class Randots {
  constructor() {
  }

  static get inputProperties() {
    return [
      "--randots-tile-size",
      "--randots-fill-color",
      "--randots-starting-alpha",
      "--randots-alpha-increment",
      "--randots-starting-probability",
      "--randots-probability-increment"
    ];
  }

  paint(ctx, geom, properties) {
    const tileSize = parseInt(properties.get("--randots-tile-size"));
    const dots = Math.ceil(geom.width / tileSize);
    const lines = Math.ceil(geom.height / tileSize);
    const alphaIncrement = parseFloat(properties.get("--randots-alpha-increment"));
    const probabilityIncrement = parseFloat(properties.get("--randots-probability-increment"));
    const hexColor = properties.get("--randots-fill-color").toString().split("#").pop();
    let probability = parseFloat(properties.get("--randots-starting-probability"));
    let colorParts = {
      r: parseInt(`${hexColor[0]}${hexColor[1]}`, 16),
      g: parseInt(`${hexColor[2]}${hexColor[3]}`, 16),
      b: parseInt(`${hexColor[4]}${hexColor[5]}`, 16),
      a: parseFloat(properties.get("--randots-starting-alpha"))
    };

    for (let line = 0; line < lines; line += tileSize) {
      ctx.fillStyle = `rgb(${colorParts.r},${colorParts.g},${colorParts.b},${colorParts.a})`;

      for (let dot = 0; dot < dots; dot += tileSize) {
        if (Math.random() < probability) {
          ctx.fillRect((dot * tileSize), (line * tileSize), tileSize, tileSize);
        }
      }

      probability += probabilityIncrement;
      colorParts.a = colorParts.a += alphaIncrement;
    }
  }
}

registerPaint("randots", Randots);
