/**
 * hook script 执行前置 / 后置 钩子脚本
 */
const shell = require("shelljs");
const signale = require("signale");
const utils = require("../utils");


exports.runHookScript = (type) => {
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
