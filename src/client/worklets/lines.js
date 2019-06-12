/* global registerPaint */

registerPaint("lines", class LinesPainter {
  constructor() {
  }

  static get inputProperties() {
    return [
      "--lines-tile-size",
      "--lines-color",
      "--lines-weight",
      "--lines-probability",
      "--lines-direction",
      "--lines-crosshatch"
    ];
  }

  paint (ctx, geom, properties) {
    const tileSize = parseFloat(properties.get("--lines-tile-size"));
    const color = properties.get("--lines-color").toString();
    const weight = parseFloat(properties.get("--lines-weight"));
    const probability = parseFloat(properties.get("--lines-probability"));
    const crosshatchProbability = probability + (Math.abs(probability - 1) / 2);
    const direction = !!parseInt(properties.get("--lines-direction"));
    const crosshatch = !!parseInt(properties.get("--lines-crosshatch"));

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
});
