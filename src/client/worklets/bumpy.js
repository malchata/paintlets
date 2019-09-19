/* global registerPaint */

const paintName = "bumpy";

class Bumpy {
  constructor () {
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
    const geomTileHeight = (geom.height * 2) / tileSize;
    const geomTileWidth = geom.width / tileSize;

    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;

    for (let y = 0; y < geomTileHeight; y++) {
      for (let x = 0; x < geomTileWidth; x++) {
        this.drawStroke(ctx, tileSize, (x * tileSize), (y * (tileSize / 2)), thickness);
      }
    }
  }

  drawStroke (ctx, tileSize, xOffset, yOffset, thickness) {
    const thirdTile = tileSize / 3;
    const quarterTile = tileSize / 4;
    const lineOffset = yOffset - (thickness / 2);

    if (Math.random() >= .5) {
      ctx.beginPath();
      ctx.moveTo(xOffset, lineOffset);
      ctx.lineTo((xOffset + quarterTile), lineOffset);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xOffset + quarterTile, yOffset);

      const cp1x = xOffset + quarterTile;
      const cp1y = (yOffset - thirdTile);
      const cp2x = ((xOffset + tileSize) - quarterTile);
      const cp2y = (yOffset - thirdTile);
      const xDest = ((xOffset + tileSize) - quarterTile);
      const yDest = yOffset;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, xDest, yDest);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(((xOffset + tileSize) - quarterTile), lineOffset);
      ctx.lineTo((xOffset + tileSize), lineOffset);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(xOffset, lineOffset);
      ctx.lineTo((xOffset + tileSize), lineOffset);
      ctx.stroke();
    }
  }
}

registerPaint(paintName, Bumpy);
