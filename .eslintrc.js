module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: [
    "react"
  ],
  rules: {
    indent: [
      "error",
      2
    ],
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^(h|render)$"
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    quotes: [
      "error",
      "double"
    ],
    semi: [
      "error",
      "always"
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  }
};
