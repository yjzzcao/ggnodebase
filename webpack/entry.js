const glob = require('glob');
const path = require('path');
const fs = require('fs');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const js_path = './src/**/*.{js,jsx}';

const getEntry = () => {
    const files = glob.sync(js_path),
        entries = {};

    // 自定义页面打包模块
    files.forEach(function(filepath) {
        const file = path.parse(filepath);
        const htmlFile = path.resolve(file.dir, file.name + '.ejs');

        // if has same name template file, it is a entry
        if (fs.existsSync(htmlFile)) {
            const name = path.relative('./src', file.dir);
            const key = './' + path.join(file.dir, file.name);
            entries[name] = key;
            // entries[name] = [path.resolve(filepath), hotMiddlewareScript];
        }
    });

    // 系统框架打包模块
    entries.vendors = ['./src/common/Tool', './src/common/DataService'];
    entries['lib/react'] = ['react', 'react-dom', 'redux', 'react-redux'];
    entries['lib/jquery'] = ['./src/lib/jquery'];
    entries['lib/bootstrap'] = ['./src/lib/bootstrap'];

    return entries;
}

module.exports = getEntry;
