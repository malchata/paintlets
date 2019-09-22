/* global registerPaint */

const paintName = "slapdash";

class Slapdash {
  static get inputProperties() {
    return [
      `--${paintName}-tile-size`,
      `--${paintName}-color`,
      `--${paintName}-weight`,
      `--${paintName}-probability`,
      `--${paintName}-direction`,
      `--${paintName}-crosshatch`
    ];
  }

  paint (ctx, geom, properties) {
    const tileSize = parseInt(properties.get(`--${paintName}-tile-size`));
    const crosshatchTileSize = tileSize / 4;
    const xTiles = geom.width / tileSize;
    const xCrosshatchTiles = geom.width / crosshatchTileSize;
    const yTiles = geom.height / tileSize;
    const yCrosshatchTiles = geom.height / crosshatchTileSize;
    const color = properties.get(`--${paintName}-color`).toString();
    const weight = parseFloat(properties.get(`--${paintName}-weight`));
    const probability = parseFloat(properties.get(`--${paintName}-probability`));
    const crosshatchProbability = probability + (Math.abs(probability - 1) / 2);
    const direction = !!parseInt(properties.get(`--${paintName}-direction`));
    const crosshatch = !!parseInt(properties.get(`--${paintName}-crosshatch`));

    // Set styles
    ctx.lineWidth = weight;
    ctx.strokeStyle = color;
    ctx.lineCap = "butt";

    for (let y = 0; y < yTiles; y++) {
      const yOffset = y * tileSize;

      for (let x = 0; x < xTiles; x++) {
        if (Math.random() >= probability) {
          const xOffset = x * tileSize;

          this.line(ctx, xOffset, yOffset, tileSize, direction);
        }
      }
    }

    if (crosshatch) {
      for (let y = 0; y < yCrosshatchTiles; y++) {
        const yOffset = y * crosshatchTileSize;

        for (let x = 0; x < xCrosshatchTiles; x++) {
          if (Math.random() >= crosshatchProbability) {
            const xOffset = x * crosshatchTileSize;

            this.line(ctx, xOffset, yOffset, crosshatchTileSize, !direction);
          }
        }
      }
    }
  }

  line (ctx, x, y, tileSize, direction) {
    ctx.beginPath();

    if (direction === false) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + tileSize, y + tileSize);
    } else {
      ctx.moveTo(x + tileSize, y);
      ctx.lineTo(x, y + tileSize);
    }

    ctx.stroke();
  }
}

registerPaint(paintName, Slapdash);
