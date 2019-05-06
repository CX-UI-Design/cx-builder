const path = require("path");
module.exports = {
  plugin: {
    // entry config
    entry: "./src/main.js",

    // Output config
    outputLibrary: "plugin",//output file/Library name
    libraryTarget: "umd",
    filename: "[name].min.js",
    isMinify: true,//是否压缩

    // Paths
    assetsPublicPath: "./", // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsRoot: path.resolve("./dist"),// 编译输出的静态资源路径
    assetsSubDirectory: "static",// 编译输出的二级目录
    staticPath: "./static",//静态文件抽取static所在路径


    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true, // 是否开启 gzip
    productionGzipExtensions: ["js", "css"], // 需要使用 gzip 压缩的文件扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    extract: true, //是否需要分离出js中的css代码,然后分别进行打包
    usePostCSS: true, //补全css代码的兼容性前缀
    useEslint: true,
    /** Source Maps */
    prodCssSourceMap: false, // 是否开启 cssSourceMap
    prodJsSourceMap: false, // 是否开启 jsSourceMap
    cacheBusting: true
  }
};