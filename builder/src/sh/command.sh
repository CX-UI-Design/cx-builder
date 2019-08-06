#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

WORKDIR=$(dirname $0)

min_suffix='' #压缩后缀名

#1、run dev
function Fn_run_dev {
  NODE_ENV=development env_config=dev process_by_sign=dev_env webpack-dev-server --colors --inline --progress --config ${WORKDIR}/run/run.dev${min_suffix}.js
}

#2、run local mock
function Fn_run_local_mock {
  NODE_ENV=development env_config=mock process_by_sign=mock_local_env webpack-dev-server --colors --inline --progress --config ${WORKDIR}/run/run.dev${min_suffix}.js
}

#3、run cloud mock
function Fn_run_cloud_mock {
  NODE_ENV=development env_config=dev process_by_sign=mock_cloud_env webpack-dev-server --colors --inline --progress --config ${WORKDIR}/run/run.dev${min_suffix}.js
}

#4、run build
function Fn_run_prod {
  cross-env NODE_ENV=production env_config=prod process_by_sign=prod_env node ${WORKDIR}/run/prod/run.prod${min_suffix}.js
}

#5、run build plugin
function Fn_run_prod_plugin {
  cross-env NODE_ENV=production env_config=plugin process_by_sign=prod_env node ${WORKDIR}/run/prod/run.prod.plugin${min_suffix}.js
}

#6、run prettier code
function Fn_run_prettier {
  cross-env node ${WORKDIR}/prettier/prettier${min_suffix}.js
}

#7、run lint js code
function Fn_run_lint {
  eslint --ext .js --ext .jsx --ext .ts --ext .tsx --ext .vue src mock
}

#8、run fix js code
function Fn_run_lint_fix {
  eslint --fix --ext .js --ext .jsx --ext .ts --ext .tsx --ext .vue src mock
}

#9、run lint style code
function Fn_run_lint_style {
 stylelint src/**/*.{vue,css,scss,less,sass}
}

#10、run fix style code
function Fn_run_lint_style_fix {
 stylelint src/**/*.{vue,css,scss,less,sass} --fix
}
#11、run npm prerelease publish
function Fn_prerelease_publish {
  node ${WORKDIR}/tools/release/index.js --version_mode prerelease
}
#12、run npm latest publish
function Fn_latest_publish {
 node ${WORKDIR}/tools/release/index.js --version_mode latest
}


##5、run lint
#function Fn_run_lint {
#  eslint --ext .js,.vue src ${WORKDIR}/test/unit ${WORKDIR}/test/e2e/specs
#}
#
##6、run unit test
#function Fn_run_unit_test {
#  cross-env BABEL_ENV=test karma start ${WORKDIR}/test/unit/karma.conf${min_suffix}.js --single-run
#}
#
##7、run e2e test
#function Fn_run_e2e {
#   node ${WORKDIR}/test/e2e/runner${min_suffix}.js
#}
