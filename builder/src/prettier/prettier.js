/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  prettier all js and all ts.
 *----------*****--------------
 */

const path = require('path');
const glob = require('glob');
const config = require('../config');
const prettier = require('prettier');
const merge = require('webpack-merge');
const chalk = require('chalk');
const fs = require('fs');
const prettierConfigPath = require.resolve(path.resolve('.prettierrc'));

let didError = false;

let files = [];

try {
  config.base.prettier.files.forEach(path => {
    const f = glob.sync(path, {ignore: ['**/node_modules/**', 'build/**','dist/**']});
    files = files.concat(f);
  });
}
catch (e) {
  console.log(e);
}


if (files.length) {

  console.log(chalk.cyan('\n'));
  console.log(chalk.cyan('  prettier is running...\n'));

  files.forEach(file => {
    const options = prettier.resolveConfig.sync(file, {
      config: prettierConfigPath,
    });
    const fileInfo = prettier.getFileInfo.sync(file);
    if (fileInfo.ignored) {
      return;
    }
    try {
      const input = fs.readFileSync(file, 'utf8');

      const withParserOptions = merge(options, {
        parser: fileInfo.inferredParser
      });

      // const withParserOptions = {
      //   ...options,
      //   parser: fileInfo.inferredParser,
      // };

      const output = prettier.format(input, withParserOptions);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
        console.log(`\x1b[34m ${file} is prettier`);
      }
    } catch (e) {
      didError = true;
    }
  });

  if (didError) {
    process.exit(1);
  }

  console.log('\x1b');

  console.log(chalk.cyan('  prettier success!\n'));
}


