#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

WORKDIR=$(dirname $0)
echo ${WORKDIR}

source ${WORKDIR}'/sh/command.sh'
source ${WORKDIR}'/sh/utils.sh'

# start menu
function startMenu {
 while [ 1 ]
      do
      if [ $TYPE = "developer" -o $TYPE = "root" ]
       then

        Menu_main
        Menu_main_opt="$Menu_main_Option"
        Menu_main_command

      elif [ $TYPE = "sub-mock" ]
        then

        Menu_mock
        Menu_mock_opt="$Menu_mock_Option"
        Menu_mock_command


       elif [ $TYPE = "sub-lint" ]
        then

        Menu_lint
        Menu_lint_opt="$Menu_lint_Option"
        Menu_lint_command

       else
          break
      fi

      echo -en "\n\n\t\t\tHit any key to continue"
      read -n 1 line

      done
}


# main menu show
function Menu_main {
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
    echo -e "\t === NewSee frontend operation menu for SPA VUE-Project=== \n"
    echo -e "\t1. Run development"
    echo -e "\t2. Mock Menu"
    echo -e "\t3. Run production"
    echo -e "\t4. Run production analyz"
    # root menu
    if [ $TYPE = "root" ]
    then
      echo -e "\t5. lint && prettier Menu"
      echo -e "\t6. test Menu"
      echo -e "\t7. Reload node_modules"
      echo -e "\t8. Update all ns package"
      echo -e "\t9. Run production plugin"
    # normal menu
    else
      echo -e "\t5. lint && prettier Menu"
      echo -e "\t6. test Menu"
      echo -e "\t7. Reload node_modules"
    fi
    echo -e "\t0. Exit program\n\n"
    echo -en "\t\tEnter option: "
    read -n 1 Menu_main_Option
}

# command case fn
function Menu_main_command {
      case "$Menu_main_opt"  in
          0)
            break ;;
          1)
            Fn_run_dev
            break ;;
          2)
            TYPE="sub-mock"
            startMenu
            break ;;
          3)
            Fn_run_prod
            break ;;
          4)
            NODE_ENV=production npm_config_report=true Fn_run_prod
            break ;;
          5)
            TYPE="sub-lint"
            startMenu
            break ;;
           6)
            echo
            echo
            echo "developing..."
            echo
            break ;;
          7)
            Fn_update_node_modules ;;
          8)
            Fn_update_all ;;
          9)
            Fn_run_prod_plugin
            break ;;
          *)
            clear
            echo "Sorry, wrong selection";;
      esac
}


#lint sub  menu
function Menu_lint {
    clear
    echo -e "\t === lint && prettier sub menu === \n"
    echo -e "\t1. Run prettier code"
    echo -e "\t2. Run lint all"
    echo -e "\t3. Run fix all"
    echo -e "\t4. Run lint code"
    echo -e "\t5. Run stylelint code"
    echo -e "\t6. Run fix js code"
    echo -e "\t7. Run fix style code"
    echo -e "\t0. Back to main-menu \n\n"
    echo -en "\t\tEnter option: "
    read -n 1 Menu_lint_Option
}

# lint command case fn
function Menu_lint_command {
      case "$Menu_lint_opt"  in
          0)
            TYPE="developer"
            startMenu
            break ;;
          1)
            Fn_run_prettier
            break ;;
          2)
            Fn_run_lint && Fn_run_lint_style
            break ;;
          3)
            Fn_run_lint_fix && Fn_run_lint_style_fix
            break ;;
          4)
            Fn_run_lint
             break ;;
          5)
            Fn_run_lint_style
             break ;;
          6)
           Fn_run_lint_fix
            break ;;
          7)
           Fn_run_lint_style_fix
            break ;;
          *)
          clear
          echo "Sorry, wrong selection";;
      esac
}



# mock sub menu
function Menu_mock {
    clear
    echo -e "\t === mock sub menu === \n"
    echo -e "\t1. Run local mock"
    echo -e "\t2. Run cloud mock"
    echo -e "\t0. Back to main-menu \n\n"
    echo -en "\t\tEnter option: "
    read -n 1 Menu_mock_Option
}

# mock command case fn
function Menu_mock_command {
      case "$Menu_mock_opt"  in
          0)
            TYPE="developer"
            startMenu
            break ;;
          1)
            Fn_run_local_mock
            break ;;
          2)
            Fn_run_cloud_mock
            break ;;
          *)
          clear
          echo "Sorry, wrong selection";;
      esac
}
