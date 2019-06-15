/* eslint-env node */

// Built-ins
import path from "path";

// webpack-specific
import AssetsWebpackPlugin from "assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const mode = process.env.NODE_ENV === "production" ? "production" : "development";
export const src = (...args) => path.resolve(process.cwd(), "src", ...args);
export const dist = (...args) => path.resolve(process.cwd(), "dist", ...args);
export const isProd = mode === "production";

export const commonConfig = {
  mode,
  devtool: isProd ? "hidden-source-map" : "source-map",
  stats: {
    exclude: /\.map$/i,
    excludeAssets: /\.map$/i,
    excludeModules: /\.map$/i,
    builtAt: false,
    children: false,
    modules: false
  },
};

export const commonClientConfig = {
  entry: {
    home: src("client", "routes", "home.js")
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/i,
          chunks: "all"
        },
        commons: {
          name: "commons",
          chunks: "initial"
        }
      }
    }
  },
  plugins: [
    new AssetsWebpackPlugin({
      filename: "assets.json",
      path: dist("server"),
      update: true
    }),
    new MiniCssExtractPlugin({
      filename: `css/${isProd ? "[name].[contenthash:8].css" : "[name].css"}`,
      chunkFilename: `css/${isProd ? "[name].[contenthash:8].css" : "[name].css"}`
    })
  ],
  resolve: {
    alias: {
      "Components": src("client", "components")
    }
  },
  ...commonConfig
};

export const commonClientLoaders = [
  {
    test: /\.(c|le)ss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      "postcss-loader",
      "less-loader"
    ]
  }
];
