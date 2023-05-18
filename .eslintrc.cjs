/* eslint-disable prettier/prettier */
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],

  parser: "vue-eslint-parser",

  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },

  plugins: ["vue", "@typescript-eslint", "pug"],

  rules: {
    // override/add rules settings here, such as:
    indent: ["error", 2],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "off",
      },
    ],
    
    "vue/html-indent": ["error", 2],
    "vue/require-default-prop": "off",
    "vue/singleline-html-element-content-newline": 0,
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/no-unused-vars": "error",
    "vue/valid-template-root": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
