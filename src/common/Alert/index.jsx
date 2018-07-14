/**
 * 动态依赖第三方模块/src/lib/layui-layer
 */
import React, { isValidElement, cloneElement } from 'react';
import ReactDom from 'react-dom';
import Tool, { merged } from 'Common/Tool';

const layer = {};

const lazyLoadComponents = function(callback) {
    import('lib/layui-layer').then(_ => {
        if (Tool.type(callback) === 'function') {
            callback();
        }
    });
}

export { lazyLoadComponents };

/**
 * 显示弹框方法
 * @param String method 方法名
 * @param Array options 数组参数
 */
layer.method = (method, options = []) => {
    lazyLoadComponents(() => {
        if (!window.layer) {
            console.error("layer", "还没有加载");
            return null;
        }
        if (Tool.type(window.layer[method]) === 'function') {
            return window.layer[method](...options);
        } else {
            console.error(method, "不是一个方法");
            return null;
        }
    });
}

/**
 * 自定义弹框
 * @param Object opt 配置项
 */
layer.open = (opt) => {
    lazyLoadComponents(() => {
        if (!window.layer) {
            console.error("layer", "还没有加载");
            return null;
        }
        let skin = ['fr-model'];
        if (Tool.type(opt.skin) === 'string') {
            skin = opt.skin.split(' ');
        }
        if (Tool.type(opt.alertType) === 'string') {
            skin.push(`model-type-${opt.alertType}`);
        }
        delete opt.alertType;
        if (Tool.type(opt.className) === 'string') {
            skin = skin.concat(opt.className.split(' '));
        }
        delete opt.className;
        // 设置默认值
        const options = merged({
            skin: skin.join(' '),
            shadeClose: true,
            zIndex: 1000,
            resize: false,
            scrollbar: false
        }, opt);
        let rcContent = null, rcSuccess = null;
        const _success = function (layero, index) {
            this.refs = ReactDom.render(cloneElement(rcContent, {
                index, layero, layer: window.layer
            }), layero.find('.layui-layer-content')[0]);

            // 重新设置布局
            // 带来新的问题，其他弹框都会重新设置布局
            // $(window).trigger('resize');

            if (Tool.type(rcSuccess) === 'function') {
                rcSuccess(layero, index);
            }
        };
        if (isValidElement(options.content)) {
            rcContent = options.content;
            options.content = "";
            rcSuccess = options.success;
            options.success = _success;
        }
        return window.layer.open(options);
    });
};

export default layer;
