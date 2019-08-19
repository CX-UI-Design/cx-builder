#!/usr/bin/env bash

source $1

rm -rf node_modules
#rm -rf yarn.lock

is_yarn

yarn install
