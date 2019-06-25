"use strict";
const path = require("path");

module.exports = {
  dev: {
    port: 8066,
    useEslint: false
  },
  prod: {
    useEslint: false
  },
  base: {
    mixinPalette: {
      switch: false,
      type: "less",
      theme: require(path.resolve("src/assets/css/Theme/normal"))
    },

    alias: {
      "vue$": "vue/dist/vue.esm.js",
      "@": path.resolve("src"),
      "@core": path.resolve("core")
    },
    prettier: {
      switch: true,
      files: [
        "mock/**/*.js",
        ".postcssrc.js",
        "env.config.js",
        "env.param.config.js",
        ".eslintrc.js"
      ]
    }
  }
};
