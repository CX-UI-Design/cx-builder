/**
 * project run build
 */

"use strict";
const SPA_webpackConfig = require("../../env/SPA/webpack.prod.conf"); // SPA prod config
const MPA_webpackConfig = require("../../env/MPA/webpack.prod.conf");// MPA prod config
const runbase = require("./run.base");

const config = require("../../config/index");
const prodMode = config.prod.mode;

if (["SPA", "spa"].includes(prodMode)) {
  runbase(SPA_webpackConfig);
}
else if (["MPA", "mpa"].includes(prodMode)) {
  runbase(MPA_webpackConfig);
}
