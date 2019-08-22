/* global registerPaint */

const paintName = "flashy";

class Flashy {
  constructor () {
    this.fullArc = Math.PI * 2;
    this.degToRad = Math.PI / 180;
  }

  static get inputProperties () {
    return [
      `--${paintName}-radius`,
      `--${paintName}-ray-width`,
      `--${paintName}-threshold`,
      `--${paintName}-color`,
      `--${paintName}-top`,
      `--${paintName}-left`,
      `--${paintName}-blend-mode`,
    ];
  }

  paint (ctx, geom, properties) {
    // These are custom properties
    const radius = parseInt(properties.get(`--${paintName}-radius`));
    const rayWidth = parseFloat(properties.get(`--${paintName}-ray-width`));
    const threshold = parseFloat(properties.get(`--${paintName}-threshold`));
    const color = properties.get(`--${paintName}-color`).toString();
    const top = parseFloat(properties.get(`--${paintName}-top`));
    const left = parseFloat(properties.get(`--${paintName}-left`));

    const outerRadius = geom.width > geom.height ? geom.width * 1.5 : geom.height * 1.5;

    ctx.fillStyle = color;

    const x = geom.width * left;
    const y = geom.height * top;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, this.fullArc, false);
    ctx.fill();
    ctx.restore();

    for (let i = 0; i <= 360; i++) {
      if (Math.random() >= threshold) {
        const radiansEdge1 = this.degToRad * (i - rayWidth);
        const radiansEdge2 = this.degToRad * (i + rayWidth);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo((Math.cos(radiansEdge1) * outerRadius), (Math.sin(radiansEdge1) * outerRadius));
        ctx.lineTo((Math.cos(radiansEdge2) * outerRadius), (Math.sin(radiansEdge2) * outerRadius));
        ctx.lineTo(x, y);
        ctx.fill();
      }
    }
  }
}

registerPaint(paintName, Flashy);
