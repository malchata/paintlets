/* eslint-env node */

const plugins = [
  require("autoprefixer")
];

if (process.env.NODE_ENV === "production") {
  plugins.push(require("cssnano"));
}

module.exports = {
  plugins
};
