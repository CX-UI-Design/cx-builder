#!/usr/bin/env bash

#build and commit
git tag "V-$1"
git commit -am "["$1"] Upgrade to V-$1"

# publish

#npm info
if [ "$2" = "prerelease" ]
  then
    npm publish --tag beta
else
    npm publish
fi

npm dist-tag ls


#AUTOVER=$(jq .version $1)
#echo $AUTOVER
#cat grep -Po 'version[" :]+\K[^"]+' package.json
