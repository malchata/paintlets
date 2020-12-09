/* global registerPaint */

const paintName = "chemistreak";

class Chemistreak {
  static get inputProperties () {
    return [
      `--${paintName}-tile-width`,
      `--${paintName}-stroke-weight`,
      `--${paintName}-stroke-color`,
      `--${paintName}-fill-color`,
      `--${paintName}-stroke-probability`,
      `--${paintName}-cap-probability`,
      `--${paintName}-color-step`
    ];
  }

  paint (ctx, geom, properties) {
    const tileWidth = parseInt(properties.get(`--${paintName}-tile-width`));
    const strokeProbability = parseFloat(properties.get(`--${paintName}-stroke-probability`));
    const capProbability = parseFloat(properties.get(`--${paintName}-cap-probability`));
    const tileHeight = tileWidth * (7 / 6);
    const halfTileWidth = tileWidth / 2;
    const heightIncrement = tileHeight * (1 / 7);
    const xTiles = geom.width / tileWidth;
    const yTiles = geom.height / tileHeight;
    const strokeWeight = parseFloat(properties.get(`--${paintName}-stroke-weight`));
    const colorStep = parseInt(properties.get(`--${paintName}-color-step`));

    // These need to adjust on every pass, so no const here
    let strokeColor = properties.get(`--${paintName}-stroke-color`).toString().trim();
    let fillColor = properties.get(`--${paintName}-fill-color`).toString().trim();

    ctx.lineWidth = strokeWeight;
    ctx.lineCap = "round";

    for (let y = 0; y < yTiles; y++) {
      const yOffset = y * tileHeight;

      for (let x = 0; x < xTiles; x++) {
        const xOffset = x * tileWidth;
        const xMidTile = xOffset + halfTileWidth;
        const yMidTile = yOffset + (heightIncrement * 4);
        const xFullTile = xOffset + tileWidth;
        const midTop = yOffset + (heightIncrement * 2);
        const midBottom = yOffset + (heightIncrement * 5);
        const coords = [
          [xMidTile , yOffset             ],  // Top middle
          [xFullTile, midTop              ],  // Right top
          [xFullTile, midBottom           ],  // Right bottom
          [xMidTile , yOffset + tileHeight],  // Bottom middle
          [xOffset  , midBottom           ],  // Left bottom
          [xOffset  , midTop              ]   // Left top
        ];
        const randoms = [
          Math.random() >= strokeProbability,
          Math.random() >= strokeProbability,
          Math.random() >= strokeProbability,
          Math.random() >= strokeProbability,
          Math.random() >= strokeProbability
        ];

        ctx.strokeStyle = strokeColor;

        for (let i = 0; i < coords.length; i++) {
          if (randoms[i]) {
            const coord = i < coords.length - 1 ? coords[i] : coords[4];
            const nextCoord = i < coords.length - 1 ? coords[i + 1] : coords[5];

            ctx.beginPath();
            ctx.moveTo(coord[0], coord[1]);
            ctx.lineTo(nextCoord[0], nextCoord[1]);
            ctx.closePath();
            ctx.stroke();
          }
        }

        if (Math.random() >= capProbability) {
          ctx.strokeStyle = fillColor;
          ctx.fillStyle = fillColor;

          ctx.beginPath();
          ctx.moveTo(coords[0][0], coords[0][1]);
          ctx.lineTo(coords[1][0], coords[1][1]);
          ctx.lineTo(xMidTile, yMidTile);
          ctx.lineTo(coords[5][0], coords[5][1]);
          ctx.lineTo(coords[0][0], coords[0][1]);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        }
      }

      strokeColor = this.adjustBrightness(strokeColor, colorStep);
      fillColor = this.adjustBrightness(fillColor, colorStep);
    }
  }

  adjustBrightness (rgbString, amt) {
    rgbString = rgbString.replace(/rgba?\(/g, "").replace(/\)/g, "").replace(/\s/g, "");

    const rgbParts = rgbString.split(",").map((rgbPart, index) => {
      if (index > 2) {
        return;
      }

      rgbPart = parseInt(rgbPart) + amt;

      if (rgbPart < 0) {
        rgbPart = 0;
      } else if (rgbPart > 255) {
        rgbPart = 255;
      }

      return rgbPart;
    });

    return rgbString.indexOf("rgba") !== -1 ? `rgba(${rgbParts.join(",")})` : `rgb(${rgbParts.join(",")})`;
  }
}

registerPaint(paintName, Chemistreak);
