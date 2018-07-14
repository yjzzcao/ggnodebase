const glob = require('glob');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');
const entry = require('./entry');

const entrys = entry();

const html_path = './src/**/*.ejs';
const rcExt = '.jsx', jqExt = '.js';

const createHTMLPlugin = () => {
    const files = glob.sync(html_path),
        htmls = [];

    files.forEach(function (filepath) {
        const file = path.parse(filepath),
            chunkName = path.relative('./src', file.dir);
            chunksort = ['manifest', 'lib/jquery', 'lib/react', 'lib/bootstrap', 'vendors'];

        let chunks = [];
         
        // if has same name entry, create a html plugin
        const c = entrys[chunkName];
        c && chunks.push(chunkName);

        const jsFile = path.resolve(file.dir, file.name);
        if (fs.existsSync(jsFile + rcExt)) {
            chunks = chunks.concat(['lib/jquery', 'lib/react'])
        } else if (fs.existsSync(jsFile + jqExt)) {
            chunks = chunks.concat(['lib/jquery'])
        }

        htmls.push(new HtmlWebpackPlugin({
            template: filepath,
            filename: path.join('..', config.view_dir, path.relative('./src', file.dir + file.ext)),
            chunks: chunks.concat(['vendors', 'lib/bootstrap', 'manifest']),
            inject: false,
            chunksSortMode: function (a, b) {
                let aIndex = chunksort.indexOf(a.names[0]);
                let bIndex = chunksort.indexOf(b.names[0]);
                aIndex = aIndex < 0 ? chunksort.length + 1 : aIndex;
                bIndex = bIndex < 0 ? chunksort.length + 1 : bIndex;
                return aIndex - bIndex;
            }
        }));
    });

    return htmls;
}

module.exports = createHTMLPlugin;
