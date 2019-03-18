const chalk = require('chalk');
const run_dev = require('./run.dev');
const run_build = require('./run.build');

var env = process.env.env_config;

console_text(env);

module.exports = env === 'dev' || env === 'mock' ? run_dev : run_build;


/**
 * console text
 * @param type
 */
function console_text(type) {
  const _Map = {
    'dev': 'Dev',
    'mock': 'Mock',
    'prod': 'Build'
  };
  console.log('\n');
  console.log(chalk.blue(
    `  ================      ${_Map[type]} is running...  please wait for a while. ===============`
  ));
  console.log('\n');
}
