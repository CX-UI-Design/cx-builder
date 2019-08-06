#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

WORKDIR=$(dirname $0)
echo ${WORKDIR}

source ${WORKDIR}'/sh/command.sh'
source ${WORKDIR}'/sh/utils.sh'

source ${WORKDIR}'/sh/menusource/menu-main.sh'
source ${WORKDIR}'/sh/menusource/menu-tools.sh'
source ${WORKDIR}'/sh/menusource/menu-build.sh'
source ${WORKDIR}'/sh/menusource/menu-mock.sh'
source ${WORKDIR}'/sh/menusource/menu-lint.sh'

# start menu
function startMenu {
 while [ 1 ]
      do
      #启动主菜单
      if [ $TYPE = "developer" -o $TYPE = "root" ]
       then

        Menu_main
        Menu_main_opt="$Menu_main_Option"
        Menu_main_command

       #启动工具菜单
       elif [ $TYPE = "tools" -o $TYPE = "sub-tools" ]
        then

        Menu_tools
        Menu_tools_opt="$Menu_tools_Option"
        Menu_tools_command

       #启动Mock二级菜单
       elif [ $TYPE = "sub-mock" ]
        then

        Menu_mock
        Menu_mock_opt="$Menu_mock_Option"
        Menu_mock_command

       #启动Build二级菜单
       elif [ $TYPE = "sub-build" ]
        then

        Menu_build
        Menu_build_opt="$Menu_build_Option"
        Menu_build_command

       #启动Lint二级菜单
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
