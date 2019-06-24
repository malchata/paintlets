/* global registerPaint */

class Circles {
  constructor () {
    this.fullArc = Math.PI * 2;
  }

  static get inputProperties () {
    return [
      "--circles-tile-size",
      "--circles-colors",
      "--circles-amplitude",
      "--circles-blend-mode"
    ];
  }

  paint (ctx, geom, properties) {
    const tileSize = parseInt(properties.get("--circles-tile-size"));
    const colors = this.convertColorList(properties.get("--circles-colors").toString());
    const amplitude = parseFloat(properties.get("--circles-amplitude"));
    const blendMode = properties.get("--circles-blend-mode").toString();
    const geomTileHeight = geom.height / tileSize;
    const geomTileWidth = geom.width / tileSize;

    if (blendMode !== "source-over") {
      ctx.globalCompositeOperation = blendMode;
    }

    for (let y = 0; y < geomTileHeight; y++) {
      for (let x = 0; x < geomTileWidth; x++) {
        this.drawCircle(ctx, tileSize, amplitude, colors, x, y);
      }
    }
  }

  convertColorList (colors) {
    let colorsArray = colors.split(") ");

    if (colorsArray.length === 1) {
      return colorsArray;
    }

    for (let colorsIndex in colorsArray) {
      colorsArray[colorsIndex] = `${colorsArray[colorsIndex]})`;
      colorsArray[colorsIndex].replace("))", ")");
    }

    return colorsArray;
  }

  getRandomColor (colors) {
    if (colors.length === 1) {
      return colors[0];
    }

    let randomIndex = Math.floor(Math.random() * 10);

    if (randomIndex < 1) {
      randomIndex = 0;
    } else if (randomIndex > colors.length - 1) {
      randomIndex = colors.length - 1;
    }

    return colors[randomIndex];
  }

  drawCircle (ctx, tileSize, amplitude, colors, x, y) {
    const alpha = Math.random() % Math.random();
    const xOffset = x * tileSize;
    const yOffset = y * tileSize;
    const radius = tileSize * Math.random() * amplitude;
    const color = this.getRandomColor(colors);

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
