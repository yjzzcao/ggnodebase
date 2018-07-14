/**
 * 使用文档：https://github.com/react-component/tree
 * 第三方组件带样式引入
 * 直接从node_modules中引入没有样式
 */
import * as Tree from 'rc-tree';
import 'rc-tree/dist/rc-tree.min.css';
// 覆盖样式
import './index.less';

// 必须使用module.exports导出，使用export default会报错;
module.exports = Tree;
