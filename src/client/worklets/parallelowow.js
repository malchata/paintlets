/* global registerPaint */

const paintName = "parallelowow";

class Parallelowow {
  constructor () {
    this.radians = (Math.PI / 180) * 39.375;
  }

  static get inputProperties () {
    return [
      `--${paintName}-tile-width`,
      `--${paintName}-base-color`,
      `--${paintName}-color-step`,
      `--${paintName}-probability`,
      `--${paintName}-stroke-weight`,
    ];
  }

  paint (ctx, geom, properties) {
    const tileWidth = parseInt(properties.get(`--${paintName}-tile-width`));
    const tileHeight = tileWidth * (1 / 4);

    let colors = [
      properties.get(`--${paintName}-base-color`).toString(),
      this.adjustBrightness(properties.get(`--${paintName}-base-color`).toString(), -10),
      this.adjustBrightness(properties.get(`--${paintName}-base-color`).toString(), -30)
    ];

    const colorStep = parseInt(properties.get(`--${paintName}-color-step`));
    const probability = parseFloat(properties.get(`--${paintName}-probability`));
    const strokeWeight = parseFloat(properties.get(`--${paintName}-stroke-weight`));
    const geomTilesY = geom.height / tileHeight;
    const geomTilesX = geom.width / tileWidth;
    const outerRadius = geom.width > geom.height ? geom.width * 2 : geom.height * 2;

    if (strokeWeight > 0) {
      ctx.lineWidth = strokeWeight;
      ctx.strokeStyle = colors[0];
      ctx.lineCap = "butt";
    }

    for (let y = -1; y < geomTilesY; y++) {
      const yOffset = y * tileHeight;

      for (let x = -1; x < (geomTilesX + y); x++) {
        const xOffset = (x * tileWidth) - (y * tileHeight);

        if (Math.random() > probability) {
          // Helpers!
          const upperLeftX = xOffset;
          const upperLeftY = yOffset;
          const upperRightX = xOffset + tileWidth;
          const upperRightY = yOffset;
          const lowerRightX = xOffset + (tileWidth - tileHeight);
          const lowerRightY = yOffset + tileHeight;
          const lowerLeftX = xOffset - tileHeight;
          const lowerLeftY = lowerRightY;

          // 1. Draw shape on the right side of the parallelogram
          ctx.fillStyle = colors[1];
          ctx.beginPath();
          ctx.moveTo(upperRightX, upperRightY);
          ctx.lineTo((Math.cos(this.radians) * outerRadius), (Math.sin(this.radians) * outerRadius));
          ctx.lineTo(lowerRightX, lowerRightY);
          ctx.lineTo(upperRightX, upperRightY);
          ctx.fill();

          if (strokeWeight > 0) {
            ctx.stroke();
          }

          // 2. Draw shape on the lower left side of the parallelogram
          ctx.fillStyle = colors[2];
          ctx.beginPath();
          ctx.moveTo(lowerRightX, lowerRightY);
          ctx.lineTo((Math.cos(this.radians) * outerRadius), (Math.sin(this.radians) * outerRadius));
          ctx.lineTo(lowerLeftX, lowerLeftY);
          ctx.moveTo(lowerLeftX, lowerLeftY);
          ctx.fill();

          if (strokeWeight > 0) {
            ctx.stroke();
          }

          // 3. Draw parallelogram cap
          ctx.fillStyle = colors[0];
          ctx.beginPath();
          ctx.moveTo(upperLeftX, upperLeftY);
          ctx.lineTo(upperRightX, upperRightY);
          ctx.lineTo(lowerRightX, lowerRightY);
          ctx.lineTo(lowerLeftX, lowerLeftY);
          ctx.lineTo(upperLeftX, upperLeftY);
          ctx.fill();

          if (strokeWeight > 0) {
            ctx.stroke();
          }
        }
      }

      // 4. Slightly darken colors for next run.
      colors = colors.map(colorKey => this.adjustBrightness(colorKey, colorStep));
    }
  }

  adjustBrightness (rgbString, amt) {
    rgbString = rgbString.replace(/rgba?\(/g, "").replace(/\)/g, "").replace(/\s/g, "");

    const rgbParts = rgbString.split(",").map(rgbPart => {
      rgbPart = parseInt(rgbPart) + amt;

      if (rgbPart < 0) {
        rgbPart = 0;
      } else if (rgbPart > 255) {
        rgbPart = 255;
      }

      return rgbPart;
    });

    console.log(rgbParts.join(","));

    return `rgb(${rgbParts.join(",")})`;
  }
}

registerPaint(paintName, Parallelowow);
