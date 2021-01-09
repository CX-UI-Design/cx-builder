require('@babel/plugin-transform-modules-commonjs');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const utils = require('../../utils/index');
const config = require('../../config/index');

const hs = require('../hookScript');
const SPA_webpackConfig = require('../../env/SPA/webpack.dev.conf'); // SPA prod config
const MPA_webpackConfig = require('../../env/MPA/webpack.dev.conf'); // MPA prod config

const devMode = config.dev.mode;
let devWebpackConfig = null;

if (['SPA', 'spa'].includes(devMode)) {
  devWebpackConfig = SPA_webpackConfig;
} else if (['MPA', 'mpa'].includes(devMode)) {
  devWebpackConfig = MPA_webpackConfig;
}

//dev编译构建计时开始：初始时间
const devStartTime = process.hrtime.bigint();

//前置钩子 计时开始：初始时间
const hookScriptStartTime = process.hrtime.bigint();

//run pre script
hs.runHookScript('pre');

//前置钩子 计时结束：结束时间
const hookScriptEndTime = process.hrtime.bigint();

//前置钩子 运行时间间隔
const hookScriptTimeInterval = utils.timeIntervalFn(hookScriptStartTime, hookScriptEndTime, 's', 2);

console.log('\n');

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
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            // notes: [`Create by Broccoli spring( gcx ) <Lensgcx@163.com>: https://github.com/Lensgcx`],\
            notes: [`Create by Broccoli spring( gcx )`],
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`,
            ],
          },
          onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,
        })
      );

      //dev编译构建计时结束：结束时间
      const devEndTime = process.hrtime.bigint();
      //dev编译 运行时间间隔
      const devTimeInterval = utils.timeIntervalFn(devStartTime, devEndTime, 's', 2);

      console.log(
        chalk.cyan(
          `  Compile cost ${devTimeInterval} s , Pre hook script run cost ${hookScriptTimeInterval} s . \n`
        )
      );

      resolve(devWebpackConfig);
    }
  });
});
