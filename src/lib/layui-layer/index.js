/**
 * 使用文档：http://www.layui.com/doc/modules/layer.html
 * 因为样式有图片依赖，所以layui-layer库文件必须通过`npm run init`命令从node_modules移入到src/common/Alert
 * 第三方组件带样式引入
 * 直接从node_modules中引入没有样式
 */
import * as layer from './dist/layer';
import './dist/theme/default/layer.css';
// 覆盖样式
import './index.less';

// 不需要导出
// module.exports = layer;
