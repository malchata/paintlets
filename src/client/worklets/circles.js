/* global registerPaint */

class Circles {
  constructor() {
    this.fullArc = Math.PI * 2;
  }

  static get inputProperties() {
    return [
      "--circles-tile-size",
      "--circles-color",
      "--circles-radius-multiplier",
      "--circles-blend-mode"
    ];
  }

  paint(ctx, geom, properties) {
    const tileSize = parseInt(properties.get("--circles-tile-size"));
    const color = properties.get("--circles-color").toString();
    const radiusMultiplier = parseFloat(properties.get("--circles-radius-multiplier"));
    const blendMode = properties.get("--circles-blend-mode").toString();
    const geomTileHeight = geom.height / tileSize;
    const geomTileWidth = geom.width / tileSize;

    if (blendMode !== "source-over") {
      ctx.globalCompositeOperation = blendMode;
    }

    for (let y = 0; y < geomTileHeight; y++) {
      for (let x = 0; x < geomTileWidth; x++) {
        this.drawCircle(ctx, tileSize, radiusMultiplier, color, x, y);
      }
    }
  }

  drawCircle(ctx, tileSize, radiusMultiplier, color, x, y) {
    const radius = tileSize * Math.random() * radiusMultiplier;
    const xOffset = x * tileSize;
    const yOffset = y * tileSize;
    const alpha = Math.random() % Math.random();

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(xOffset, yOffset, radius, 0, 2 * this.fullArc, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
}

registerPaint("circles", Circles);
