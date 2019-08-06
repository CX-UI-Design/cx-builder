#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

WORKDIR=$(dirname $0)
echo ${WORKDIR}

source ${WORKDIR}'/sh/command.sh'

# tools menu
# type = tools => 则主菜单为工具菜单
# type = root => 则主菜单为root主菜单，且包含工具二级菜单，二级菜单可调回root主菜单
function Menu_tools {
    clear
    if [ $TYPE = "tools" ]
       then
       #封面
       coverposter
    fi
    echo -e "\t === Tools menu for Frontend Project=== \n"
    echo -e "\t1. Prerelease publish"
    echo -e "\t2. Latest publish"
    echo -e "\t3. Reload node_modules"
    echo -e "\t4. Update all ns package"

    if [ $TYPE = "sub-tools" ]
    then
      echo -e "\t0. Back to main-menu \n\n"
    else
      echo -e "\t0. Exit program \n\n"
    fi

    echo -en "\t\tEnter option: "
    read -n 1 Menu_tools_Option
}

# tools command case fn
function Menu_tools_command {
      case "$Menu_tools_opt"  in
          #back to main menu
          0)
           if [ $TYPE = "sub-tools" ]
             then
              TYPE=$ENTRYTYPE
              startMenu
              break
           else
            break
           fi;;
          1)
            Fn_prerelease_publish
            break ;;
          2)
            Fn_latest_publish
            break ;;
          3)
            Fn_update_node_modules ;;
          4)
            Fn_update_all ;;
          *)

          clear
          echo "Sorry, wrong selection";;
      esac
}


