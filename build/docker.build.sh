#/bin/bash

read -p "请输入tag?" tag

read -p "确定build tag $tag ? [y/n]" build

if [ $build = "y" ];then
    docker build -f Dockerfile -t xkrfer/pushdeer-node:$tag .
fi
