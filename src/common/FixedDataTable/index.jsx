/**
 * 动态依赖第三方模块/src/lib/fixed-data-table-2
 */
import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

import Tool from 'Common/Tool';

const headerHeight = 44;
const rowHeight = 35;
const x_scrollHeight = 17; // 水平滚动轴
const y_scrollHeight = 15; // 垂直滚动轴
const scrollHeight = 20;
export { headerHeight, rowHeight, x_scrollHeight, y_scrollHeight, scrollHeight };

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            Table: null,
            Column: null,
            Cell: null
        }
    }
    componentWillMount() {
        const _this = this;
        import('lib/fixed-data-table-2').then(FDT => {
            // 加载组件
            const { Table, Column, Cell } = FDT;
            _this.setState({ isLoad: true, Table, Column, Cell });
        });
    }
    render() {
        const { isLoad, Table, Column, Cell } = this.state;
        const { DataLoadComponent } = this.props;
        if (Tool.isArray(this.props.children)) {
            return isLoad ? this.props.children.map((child, index) => {
                return child ? cloneElement(child, { key: index, Table, Column, Cell }) : child;
            }) : DataLoadComponent;
        } else {
            return isLoad ? cloneElement(this.props.children, { Table, Column, Cell }) : DataLoadComponent;
        }
    }
}
Index.propTypes = {
    DataLoadComponent: PropTypes.element // 加载中的状态组件
};
Index.defaultProps = {
    DataLoadComponent: null
};

export default Index;
