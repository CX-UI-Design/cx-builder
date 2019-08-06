#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

WORKDIR=$(dirname $0)
echo ${WORKDIR}

source ${WORKDIR}'/sh/command.sh'

# build sub menu
function Menu_build {
    clear
    echo -e "\t === build sub menu === \n"
    echo -e "\t1. Run production"
    echo -e "\t2. Run production analyz"

    if [ $ENTRYTYPE = "root" ]
    then
       echo -e "\t3. Run production plugin"
    fi

    echo -e "\t0. Back to main-menu \n\n"
    echo -en "\t\tEnter option: "
    read -n 1 Menu_build_Option
}

# build command case fn
function Menu_build_command {
      case "$Menu_build_opt"  in
          0)
            TYPE=$ENTRYTYPE
            startMenu
            break ;;
          1)
            Fn_run_prod
            break ;;
          2)
            NODE_ENV=production npm_config_report=true Fn_run_prod
            break ;;
          3)
            if [ $TYPE = "root" ]
            then
                Fn_run_prod_plugin
                break
            fi
            clear
            echo "Sorry, wrong selection";;
          *)
          clear
          echo "Sorry, wrong selection";;
      esac
}
