const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const utils = require('../utils');
const config = require(utils.rootPath('env.param.config'));
const devWebpackConfig = require('../env/webpack.dev.conf');
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
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;
      console.log(port);
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          notes: [`Create by Broccoli spring( gcx ) <Lensgcx@163.com>: https://github.com/Lensgcx`],
          messages: [
            `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`,
          ],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }));
      resolve(devWebpackConfig);
    }
  })
});
