/**
 * 动态依赖第三方模块/src/lib/fixed-data-table-2
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tool, { merged } from 'Common/Tool';

import './NormalCell.less';

class NormalCell extends Component {
    constructor(props) {
        super(props);
        this.state = { Cell: null };
    }
    componentWillMount() {
        const _this = this;
        import('lib/fixed-data-table-2').then(FDT => {
            // 没必要加载样式
            // 加载组件
            const { Cell } = FDT;
            _this.setState({ Cell });
        });
    }
    render() {
        const { Cell } = this.state;
        const { className = '', height, width } = this.props;
        const cellProps = { height, width };
        // title获取优先规则 title -> this.props.children[String] -> 无
        const { title: _title = null } = this.props;
        let title;
        if (Tool.type(this.props.children) === 'string') {
            title = this.props.children;
        }
        if (_title !== null) {
            title = _title;
        }
        const { color, fontSize, fontWeight, style = {} } = this.props;
        const customStyle = merged(style, { color, fontSize, fontWeight });
        return Cell === null ? null : (
            <Cell {...cellProps} title={title}
                className={`fdt-normal_cell${this.props.nowrap ? ' nowrap ' : ' '}${className}`}
                style={customStyle}
            >{this.props.children}</Cell>
        )
    }
}
NormalCell.propTypes = {
    // cellProps
    className: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    // customProps
    nowrap: PropTypes.bool,
    title: PropTypes.string, // 如果不传递默认取children[必须为String]
    color: PropTypes.string,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    style: PropTypes.object,
};
NormalCell.defaultProps = {
    nowrap: false
};

export default NormalCell;
