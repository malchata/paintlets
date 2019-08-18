/* global registerPaint */

const paintName = "lines";

class Lines {
  constructor() {
  }

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
    const tileSize = parseFloat(properties.get(`--${paintName}-tile-size`));
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

    for (let y = 0; y < (geom.height / tileSize); y++) {
      for (let x = 0; x < (geom.width / tileSize); x++) {
        if (Math.random() >= probability) {
          this.line(ctx, x, y, tileSize, direction);
        }
      }
    }

    if (crosshatch) {
      let crosshatchTilesize = tileSize / 4;

      for (let y = 0; y < (geom.height / crosshatchTilesize); y++) {
        for (let x = 0; x < (geom.width / crosshatchTilesize); x++) {
          if (Math.random() >= crosshatchProbability) {
            this.line(ctx, x, y, crosshatchTilesize, !direction);
          }
        }
      }
    }
  }

  line (ctx, x, y, tileSize, direction) {
    let xOffset = x * tileSize;
    let yOffset = y * tileSize;

    ctx.beginPath();

    if (direction === false) {
      ctx.moveTo(xOffset, yOffset);
      ctx.lineTo(xOffset + tileSize, yOffset + tileSize);
    } else {
      ctx.moveTo(xOffset + tileSize, yOffset);
      ctx.lineTo(xOffset, yOffset + tileSize);
    }

    ctx.stroke();
  }
}

registerPaint(paintName, Lines);
