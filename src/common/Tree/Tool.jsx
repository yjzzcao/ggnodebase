import Tool from 'Common/Tool';

const TreeTool = {};

/**
 * 获取第一个类型
 * @param Array data 数据
 * @param String key 键名称
 */
TreeTool.getFirstItem = (data, key = 'id') => {
    if (Tool.type(data) !== 'array') return null;
    const item = data[0];
    if (item[key] !== undefined) { // 返回第一个带id
        return item;
    } else if (item.data && item.data.length > 0) {
        return TreeTool.getFirstItem(item.data, key);
    } else {
        return null;
    }
};

export default TreeTool;
