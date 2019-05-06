#!/usr/bin/env bash

WORKDIR=$(dirname $0)
source ${WORKDIR}'/sh/menusource.sh'

clear
echo
echo ${WORKDIR}

function runByCommandNum {
    if [  -n "$VARNUM" ]
       then
        echo
        echo "命令带有参数："$VARNUM" ，直接启动对应服务 "$VARNUM" ，请稍后..."
        echo

          #定义参数 Menu_main_opt
          Menu_main_opt="$VARNUM"
          #执行函数，选择对应命令执行
          Menu_main_command

    else
          echo
          echo "命令不带有参数, 启用操作菜单界面，请稍后..."
          echo

          startMenu
    fi
}


if [ "$1" = "root" ]
    then
    echo
    echo "正在启动 $1 模式，请稍后..."

    TYPE="root"
    VARNUM=$2
    runByCommandNum

elif [ $1 = "developer" ]
    then
    echo
    echo "正在启动 $1 模式，请稍后..."

    TYPE="developer"
    VARNUM=$2
    runByCommandNum

else
  echo "当前模式：$1 不存在，请重试... "
fi
