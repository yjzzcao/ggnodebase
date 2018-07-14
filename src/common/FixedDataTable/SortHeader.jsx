/**
 * 动态依赖第三方模块/src/lib/fixed-data-table-2
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tool from 'Common/Tool';

class SortHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { Cell: null };
    }
    componentWillMount() {
        const _this = this;
        import('lib/fixed-data-table-2').then(FDT => {
            // 没必要加载样式
            // 加载组件
            const { Cell } = require('fixed-data-table-2/dist/fixed-data-table');
            _this.setState({ Cell });
        });
    }
    render() {
        const { Cell } = this.state;
        const { height, width } = this.props;
        const cellProps = { height, width };
        // 设置title属性
        const { placeholder: _placeholder } = this.props;
        let placeholder;
        if (Tool.type(_placeholder) !== 'string' && Tool.type(this.props.title) === 'string') {
            placeholder = this.props.title;
        }
        // 设置排序图标
        const { order, order_type, order_name } = this.props;
        let icon;
        if (order !== order_name) {
            icon = require('./images/arrow_glay.png');
        } else if (order_type === 1) {
            icon = require('./images/arrow_up.png');
        } else if (order_type === -1) {
            icon = require('./images/arrow_down.png');
        }
        return Cell === null ? null : (
            <Cell {...cellProps} title={placeholder}>
                <span role="button" onClick={this.props.handleSort}>
                    {this.props.title}
                    {icon ? <img src={icon} width='8' height='11' style={{ marginLeft: '5px' }} /> : null}
                </span>
            </Cell>
        )
    }
}

SortHeader.propTypes = {
    order_name: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    placeholder: PropTypes.string,
    handleSort: PropTypes.func.isRequired,
    order: PropTypes.string,
    order_type: PropTypes.number,
};

export default SortHeader;
