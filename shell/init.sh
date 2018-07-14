#! /bin/bash

npm install
npm list --depth=0
# layui-layer中样式引用的图片文件没办法打包，需要移动到项目内进行引用
rm -rf ./src/common/Alert/layui-layer
cp -rf ./node_modules/layui-layer/dist ./src/lib/layui-layer/dist
