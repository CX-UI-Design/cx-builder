#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

WORKDIR=$(dirname $0)
source ${WORKDIR}'/sh/menusource/index.sh'
clear

#根据指令进行分发执行命令
function distributeCommand {
    #mock 模式指令
    if [  $1 == 2 ]
    then
     echo mock
     Menu_mock_opt="$2"   #定义参数
     Menu_mock_command    #执行函数，选择对应命令执行
    #build 模式指令
    elif [  $1 == 3 ]
    then
     echo build
     Menu_build_opt="$2"   #定义参数
     Menu_build_command    #执行函数，选择对应命令执行
    #lint 模式指令
    elif [ $1 == 4 ]
    then
     echo build
     Menu_lint_opt="$2"   #定义参数
     Menu_lint_command    #执行函数，选择对应命令执行
    elif [ $1 == 6 ]
    then
     echo tools
     Menu_tools_opt="$2"   #定义参数
     Menu_tools_command    #执行函数，选择对应命令执行
    #其他一级参数，直接执行
    else
       echo other
       Menu_main_opt="$1"  #定义参数 Menu_main_opt
       Menu_main_command   #执行函数，选择对应命令执行
     return
    fi
}

#根据指令进行执行
function runByCommandNum {
    if [  -n "$VARNUM" ]
       then

       #以下命令参数有二级菜单
       subMenuCommand=(2,3,4,6)

       #判断命令参数 $2 是否对应是有二级菜单的，如有，则需要第三个参数 $3 用于执行命令
       if [[ "${subMenuCommand[@]/$VARNUM/}" != "${subMenuCommand[@]}" ]]
        then
        #判断是否存在三个参数 $3
        if [  -n "$SUBNUM" ]
        then
          echo
          echo "命令带有参数："$VARNUM"-"$SUBNUM" ，直接启动对应服务 "$VARNUM"-"$SUBNUM" ，请稍后..."
          echo
          distributeCommand $VARNUM $SUBNUM
        else
          echo
          echo "启动一级命令："$VARNUM" 时 ，缺少二级命令参数，请重试..."
          echo
          return
        fi

       else
          echo
          echo "命令带有参数："$VARNUM" ，直接启动对应服务 "$VARNUM" ，请稍后..."
          echo
          distributeCommand $VARNUM $SUBNUM
        fi

    else
          echo
          echo "命令不带有参数, 启用操作菜单界面，请稍后..."
          echo
          startMenu
    fi
}

#存储进入的模式，后面菜单需要用到
ENTRYTYPE=$1

if [ "$1" = "root" ]
    then
    echo
    echo "正在启动 $1 模式，请稍后..."

    TYPE="root"
    VARNUM=$2
    SUBNUM=$3
    runByCommandNum

elif [ $1 = "developer" ]
    then
    echo
    echo "正在启动 $1 模式，请稍后..."

    TYPE="developer"
    VARNUM=$2
    SUBNUM=$3
    runByCommandNum

elif [ $1 = "tools" ]
    then
    echo
    echo "正在启动 $1 模式，请稍后..."

    TYPE="tools"
    VARNUM=$2
    SUBNUM=$3
    runByCommandNum

else
    echo "当前模式：$1 不存在，采用默认模式 - developer "

    TYPE="developer"
    VARNUM=$2
    SUBNUM=$3
    runByCommandNum
fi
