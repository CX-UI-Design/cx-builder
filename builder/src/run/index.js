const chalk = require('chalk');
const run_dev = require('./dev/run.dev');
const run_build = require('./run.build');

const runenv = process.env.env_config;

console_text(runenv);

module.exports = runenv === 'dev' || runenv === 'mock' ? run_dev : run_build;


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
