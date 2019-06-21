/* eslint-env node */

// webpack-specific
import WebpackNodeExternals from "webpack-node-externals";
import { isProd, src, dist, commonConfig, commonClientConfig, commonClientLoaders } from "./build-helpers";

// webpack configs
module.exports = [
  // Client (legacy)
  {
    name: "client-legacy",
    output: {
      filename: isProd ? "js/[name].[chunkhash:8].js" : "js/[name].js",
      chunkFilename: isProd ? "js/[name].[chunkhash:8].js" : "js/[name].js",
      path: dist("client"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.m?js$/i,
          exclude: /node_modules/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                envName: "clientLegacy"
              }
            }
          ]
        },
        ...commonClientLoaders
      ]
    },
    ...commonClientConfig
  },
  // Client (modern)
  {
    name: "client-modern",
    output: {
      filename: isProd ? "js/[name].[chunkhash:8].mjs" : "js/[name].mjs",
      chunkFilename: isProd ? "js/[name].[chunkhash:8].mjs" : "js/[name].mjs",
      path: dist("client"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.m?js$/i,
          exclude: /node_modules/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                envName: "clientModern"
              }
            }
          ]
        },
        ...commonClientLoaders
      ]
    },
    ...commonClientConfig
  },
  // Server
  {
    target: "node",
    name: "server",
    entry: {
      server: src("server", "index.js")
    },
    output: {
      filename: "index.js",
      path: dist("server")
    },
    module: {
      rules: [
        {
          test: /\.m?js$/i,
          exclude: /node_modules/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                envName: "server"
              }
            }
          ]
        },
        {
          test: /\.(c|le)ss$/i,
          use: "null-loader"
        }
      ]
    },
    resolve: {
      alias: {
        "Components": src("client", "components"),
        "Styles": src("client", "styles"),
        "Helpers": src("server", "helpers")
      }
    },
    externals: [
      WebpackNodeExternals()
    ],
    ...commonConfig
  }
];
