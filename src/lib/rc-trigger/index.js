/**
 * 使用文档：https://github.com/react-component/trigger
 * 第三方组件带样式引入
 * 直接从node_modules中引入没有样式
 */
import * as Trigger from 'rc-trigger';
import 'rc-trigger/assets/index.css';

// 必须使用module.exports导出，使用export default会报错;
module.exports = Trigger;
