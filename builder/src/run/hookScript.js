const shell = require('shelljs');
const signale = require('signale');
const utils = require('../utils');

/**
 * run hook script - 执行 前置/后置 钩子脚本
 * @param type
 */
exports.runHookScript = type => {
  const hookscript = utils.getPropertyByEnv(`${type}script`) || [];

  //run pre script
  if (hookscript && hookscript.length) {
    console.log('\n');
    signale.start(`run custom ${type} script ...\n`);
    hookscript.forEach(script => {
      signale.pending(`current script: ${script} \n`);
      shell.exec(`${script}`);
    });
    console.log('\n');
  }
};
