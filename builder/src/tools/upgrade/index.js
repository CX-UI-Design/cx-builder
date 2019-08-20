/**
 * upgrade
 */
const path = require("path");
const shell = require("shelljs");
const signale = require("signale");
const config = require(path.resolve("env.param.config"));

const npmUpgradeList = config.tools.npmUpgradeList;

shell.exec("clear");

signale.start(`Start to upgrade....\n`);

if (npmUpgradeList && npmUpgradeList.length) {

  npmUpgradeList.forEach(config => {
    signale.pending(`current upgrade: ${config.module} \n`);
    const upto = config.version ? config.version : config.edition;
    shell.exec(`yarn upgrade ${config.module}@${upto}`);
  });

}
else {
  signale.success(`Upgrade config is empty, so stop Upgrading...\n`);
}

signale.success(`Upgrade successful...\n`);
