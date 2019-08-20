/**
 * Reinstall node_modules
 */
const path = require("path");
const shell = require("shelljs");
const signale = require("signale");
const reinstall = path.resolve(__dirname, "./reinstall.sh");
const shUtilsPath = path.resolve(__dirname, "../../sh/utils.sh");

shell.exec('clear');

signale.start(`Start to reinstall node_modules...\n`);

shell.exec(`${reinstall} ${shUtilsPath}`);

signale.success(`Reinstall successful...\n`);
