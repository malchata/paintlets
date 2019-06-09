import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import ignore from "rollup-plugin-ignore";
import entrypointHashManifest from "rollup-plugin-entrypoint-hashmanifest";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import worklets from "./src/server/worklets.js";

const isProd = process.env.NODE_ENV === "production";
const workletEntries = {};

Object.keys(worklets).forEach(workletName => {
  workletEntries[workletName] = `./src/client/worklets/${workletName}.js`;
});

export default [
  // Server
  {
    input: "./src/server/index.js",
    output: {
      file: "dist/server/index.js",
      format: "cjs"
    },
    external: ["fs", "path", "util", ...Object.keys(pkg.dependencies)],
    plugins: [
      babel({
        presets: [
          [
            "@babel/preset-env", {
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
      })
    ]
  },
  // Worklets
  {
    input: workletEntries,
    output: {
      dir: "./dist/client/worklets",
      entryFileNames: "[name].js",
      chunkFileNames: "[name].js",
      format: "esm",
      sourcemap: isProd
    },
    plugins: [
      isProd && terser()
    ]
  },
  // Client (modern)
  {
    input: {
      home: "./src/client/routes/home.js"
    },
    output: {
      dir: "./dist/client/js",
      entryFileNames: isProd ? "[name].[hash].mjs" : "[name].mjs",
      chunkFileNames: isProd ? "[name].[hash].mjs" : "[name].mjs",
      assetFileNames: isProd ? "[name].[hash].[ext]" : "[name].[ext]",
      format: "esm",
      sourcemap: isProd
    },
    plugins: [
      babel({
        presets: [
          [
            "@babel/preset-react", {
              pragma: "h"
            }
          ]
        ]
      }),
      resolve(),
      entrypointHashManifest({
        manifestName: "./dist/server/assets-modern.json"
      }),
      isProd && terser(),
    ]
  },
  // Client (modern)
  {
    input: {
      home: "./src/client/routes/home.js"
    },
    output: {
      dir: "./dist/client/js",
      entryFileNames: isProd ? "[name].[hash].js" : "[name].js",
      chunkFileNames: isProd ? "[name].[hash].js" : "[name].js",
      assetFileNames: isProd ? "[name].[hash].[ext]" : "[name].[ext]",
      format: "esm",
      sourcemap: isProd
    },
    plugins: [
      babel({
        presets: [
          [
            "@babel/preset-env", {
              targets: "> 0.25%, ie > 10, Firefox ESR, not dead",
              corejs: 2,
              useBuiltIns: "usage"
            }
          ],
          [
            "@babel/preset-react", {
              pragma: "h"
            }
          ]
        ]
      }),
      resolve(),
      entrypointHashManifest({
        manifestName: "./dist/server/assets-legacy.json"
      }),
      isProd && terser()
    ]
  }
];
