/* eslint-env node */

const plugins = [];

if (process.env.NODE_ENV === "production") {
  plugins.push(require("cssnano"));
}

module.exports = {
  plugins
};
