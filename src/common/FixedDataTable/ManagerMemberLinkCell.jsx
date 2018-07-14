import React from 'react';
import Link from 'Common/Link';
import Tool from 'Common/Tool';

/**
 * 生成投顾or经理链接ReactElements
 * @param Array name 经理或者投顾名称数组
 * @param String name 经理或者投顾名称
 * @param Array id 经理或者投顾id数组
 * @param String id 经理或者投顾id
 * @param String type 类型 member/manager 经理or投顾
 */
const renderLinks = (name, id, type) => {
    let url = null;
    if (type === 'member') {
        url = '/find/fundmember/';
    } else if (type === 'manager') {
        url = '/find/fundmanager/';
    }
    const html = [];
    if (Tool.isArray(name) && name.length !== 0) {
        for (let i = 0; i < name.length; i++) {
            const linkElement = (
                <Link key={`link-${i}`}
                    href={id && id[i] ? `${url}${id[i]}` : undefined}
                    title={name[i]}
                >{name[i]}</Link>
            );
            const separatorElement = <span key={`span-${i}`}>、</span>;
            html.push(linkElement);
            if (i !== name.length - 1) { // 不是最后一个添加分隔符
                html.push(separatorElement);
            }
        }
    } else if (Tool.type(name) === 'string') {
        const linkElement = (
            <Link href={id ? `${url}${id[i]}` : undefined}
                title={name}
            >{name}</Link>
        );
        html.push(linkElement);
    } else {
        return '--';
    }

    return html;
};

export { renderLinks };
