#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

WORKDIR=$(dirname $0)
echo ${WORKDIR}

source ${WORKDIR}'/sh/command.sh'

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
            TYPE=$ENTRYTYPE
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
