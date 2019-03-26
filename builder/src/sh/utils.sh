#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

update_CX_grid='cx-grid'
update_All_list='cx-grid'

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
