/* global registerPaint */

const paintName = "blotto";

class Blotto {
  static get inputProperties () {
    return [
      `--${paintName}-tile-size`,
      `--${paintName}-color`,
      `--${paintName}-amplitude`,
      `--${paintName}-max-opacity`,
      `--${paintName}-blend-mode`
    ];
  }

  paint (ctx, geom, properties) {
    const tileSize = parseInt(properties.get(`--${paintName}-tile-size`));
    const xTiles = geom.width / tileSize;
    const yTiles = geom.height / tileSize;
    const amplitude = parseFloat(properties.get(`--${paintName}-amplitude`));
    const maxOpacity = parseFloat(properties.get(`--${paintName}-max-opacity`));
    const fullCircle = Math.PI * 2;

    ctx.fillStyle = properties.get(`--${paintName}-color`).toString();
    ctx.globalCompositeOperation = properties.get(`--${paintName}-blend-mode`).toString();

    for (let y = 0; y < yTiles; y++) {
      const yOffset = y * tileSize;

      for (let x = 0; x < xTiles; x++) {
        const opacity = Math.random() % Math.random();

        ctx.globalAlpha = opacity > maxOpacity ? maxOpacity : opacity;
        ctx.beginPath();
        ctx.arc(x * tileSize, yOffset, tileSize * Math.random() * amplitude, 0, fullCircle);
        ctx.fill();
      }
    }
  }
}

registerPaint(paintName, Blotto);
