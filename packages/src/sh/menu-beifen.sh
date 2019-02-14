#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

#path=$(dirname $0)
#cd ./${path}  # go to current path
#source ./sh/command.sh

base_path='./node_modules/cx-vue-webpck-cli/lib'
source ${base_path}'/sh/command.sh'

function menu {
    clear
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
    echo -e "\t\t\t === SASS Frontend operation Menu === \n"
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
    read -n 1 option
}

while [ 1 ]
do
    menu
    case $option in
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
          Fn_run_lint
          break ;;
        6)
          Fn_run_unit_test
          break ;;
        7)
         Fn_run_e2e
         break ;;
        8)
         Fn_run_unit_test && Fn_run_e2e ;;
        9)
         Fn_update_node_modules ;;
        10)
         Fn_update_all ;;
        *)
        clear
        echo "Sorry, wrong selection";;
    esac
    echo -en "\n\n\t\t\tHit any key to continue"
    read -n 1 line
done
