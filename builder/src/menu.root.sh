#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

#path=$(dirname $0)
#cd ./${path}  # go to current path
#source ./sh/command.sh

#base_path='../lib'
base_path='./node_modules/cx-builder/lib'

source ${base_path}'/sh/command.sh'
prefix=''

# menu show
function rootmenu {
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
    echo -e "\t4. Run production plugin"
    echo -e "\t5. Run production analyz"
    echo -e "\t6. Reload node_modules"
    echo -e "\t7. Update all ns package"
    echo -e "\t8. Run lint"
    echo -e "\t9. Run unit test"
    echo -e "\t10. Run e2e test"
    echo -e "\t11. Run test"
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
            Fn_run_prod_plugin
            break ;;
          5)
            NODE_ENV=production npm_config_report=true Fn_run_prod ;;
          6)
           Fn_update_node_modules ;;
          7)
           Fn_update_all ;;
          8)
#            Fn_run_lint
            echo
            echo
            echo "developing..."
            echo
            break ;;
          9)
#            Fn_run_unit_test
            echo
            echo
            echo "developing..."
            echo
            break ;;
          10)
#           Fn_run_e2e
           echo
           echo
           echo "developing..."
           echo
           break ;;
          11)
#           Fn_run_unit_test && Fn_run_e2e
           echo
           echo
           echo "developing..."
           echo
           break ;;
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
          rootmenu
          opt="$menuOption"
          runcommand
          echo -en "\n\n\t\t\tHit any key to continue"
          read -n 1 line
      done
fi