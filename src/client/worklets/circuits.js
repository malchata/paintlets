/* global registerPaint */

const paintName = "circuits";

class Circuits {
  constructor () {
    this.fullArc = Math.PI * 2;
  }

  static get inputProperties () {
    return [
      `--${paintName}-tile-size`,
      `--${paintName}-thickness`,
      `--${paintName}-color`,
    ];
  }

  paint (ctx, geom, properties) {
    const tileSize = parseInt(properties.get(`--${paintName}-tile-size`));
    const thickness = parseFloat(properties.get(`--${paintName}-thickness`));
    const color = properties.get(`--${paintName}-color`).toString();
    const xTiles = geom.width / tileSize;
    const yTiles = geom.height / tileSize;
    const leadSize = Math.sqrt(tileSize) / 1.5;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = thickness;

    for (let y = 0; y < yTiles; y++) {
      const yOffset = y * tileSize;

      for (let x = 0; x < xTiles; x++) {
        const xOffset = x * tileSize;

        ctx.beginPath();
        ctx.moveTo(xOffset, yOffset);

        if (Math.random() >= 0.5) {
          ctx.lineTo(xOffset + tileSize, yOffset + tileSize);
        } else {
          ctx.lineTo(xOffset, yOffset + tileSize);
        }

        ctx.stroke();

        if (Math.random() >= 0.66) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(xOffset, yOffset, leadSize, 0, this.fullArc, false);
          ctx.fill();
          ctx.restore();
        }

        ctx.fill();
      }
    }
  }
}

registerPaint(paintName, Circuits);
