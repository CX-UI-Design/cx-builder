#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

WORKDIR=$(dirname $0)
echo ${WORKDIR}

source ${WORKDIR}'/sh/command.sh'

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
            TYPE=$ENTRYTYPE
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
