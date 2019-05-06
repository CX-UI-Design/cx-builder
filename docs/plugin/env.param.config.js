"use strict";


const path = require("path");

module.exports = {
  plugin: {
    // entry config
    entry: "./src/index.js",

    // Output config
    outputLibrary: "cx-grid",//output file/Library name
    libraryTarget: "umd",
    filename: "cx-grid.min.js",
    isMinify: true,//是否压缩

    // Paths
    assetsPublicPath: "./", // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsRoot: path.resolve("./dist"),// 编译输出的静态资源路径
    assetsSubDirectory: "static",// 编译输出的二级目录
    staticPath: "./static"//静态文件抽取static所在路径
  },

  base: {

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
