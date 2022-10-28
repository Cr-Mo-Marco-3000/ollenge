module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", require("os").EOL === "\r\n" ? "windows" : "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
  },
  settings: {
    react: { version: "detect" },
  },
}
