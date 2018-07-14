/**
 * 使用文档：http://schrodinger.github.io/fixed-data-table-2/
 * 第三方组件带样式引入
 * 直接从node_modules中引入没有样式
 */
import * as FDT from 'fixed-data-table-2/dist/fixed-data-table';
import 'fixed-data-table-2/dist/fixed-data-table.css';
// 覆盖样式
import './index.less';

// 必须使用module.exports导出，使用export default会报错;
module.exports = FDT;
