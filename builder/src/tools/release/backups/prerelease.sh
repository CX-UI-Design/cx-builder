#!/usr/bin/env bash

WORKDIR=$(dirname $0)
echo ${WORKDIR}

basepath=$(cd `dirname $0`; pwd)
echo ${basepath}

echo $PATH


#echo '第一个参数是：'
#echo $1
#
# AUTOVER=$(jq .version $1)
# echo 2222222
# echo $AUTOVER

function handleFlow {
    #build and commit
    if [ "$mode" = "auto" ]
       then

        npm version prerelease --no-git-tag-version
        AUTOVER=$(jq .version $1)
        echo $AUTOVER

        git tag "V-$AUTOVER"
        git commit -am "[release] Upgrade to V-$AUTOVER"

       else
         npm version $VER --no-git-tag-version
         git tag "V-$VER"
         git commit -am "[release] Upgrade to V-$VER"

    fi

    # publish
    npm info
    npm publish --tag beta
    echo Releasing pubish successful ...
    npm dist-tag ls
}

set -e
echo "Enter version to releasing publish? (y/n)"
read -p -n $REPLY

if [[ $REPLY =~ ^[Yy]$ ]]
  then

        echo "Enter release version: "
        read VERSION

        VER=$VERSION
        mode='custom'
        handleFlow

else
        mode='auto'
        handleFlow
fi

#cat grep -Po 'version[" :]+\K[^"]+' package.json
