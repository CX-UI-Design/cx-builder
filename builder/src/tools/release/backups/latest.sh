#!/usr/bin/env bash

#npm 发布正式版
set -e

echo "Enter latest version: "
read VERSION

echo "Latest $VERSION - are you sure? (y/n)"
read -p -n $REPLY


if [[ $REPLY =~ ^[Yy]$ ]]
  then

    # build
    npm version $VERSION --no-git-tag-version

    # commit
    git tag v$VERSION
    git commit -am "[latest] $VERSION"

    # publish
    npm publish
    echo Latest pubish successful ...
    npm info
    npm dist-tag ls

else
 echo stop to publish ...
fi
