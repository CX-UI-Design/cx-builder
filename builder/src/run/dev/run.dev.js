require("@babel/plugin-transform-modules-commonjs");

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");

const utils = require("../../utils/index");
const config = require("../../config/index");
const devMode = config.dev.mode;

const SPA_webpackConfig = require("../../env/SPA/webpack.dev.conf"); // SPA prod config
const MPA_webpackConfig = require("../../env/MPA/webpack.dev.conf");// MPA prod config

let devWebpackConfig = null;

if (["SPA", "spa"].includes(devMode)) {
  devWebpackConfig = SPA_webpackConfig;
}
else if (["MPA", "mpa"].includes(devMode)) {
  devWebpackConfig = MPA_webpackConfig;
}

const hs = require("../hookScript");

console.log("\n");

//run pre script
hs.runHookScript("pre");


/**
 * start by Portfinder
 * 确保启动程序时，如果端口被占用时，会通过portfinder来发布新的端口，然后输出运行的host字符串
 * https://npm.taobao.org/package/portfinder
 * https://npm.taobao.org/package/friendly-errors-webpack-plugin
 * @type {Promise<any>}
 */
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {

      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      console.log(port);

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          // notes: [`Create by Broccoli spring( gcx ) <Lensgcx@163.com>: https://github.com/Lensgcx`],\
          notes: [`Create by Broccoli spring( gcx )`],
          messages: [
            `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
          ]
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }));

      resolve(devWebpackConfig);

    }
  });
});
