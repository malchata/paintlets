/* global registerPaint */

const paintName = "parallelowow";

class Parallelowow {
  constructor () {
    this.radians = (Math.PI / 180) * 45;
  }

  static get inputProperties () {
    return [
      `--${paintName}-tile-width`,
      `--${paintName}-gap`,
      `--${paintName}-base-color`,
      `--${paintName}-color-decrement`,
      `--${paintName}-probability`
    ];
  }

  paint (ctx, geom, properties) {
    const tileWidth = parseInt(properties.get(`--${paintName}-tile-width`));
    const tileHeight = tileWidth * (1 / 4);
    const gap = parseInt(properties.get(`--${paintName}-gap`));

    let colors = {
      baseColor: properties.get(`--${paintName}-base-color`).toString(),
      darkColor: this.darken(properties.get(`--${paintName}-base-color`).toString(), 10),
      darkerColor: this.darken(properties.get(`--${paintName}-base-color`).toString(), 30)
    };

    const colorDecrement = parseInt(properties.get(`--${paintName}-color-decrement`));
    const probability = parseFloat(properties.get(`--${paintName}-probability`));
    const geomTileHeight = geom.height / tileHeight;
    const geomTileWidth = geom.width / tileWidth;
    const outerRadius = geom.width > geom.height ? geom.width * 1.5 : geom.height * 1.5;

    for (let y = -4; y < geomTileHeight; y++) {
      const yOffset = y * tileHeight;

      for (let x = -4; x < geomTileWidth; x++) {
        const xOffset = x * tileWidth;

        if (Math.random() > probability) {
          // Helpers!
          const upperLeftX = xOffset + gap;
          const upperLeftY = yOffset + gap;
          const upperRightX = (xOffset + tileWidth) - gap;
          const upperRightY = yOffset + gap;
          const lowerRightX = (xOffset + (tileWidth - tileHeight)) - gap;
          const lowerRightY = (yOffset + tileHeight) - gap;
          const lowerLeftX = (xOffset - tileHeight) + gap;
          const lowerLeftY = (yOffset + tileHeight) - gap;

          // 1. Draw shape on the right side of the parallelogram
          ctx.fillStyle = colors.darkColor;
          ctx.beginPath();
          ctx.moveTo(upperRightX, upperRightY);
          ctx.lineTo((Math.cos(this.radians) * outerRadius), (Math.sin(this.radians) * outerRadius));
          ctx.lineTo(lowerRightX, lowerRightY);
          ctx.lineTo(upperRightX, upperRightY);
          ctx.fill();

          // 2. Draw shape on the lower left side of the parallelogram
          ctx.fillStyle = colors.darkerColor;
          ctx.beginPath();
          ctx.moveTo(lowerRightX, lowerRightY);
          ctx.lineTo((Math.cos(this.radians) * outerRadius), (Math.sin(this.radians) * outerRadius));
          ctx.lineTo(lowerLeftX, lowerLeftY);
          ctx.moveTo(lowerLeftX, lowerLeftY);
          ctx.fill();

          // 3. Draw parallelogram cap
          ctx.fillStyle = colors.baseColor;
          ctx.beginPath();
          ctx.moveTo(upperLeftX, upperLeftY);
          ctx.lineTo(upperRightX, upperRightY);
          ctx.lineTo(lowerRightX, lowerRightY);
          ctx.lineTo(lowerLeftX, lowerLeftY);
          ctx.lineTo(upperLeftX, upperLeftY);
          ctx.fill();
        }
      }

      // 4. Slightly darken colors for next run.
      Object.keys(colors).forEach(colorKey => {
        colors[colorKey] = this.darken(colors[colorKey], colorDecrement);
      });
    }
  }

  darken (rgbString, amt) {
    rgbString = rgbString.replace(/rgb\(/g, "").replace(/\)/g, "").replace(/\s/g, "");
    let rgbParts = rgbString.split(",");

    for (let i = 0; i < rgbParts.length; i++) {
      rgbParts[i] = rgbParts[i] - amt;

      if (rgbParts[i] < 0) {
        rgbParts[i] = 0;
      }
    }

    return `rgb(${rgbParts[0]}, ${rgbParts[1]}, ${rgbParts[2]})`;
  }
}

registerPaint(paintName, Parallelowow);
