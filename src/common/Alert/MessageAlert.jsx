import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Tool, { merged } from 'Common/Tool';

import layer from './index';
import './MessageAlert.less';

const MessageAlertContent = props => {
    const { m, n } = props
    const count = m.length + n.length;
    return (
        <Fragment>
            {
                m && m.map((item, index) => (
                    <p key={`m_${index}`} className={`m${index + 1 === m.length && m.length < count ? ' last-m' : ''}`}>{index === 0 ? <img src={require("./images/warn.png")} /> : null}{item}</p>
                ))
            }
            {
                n && n.map((item, index) => (
                    <p key={`n_${index}`}className="n">{item}</p>
                ))
            }
        </Fragment>
    );
}
MessageAlertContent.propTypes = {
    m: PropTypes.array,
    n: PropTypes.array,
};
MessageAlertContent.defaultProps = {
    m: [],
    n: [],
};
const MessageAlertOptions = (options = {}) => {
    return merged({
        className: "fr_simple_message-alert",
        alertType: 'text',
        content: <div />
    }, options);
}
/**
 * 消息弹框
 * @param Object options 配置项
 * @param String options.title 标题
 * @param Array options.message 主内容
 * @param Array options.note 副内容
 * @param Array options.btn 按钮
 * @param String options.area 宽高
 * @param String options.callback 回调方法 return false禁止关闭
 */
export default (options = {}) => {
    const { message = [], note = [] } = options;
    const content = (
        <MessageAlertContent m={message} n={note} />
    );
    if (!options.area) {
        let height = 76;
        const paddingHeight = 64;
        const marginHeight = 15;
        height = height + paddingHeight + message.length * 19 + note.length * 18;
        height = height + (note.length === 0 ? 0 : marginHeight);
        options.area = ['360px', `${height}px`];
    }
    const callback = options.callback;
    const yes = (index, layero) => {
        let flag = true;
        let _flag = callback && callback(...arguments);
        if (Tool.type(_flag) === 'boolean') {
            flag = _flag;
        }
        flag && layer.method('close', [index]);
    };

    delete options.message;
    delete options.note;
    delete options.callback;

    const defaultOptions = {
        title: '提示',
        btn: ['确定', '取消'],
    };
    layer.open(MessageAlertOptions(merged(defaultOptions, options, { content, yes })))
};
