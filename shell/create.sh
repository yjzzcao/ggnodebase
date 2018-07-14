#! /bin/bash

type=$1
pathname=$2
tmpPath="./shell/template/$type"

# 判断是否存在模板
if [ ! -d "$tmpPath" ]; then
    echo "\033[31m $type 模板不存在 \033[0m"
    exit 1
fi

if [ -d "$pathname" ]; then
    echo "\033[31m $pathname 已经存在 \033[0m"
    echo "\033[31m 是否删除后继续创建？(y or n) \033[0m"
    read flag
    if [ ! "$flag" = "y" ]; then
        exit 0
    else
        rm -rf $pathname
    fi
else
    mkdir -p $pathname
    rm -rf $pathname
fi

echo "\033[32m 开始创建 $type 模板 \033[0m"
cp -rf $tmpPath $pathname
exit 0
