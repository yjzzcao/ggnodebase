/**
 * 动态依赖第三方模块/src/lib/echarts
 */
import React, { Component, cloneElement } from 'react';
import './index.less';

export default class ChartBase extends Component {
    constructor(props) {
        super(props);
        this.state = { echarts: null };
    }
    render() {
        const { echarts } = this.state;
        const { className } = this.props;
        const children = cloneElement(this.props.children, {
            echarts: echarts,
            className: `fr-chart-base${ className ? " " + className : ""}`
        });
        return children;
    }
    componentDidMount() {
        // const _this = this;
        // import('lib/echarts').then(echarts => {
        //     _this.setState({ echarts });
        // });
        require.ensure(['lib/echarts'], ((require) => {
            const echarts = require('lib/echarts').default;
            this.setState({ echarts });
        }).bind(this), 'lib/echarts');
    }
}
