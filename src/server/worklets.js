export default {
  lines: {
    "tile-size": {
      syntax: "number",
      value: 48.0
    },
    "color": {
      syntax: "color",
      value: "#f0f"
    },
    "weight": {
      syntax: "number",
      value: 1
    },
    "probability": {
      syntax: "number",
      value: 0.2
    },
    "direction": {
      syntax: "integer",
      value: 0
    },
    "crosshatch": {
      syntax: "integer",
      value: 1
    }
  },
  randots: {
    "tile-size": {
      syntax: "integer",
      value: 2
    },
    "fill-color": {
      syntax: "color",
      value: "#7ac7ff"
    },
    "starting-alpha": {
      syntax: "number",
      value: 0.0125
    },
    "alpha-increment": {
      syntax: "number",
      value: 0.00125
    },
    "starting-probability": {
      syntax: "number",
      value: 0.000625
    },
    "probability-increment": {
      syntax: "number",
      value: 0.0025
    }
  },
  circles: {
    "tile-size": {
      syntax: "integer",
      value: 8
    },
    "color": {
      syntax: "color",
      value: "#38dec2"
    },
    "radius-multiplier": {
      syntax: "number",
      value: 2.25
    },
    "blend-mode": {
      syntax: "custom-ident",
      value: "source-over"
    }
  }
};
