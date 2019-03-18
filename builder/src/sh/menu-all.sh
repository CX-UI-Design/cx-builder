#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

#基础路径
base_path='./node_modules/cx-builder/lib'
#压缩后缀名
min_suffix=''
update_CX_grid='cx-grid'
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

# menu show
function menu {
#    clear
    echo
    echo -e '\t ========== Design by Broccoli spring( gcx ) =========='
    echo
    echo -e '\t\t\t (  ) (@@) ( )  (@)  ()    @@    O     @     O     @
                         (@@@)
                     (    )
                  (@@@@)


                (   )
            ====        ________                ___________
        _D _|  |_______/        \__I_I_____===__|_________|
         |(_)---  |   H\________/ |   |        =|___ ___|      _________________
         /     |  |   H  |  |     |   |         ||_| |_||     _|                \___
        |      |  |   H  |__--------------------| [___] |   =|
        | ________|___H__/__|_____/[][]~\_______|       |   -|
        |/ |   |-----------I_____I [][] []  D   |=======|____|______________________
      __/ =| o |=-~~\  /~~\  /~~\  /~~\ ____Y___________|__|________________________
       |/-=|___|=O=====O=====O=====O   |_____/~\___/          |_D__D__D_|  |_D__D__D
        \_/      \__/  \__/  \__/  \__/      \_/               \_/   \_/    \_/   \
    '
    echo
    echo -e "\t\t\t === NewSee frontend operation menu for SPA VUE-Project=== \n"
    echo -e "\t1. Run development"
    echo -e "\t2. Run mock"
    echo -e "\t3. Run production"
    echo -e "\t4. Run production analyz"
    echo -e "\t5. Run lint"
    echo -e "\t6. Run unit test"
    echo -e "\t7. Run e2e test"
    echo -e "\t8. Run test"
    echo -e "\t9. Reload node_modules"
    echo -e "\t10. Update all ns package"
    echo -e "\t0. Exit program\n\n"
    echo -en "\t\tEnter option: "
    read -n 1 menuOption
}

# command case fn
function runcommand {
      case "$opt"  in
          0)
            break ;;
          1)
            Fn_run_dev
            break ;;
          2)
            Fn_run_mock
            break ;;
          3)
            Fn_run_prod
            break ;;
          4)
            NODE_ENV=production npm_config_report=true Fn_run_prod ;;
          5)
#            Fn_run_lint
            echo
            echo
            echo "developing..."
            echo
            break ;;
          6)
#            Fn_run_unit_test
            echo
            echo
            echo "developing..."
            echo
            break ;;
          7)
#           Fn_run_e2e
           echo
           echo
           echo "developing..."
           echo
           break ;;
          8)
#           Fn_run_unit_test && Fn_run_e2e
           echo
           echo
           echo "developing..."
           echo
           break ;;
          9)
           Fn_update_node_modules ;;
          10)
           Fn_update_all ;;
          *)
          clear
          echo "Sorry, wrong selection";;
      esac
}


# judge parame and assign
if [  -n "$1" ]
   then
    echo
    echo "命令带有参数：$1，直接启动对应服务$1，请稍后..."
    echo
    echo
      opt=${1};
      runcommand
   else
      echo
      echo "命令不带有参数, 启用操作菜单界面，请稍后..."
      echo
      echo
      while [ 1 ]
      do
          menu
          opt="$menuOption"
          runcommand
          echo -en "\n\n\t\t\tHit any key to continue"
          read -n 1 line
      done
fi
