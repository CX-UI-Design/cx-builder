#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

WORKDIR=$(dirname $0)
echo ${WORKDIR}

source ${WORKDIR}'/sh/command.sh'



# main menu show
function Menu_main {
    clear

    #封面
    coverposter

    echo -e "\t === NewSee frontend operation menu for SPA VUE-Project=== \n"
    echo -e "\t1. Run development"
    echo -e "\t2. Mock Menu"
    echo -e "\t3. Build Menu"
    echo -e "\t4. Lint && prettier Menu"
    echo -e "\t5. Test Menu"

    # root menu
    if [ $TYPE = "root" ]
    then
    echo -e "\t6. Tools Menu"
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
            TYPE="sub-build"
            startMenu
            break ;;
          4)
            TYPE="sub-lint"
            startMenu
            break ;;
           5)
            echo
            echo
            echo "developing..."
            echo
            break ;;
          6)
            if [ $TYPE = "root" ]
            then
                TYPE="sub-tools"
                startMenu
                 break
            fi
            clear
            echo "Sorry, wrong selection";;
          *)
            clear
            echo "Sorry, wrong selection";;
      esac
}

