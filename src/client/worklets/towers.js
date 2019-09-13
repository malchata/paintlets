/* global registerPaint */

const paintName = "towers";

class Towers {
  constructor () {
    this.radians = (Math.PI / 180) * 45;
  }

  static get inputProperties () {
    return [
      `--${paintName}-tile-size`,
      `--${paintName}-gap`,
      `--${paintName}-color`,
      `--${paintName}-probability`
    ];
  }

  paint (ctx, geom, properties) {
    const tileSize = parseInt(properties.get(`--${paintName}-tile-size`));
    const gap = parseInt(properties.get(`--${paintName}-gap`));
    const color = properties.get(`--${paintName}-color`).toString();
    const darker = this.darkenColor(color, 20);
    const darkest = this.darkenColor(color, 40);
    const probability = parseFloat(properties.get(`--${paintName}-probability`));
    const geomTileHeight = geom.height / tileSize;
    const geomTileWidth = geom.width / tileSize;
    const outerRadius = geom.width > geom.height ? geom.width * 1.5 : geom.height * 1.5;

    for (let y = -4; y < geomTileHeight; y++) {
      const yOffset = y * tileSize;

      for (let x = -4; x < geomTileWidth; x++) {
        const xOffset = x * tileSize;

        if (Math.random() > probability) {
          // 1. Draw shape on the right side of the tower cap
          ctx.fillStyle = darker;                                                                     // Change fill to darker color
          ctx.beginPath();                                                                            // Start new path
          ctx.lineTo(xOffset + tileSize, yOffset + gap);                                              // Move to upper right
          ctx.lineTo((Math.cos(this.radians) * outerRadius), (Math.sin(this.radians) * outerRadius)); // Draw line off canvas
          ctx.lineTo(xOffset + tileSize, yOffset + tileSize);                                         // Draw to lower right
          ctx.lineTo(xOffset + gap, yOffset + tileSize);                                              // Draw line to lower left
          ctx.fill();                                                                                 // Fill shape

          // 2. Draw shape on the right side of the tower cap
          ctx.fillStyle = darkest;                                                                    // Change fill to darkest color
          ctx.beginPath();                                                                            // Start new path
          ctx.moveTo(xOffset + tileSize, yOffset + tileSize);                                         // Move to lower right
          ctx.lineTo(xOffset + gap, yOffset + tileSize);                                              // Draw line to lower left
          ctx.lineTo((Math.cos(this.radians) * outerRadius), (Math.sin(this.radians) * outerRadius)); // Draw line off canvas toward the lower left
          ctx.lineTo(xOffset + tileSize, yOffset + tileSize);                                         // Draw line back to lower right
          ctx.fill();                                                                                 // Fill shape

          // 3. Draw the tower cap
          ctx.fillStyle = color;                                                                      // Change fill to the base color
          ctx.beginPath();                                                                            // Start new path
          ctx.rect(xOffset + gap, yOffset + gap, tileSize - gap, tileSize - gap);                     // Draw a rectangle
          ctx.fill();                                                                                 // Fill shape
        }
      }
    }
  }

  darkenColor (rgbString, amt) {
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

registerPaint(paintName, Towers);
