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
export const assetsPluginInstance = new AssetsWebpackPlugin({
  filename: "assets.json",
  path: dist("server"),
  update: true,
  fileTypes: ["mjs", "js", "jpg"]
});

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
  plugins: [
    assetsPluginInstance,
    new MiniCssExtractPlugin({
      filename: `css/${isProd ? "[name].[contenthash:8].css" : "[name].css"}`,
      chunkFilename: `css/${isProd ? "[name].[contenthash:8].css" : "[name].css"}`
    })
  ],
  resolve: {
    alias: {
      "Components": src("client", "components"),
      "Styles": src("client", "styles")
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
