'use strict';
require('../../utils/check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const config = require('../../config/index');
const utils = require('../../utils');
const hs = require('../hookScript');

module.exports = profConf => {
  //构建计时开始：初始时间
  const prodStartTime = process.hrtime.bigint();

  //前置钩子 计时开始：初始时间
  const hookScriptStartTime = process.hrtime.bigint();

  //run pre script
  hs.runHookScript('pre');

  //前置钩子 计时结束：结束时间
  const hookScriptEndTime = process.hrtime.bigint();

  //前置钩子 运行时间间隔
  const hookScriptTimeInterval = utils.timeIntervalFn(
    hookScriptStartTime,
    hookScriptEndTime,
    's',
    2
  );

  // console.log('\n');
  // const spinner = ora('building for production...');
  // spinner.start();

  rm(
    path.join(utils.getPropertyByEnv('assetsRoot'), utils.getPropertyByEnv('assetsSubDirectory')),
    err => {
      if (err) throw err;
      webpack(profConf, (err, stats) => {
        // spinner.stop();

        if (err) throw err;

        //构建下，控制台输出设置
        process.stdout.write(stats.toString(config.prod.statsPrint) + '\n\n');

        if (stats.hasErrors()) {
          console.log(chalk.red('  Build failed with errors.\n'));
          process.exit(1);
        }

        //构建计时结束：结束时间
        const prodEndTime = process.hrtime.bigint();
        //构建 运行时间间隔
        const prodTimeInterval = utils.timeIntervalFn(prodStartTime, prodEndTime, 's', 2);

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(
          chalk.cyan(
            `  Build cost ${prodTimeInterval}s , Pre hook script run cost ${hookScriptTimeInterval}s . \n`
          )
        );

        console.log(
          chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
              "  Opening index.html over file:// won't work.\n"
          )
        );
      });
    }
  );
};
