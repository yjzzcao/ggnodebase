const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const FlushCssChunksPlugin = require("flush-css-chunks-webpack-plugin");

const config = require('./webpack/config');
const entry = require('./webpack/entry');
const html = require('./webpack/html');
const rules = require('./webpack/rules');
const swigPlugin = require('./webpack/swig');

// generate rules
let webpackRules = [];
webpackRules = webpackRules.concat(rules());

// generate htmlPlugins
let webpackPlugins = [];
webpackPlugins.push(new CleanWebpackPlugin([ // 清空打包后的目录
    path.join(config.server_dir, config.dist_dir),
    path.join(config.server_dir, config.view_dir)]
));
webpackPlugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendors', 'lib/react', 'lib/jquery', 'lib/bootstrap', 'manifest'],
    minChunks: Infinity
}));
webpackPlugins.push(new ExtractCssChunksPlugin({
    filename: getPath => {
        return getPath('[name].[contenthash:5].css');
    },
    allChunks: true
}));
webpackPlugins.push(new FlushCssChunksPlugin({
    entryOnly: true
}));
webpackPlugins = webpackPlugins.concat(html());
webpackPlugins.push(new swigPlugin());

module.exports = {
    entry: entry(),
    output: {
        path: path.join(__dirname, config.server_dir, config.dist_dir),  // 编译到当前目录
        publicPath: '/' + config.dist_dir + '/',  // 编译好的文件，在服务器的路径
        filename: '[name].[chunkhash:5].js',  // 编译后的文件名字
        chunkFilename: '[name].[chunkhash:5].js'
    },
    module: {
        rules: webpackRules
    },
    // devtool: 'source-map',
    plugins: webpackPlugins,
    resolve: {
        alias: {
            lib: path.resolve(__dirname, 'src/lib/'),
            Common: path.resolve(__dirname, 'src/common/'),
            Themes: path.resolve(__dirname, 'src/themes/'),
            jQuery$: 'lib/jquery'
        },
        extensions: ['.js', '.jsx'] // 后缀名自动补全
    }
};
