const path = require('path');
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");

const env = ['env', {
    targets: {
        browsers: ['last 2 versions', 'IE > 8']
    }
}];

const createRules = function() {
    const rules = [
        { // jq编译
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [env],
                    plugins: ['syntax-dynamic-import', 'dual-import']
                }
            }
        },
        { // react编译
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [env, 'react'],
                    plugins: ['syntax-dynamic-import', 'dual-import']
                }
            }
        },
        { // less编译
            test: /\.less$/,
            use: ExtractCssChunksPlugin.extract({
                fallback: 'style-loader', // 当css没有被提取的loader
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, // 配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                            minimize: true // css压缩
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            })
        },
        { // css编译
            test: /\.css$/,
            use: ExtractCssChunksPlugin.extract({
                fallback: 'style-loader', // 当css没有被提取的loader
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1, // 配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                            minimize: true // css压缩
                        }
                    },
                    'postcss-loader'
                ]
            })
        },
        { // html中的链接编码
            test: /\.ejs$/,
            exclude: /node_modules/,
            use: {
                loader: 'html-loader',
                options: {
                    minimize: false
                }
            }
        },
        { // 字体文件打包&版本号
            test: /\.(eot|woff|svg|ttf|woff2|appcache)(\?|$)/,
            exclude: /node_modules/,
            use: {
                loader: 'file-loader',
                options: {
                    name: pathname => {
                        const file = path.parse(pathname);
                        const base = file.name + '.[hash:5]' + file.ext;
                        // const base = file.name + file.ext;
                        // return path.join(path.relative('./src', file.dir), base);
                        return path.join(path.relative('./src', './src/fonts'), base);
                    }
                }
            }
        },
        { // 图片打包&版本号
            test: /\.(png|jpe?g|gif)$/,
            exclude: /node_modules/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    fallback: 'file-loader',
                    name: pathname => {
                        const file = path.parse(pathname);
                        const base = file.name + '.[hash:5]' + file.ext;
                        // const base = file.name + file.ext;
                        return path.join(path.relative('./src', file.dir), base);
                    }
                }
            }
        }
    ];

    return rules;
}

module.exports = createRules;
