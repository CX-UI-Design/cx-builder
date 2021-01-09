"use strict";

module.exports = {
  base: {
    //prettier code - 美化
    prettier: {
      switch: false,
      files: [
        "builder/src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}",
        "docs/MPA/src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}",
        "docs/plugin/src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}",
        "docs/SPA/src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}",
      ]
    }
  },
  tools: {
    publish: {
      prescript: [
        "npm run build"
      ]
    }
  }
};
