/* global registerPaint */

const paintName = "randots";

class Randots {
  constructor() {
  }

  static get inputProperties() {
    return [
      `--${paintName}-tile-size`,
      `--${paintName}-fill-color`,
      `--${paintName}-starting-alpha`,
      `--${paintName}-alpha-increment`,
      `--${paintName}-starting-probability`,
      `--${paintName}-probability-increment`
    ];
  }

  paint(ctx, geom, properties) {
    const tileSize = parseInt(properties.get(`--${paintName}-tile-size`));
    const dots = Math.ceil(geom.width / tileSize);
    const lines = Math.ceil(geom.height / tileSize);
    const startingAlpha = parseFloat(properties.get(`--${paintName}-starting-alpha`));
    const alphaIncrement = parseFloat(properties.get(`--${paintName}-alpha-increment`));
    const probabilityIncrement = parseFloat(properties.get(`--${paintName}-probability-increment`));
    const hexColor = properties.get(`--${paintName}-fill-color`).toString().split("#").pop();
    let startingProbability = parseFloat(properties.get(`--${paintName}-starting-probability`));
    let colorParts = {
      r: parseInt(`${hexColor[0]}${hexColor[1]}`, 16),
      g: parseInt(`${hexColor[2]}${hexColor[3]}`, 16),
      b: parseInt(`${hexColor[4]}${hexColor[5]}`, 16),
      a: startingAlpha
    };

    for (let line = 0; line < lines; line += tileSize) {
      ctx.fillStyle = `rgba(${colorParts.r}, ${colorParts.g}, ${colorParts.b}, ${colorParts.a})`;

      for (let dot = 0; dot < dots; dot += tileSize) {
        if (Math.random() < startingProbability) {
          ctx.fillRect((dot * tileSize), (line * tileSize), tileSize, tileSize);
        }
      }

      startingProbability += probabilityIncrement;
      colorParts.a = colorParts.a += alphaIncrement;
    }
  }
}

registerPaint(paintName, Randots);
