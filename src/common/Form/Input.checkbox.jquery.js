import Tool, { merged } from 'Common/Tool';
import './Input.checkbox.less';

const defaultOptions = {};
/**
 * 返回checkbox html字符串
 * @param Object opt input标签属性对象
 */
const CheckedCell_htmlStr = (opt) => {
    const options = merged({}, defaultOptions, opt);
    let str = '';
    if (Tool.isNotBlank(options.class)) {
        options.class = `fr-check ${options.class}`;
    }
    for (const key in options) {
        let value = '', is_key = true;
        if (Tool.isNotBlank(options[key])) {
            if (Tool.type(options[key]) === 'string') {
                value = `="${options[key]}"`;
            } else if (Tool.type(options[key]) === 'boolean' && !options[key]) {
                is_key = false;
            } else if (options[key].toString) {
                value = `="${options[key].toString()}"`;
            } else {
                console.warn("CheckedCell_htmlStr参数传递有问题", error);
                is_key = false;
            }
            str += is_key ? `${key}${value} ` : '';
        }
    }
    return '<label>' +
        `<input type="checkbox" class="fr-check" ${str}>` +
        '<i class="fr-icon-checked"></i>' +
        '</label>'
};

export default CheckedCell_htmlStr;
