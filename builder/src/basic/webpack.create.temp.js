/**
 * html-webpack-plugin config
 * creat for MPA project html template
 */
const utils = require("../utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = require("../config");

const entries = utils.getEntries("./src/views/**/App.vue"); // 获得入口hmtl文件

const webpackTempConf = {
  plugins: []
};


for (let pathname in entries) {
  let filename = pathname.replace(/views\//, "");
  console.log(pathname);
  let conf = {
    //webpack 默认dist下根目录 index.hbs 为入口文件，除非特别指定
    template: config.prod.templateSPA,
    filename: `${filename}/index.html`,
    favicon: config.prod.favicon,
    title: `${filename}`,
    description: `${filename}`,
    chunks: ["manifest", "vendor", pathname],
    inject: true,
    inlineSource: ".(js|css)$",
    hash: true, //开启hash  ?[hash]

    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: "dependency",//'dependency' - 按照不同文件的依赖关系来排序, 'manual' - 手动排序

    minify: process.env.NODE_ENV === "development" ? false : {
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //折叠空白区域 也就是压缩代码
      removeAttributeQuotes: true //去除属性引用
    },

    templateParameters: {
      BASE_URL: config.prod.assetsPublicPath + config.prod.assetsSubDirectory
    }
  };

  webpackTempConf.plugins.push(new HtmlWebpackPlugin(conf));

}

module.exports = webpackTempConf;
