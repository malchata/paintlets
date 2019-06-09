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
            useBuiltIns: "usage",
            corejs: 2,
            targets: "> 0.25%, IE > 10, Firefox ESR, not dead"
          }
        ],
        [
          "@babel/preset-react", {
            pragma: "h"
          }
        ]
      ]
    },
    clientModern: {
      presets: [
        [
          "@babel/preset-env", {
            modules: false,
            targets: {
              esmodules: true
            }
          }
        ],
        [
          "@babel/preset-react", {
            pragma: "h"
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
            pragma: "h"
          }
        ]
      ]
    }
  }
};
