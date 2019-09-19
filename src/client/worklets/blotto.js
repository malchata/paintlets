/* global registerPaint */

const paintName = "blotto";

class Blotto {
  constructor () {
    this.fullCircle = Math.PI * 2;
  }

  static get inputProperties () {
    return [
      `--${paintName}-tile-size`,
      `--${paintName}-color`,
      `--${paintName}-amplitude`,
      `--${paintName}-blend-mode`
    ];
  }

  paint (ctx, geom, properties) {
    const tileSize = parseInt(properties.get(`--${paintName}-tile-size`));
    const amplitude = parseFloat(properties.get(`--${paintName}-amplitude`));
    const geomTileHeight = geom.height / tileSize;
    const geomTileWidth = geom.width / tileSize;

    ctx.fillStyle = properties.get(`--${paintName}-color`).toString();
    ctx.globalCompositeOperation = properties.get(`--${paintName}-blend-mode`).toString();

    for (let y = 0; y < geomTileHeight; y++) {
      const yOffset = y * tileSize;

      for (let x = 0; x < geomTileWidth; x++) {
        const xOffset = x * tileSize;
        const alpha = Math.random() % Math.random();
        const radius = tileSize * Math.random() * amplitude;

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(xOffset, yOffset, radius, 0, this.fullCircle, false);
        ctx.fill();
      }
    }
  }
}

registerPaint(paintName, Blotto);
