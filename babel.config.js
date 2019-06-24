/* eslint-env node */

module.exports = {
  env: {
    production: {
      presets: [
        [
          "@babel/preset-env", {
            targets: {
              node: "current"
            }
          }
        ]
      ]
    },
    development: {
      presets: [
        [
          "@babel/preset-env", {
            targets: {
              node: "current"
            }
          }
        ]
      ]
    },
    clientLegacy: {
      presets: [
        [
          "@babel/preset-env", {
            modules: false,
            loose: true,
            targets: "> 0.25%, IE > 10, Firefox ESR, not dead"
          }
        ],
        [
          "@babel/preset-react", {
            pragma: "h",
            pragmaFrag: "Fragment"
          }
        ]
      ],
      plugins: [
        "@babel/plugin-transform-runtime"
      ]
    },
    clientModern: {
      presets: [
        [
          "@babel/preset-env", {
            modules: false,
            loose: true,
            targets: {
              esmodules: true
            }
          }
        ],
        [
          "@babel/preset-react", {
            pragma: "h",
            pragmaFrag: "Fragment"
          }
        ]
      ]
    },
    server: {
      presets: [
        [
          "@babel/preset-env", {
            modules: false,
            targets: {
              node: "current"
            }
          }
        ],
        [
          "@babel/preset-react", {
            pragma: "h",
            pragmaFrag: "Fragment"
          }
        ]
      ],
      plugins: [
        "@babel/plugin-transform-runtime"
      ]
    }
  }
};
