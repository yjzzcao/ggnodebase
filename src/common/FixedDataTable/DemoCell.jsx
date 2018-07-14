/**
 * 动态依赖第三方模块/src/lib/fixed-data-table-2
 * 组件fixed-data-table-2的cell开发示例
 */
import React, { Component } from 'react';

class MyCell extends Component {
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
        return Cell === null ? null : (
            <Cell {...cellProps}>MyCell</Cell>
        )
    }
}

export default MyCell;
