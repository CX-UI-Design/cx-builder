#Design by Broccoli spring( gcx-高仓雄 ) <Lensgcx@163.com>
#!/usr/bin/env bash

update_CX_grid='cx-grid'
update_All_list='cx-grid'

#9、update node_modules
function Fn_update_node_modules {
      clear
      echo '========================== *** Update start *** =========================='
      echo
      echo "Start time : `date +%Y-%m-%d,%H:%m:%s`"
      echo

      rm -rf node_modules
      #cnpm i

      is_yarn
      yarn install

      df -h

      echo
      echo "End time : `date +%Y-%m-%d,%H:%m:%s`"
      echo
      echo '========================== *** Update successful *** =========================='
}

#10、update all plugins
function Fn_update_all {
    clear
    Fn_update_base ${update_All_list}
}


function is_cnpm {
 cnpm -v
    if [ $? -eq 0 ];
    then
        echo cnpm exists
    else
        echo 'Your connection to the default npm registry seems to be slow. Use https://registry.npm.taobao.org for faster installation'
        echo cnpm is not exists
        npm install -g cnpm --registry=https://registry.npm.taobao.org
    fi
}

function is_yarn {
  yarn -v
  if [ $? -eq 0 ];
  then
       echo tarn exists
  else
       echo 'Your connection to the default npm registry seems to be slow. Use yarn please'
       echo  yarn is not exists
       is_cnpm
       cnpm install -g yarn
  fi
}


function Fn_update_base {
    clear
    echo '========================== *** Update start *** =========================='
    echo
    echo "Start time : `date +%Y-%m-%d,%H:%m:%s`"
    echo

    is_cnpm

    cnpm install -g npm-check-updates

    rm -rf node_modules
    ncu '/^'"$1"'.*$/' -u
    cnpm i

    echo
    echo "End time : `date +%Y-%m-%d,%H:%m:%s`"
    echo
    echo '========================== *** Update successful *** =========================='
}


function Fn_update_CX_grid {
    clear
    Fn_update_base ${update_CX_grid}
}



function coverposter {
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
}
