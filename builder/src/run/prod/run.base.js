'use strict';
require('../../utils/check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const utils = require('../../utils');
const config = require(utils.rootPath('env.param.config'));

const spinner = ora('building for production...');
spinner.start();

module.exports = (profConf) => {
  rm(path.join(utils.getPropertyByEnv('assetsRoot'), utils.getPropertyByEnv('assetsSubDirectory')), err => {
    if (err) throw err;
    webpack(profConf, (err, stats) => {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'));
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'));
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  });
};