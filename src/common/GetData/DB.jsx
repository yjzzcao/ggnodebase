import { merged } from 'Common/Tool';

const DB = (_ID = '', seting = {}) => {
    const cb = {
        setDefaut: () => {
            var defaults = merged({
                path: '',                   // 当前页面的href
                data: null,                 // 页面的数据
                loadStatus: 0,              // 0: 正在加载  1: 加载成功  -1: 加载失败
                loadMsg: '正在玩命加载中',    // 加载提示
                scrollX: 0,                 // 滚动条X
                scrollY: 0                  // 滚动条Y
            }, seting);
            return { defaults, path: {} };
        },
        _setState: (state, target) => {
            state.path[target.path] = target;
            return merged(state);
        }
    }
    return (state = {}, action = {}) => {
        if (action._ID && action._ID !== _ID) {
            return state;
        } else if (cb[action.type]) {
            return cb[action.type](state, action.target);
        } else {
            return cb.setDefaut();
        }
    }
}

export default DB;
