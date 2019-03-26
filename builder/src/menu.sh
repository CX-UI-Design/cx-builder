#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

WORKDIR=$(dirname $0)
echo ${WORKDIR}

source ${WORKDIR}'/sh/menusource.sh'

# judge parame and assign

if [ $1 = "root" ]
   then
   echo
   echo "命令带有参数：$1，切换开发者模式，正在打开 root menu，请稍后..."
   echo
   TYPE="root"
   startMenu
else
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
        TYPE="main"
        startMenu
  fi
fi
