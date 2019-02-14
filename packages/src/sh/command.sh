#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

#base_path='../lib' #基础路径
base_path='node_modules/cx-builder/lib' #基础路径

min_suffix='' #压缩后缀名

update_CX_grid='cx-grid'
#update_All_list='cx-grid|bootstrap'
update_All_list='cx-grid'

#1、run dev
function Fn_run_dev {
  NODE_ENV=development env_config=dev webpack-dev-server --colors --inline --progress --config ${base_path}/run/run.dev${min_suffix}.js
}

#2、run mock
function Fn_run_mock {
  NODE_ENV=development env_config=mock webpack-dev-server --colors --inline --progress --config ${base_path}/run/run.dev${min_suffix}.js
}

#3、run build
function Fn_run_prod {
  cross-env NODE_ENV=production env_config=prod node ${base_path}/run/run.build${min_suffix}.js
}

##5、run lint
#function Fn_run_lint {
#  eslint --ext .js,.vue src ${base_path}/test/unit ${base_path}/test/e2e/specs
#}
#
##6、run unit test
#function Fn_run_unit_test {
#  cross-env BABEL_ENV=test karma start ${base_path}/test/unit/karma.conf${min_suffix}.js --single-run
#}
#
##7、run e2e test
#function Fn_run_e2e {
#   node ${base_path}/test/e2e/runner${min_suffix}.js
#}



#9、update node_modules
function Fn_update_node_modules {
      clear
      echo '========================== *** Update start *** =========================='
      echo
      echo "Start time : `date +%Y-%m-%d,%H:%m:%s`"
      echo

      rm -rf node_modules
      #cnpm i

      is_yarn
      yarn install

      df -h

      echo
      echo "End time : `date +%Y-%m-%d,%H:%m:%s`"
      echo
      echo '========================== *** Update successful *** =========================='
}

#10、update all plugins
function Fn_update_all {
    clear
    Fn_update_base ${update_All_list}
}


function is_cnpm {
 cnpm -v
    if [ $? -eq 0 ];
    then
        echo cnpm exists
    else
        echo 'Your connection to the default npm registry seems to be slow. Use https://registry.npm.taobao.org for faster installation'
        echo cnpm is not exists
        npm install -g cnpm --registry=https://registry.npm.taobao.org
    fi
}

function is_yarn {
  yarn -v
  if [ $? -eq 0 ];
  then
       echo tarn exists
  else
       echo 'Your connection to the default npm registry seems to be slow. Use yarn please'
       echo  yarn is not exists
       is_cnpm
       cnpm install -g yarn
  fi
}


function Fn_update_base {
    clear
    echo '========================== *** Update start *** =========================='
    echo
    echo "Start time : `date +%Y-%m-%d,%H:%m:%s`"
    echo

    is_cnpm

    cnpm install -g npm-check-updates

    rm -rf node_modules
    ncu '/^'"$1"'.*$/' -u
    cnpm i

    echo
    echo "End time : `date +%Y-%m-%d,%H:%m:%s`"
    echo
    echo '========================== *** Update successful *** =========================='
}


function Fn_update_CX_grid {
    clear
    Fn_update_base ${update_CX_grid}
}
