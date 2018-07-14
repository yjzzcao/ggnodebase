import React, { Component } from 'react'
import PropTypes from 'prop-types';
import $ from 'jQuery';

import Tool from 'Common/Tool';

const headerHeight = 44;
const rowHeight = 35;
const scrollHeight = 20;
export { headerHeight, rowHeight, scrollHeight };

class GGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_load: false
        };
        this.$table = null;
        this.renderThead = this.renderThead.bind(this);
        this.renderTbody = this.renderTbody.bind(this);
        this.addLoading = this.addLoading.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
        this.method = this.method.bind(this);
    }
    componentWillMount() {
        const _this = this;
        import('lib/gg-grid').then(_ => {
            _this.setState({ is_load: true });
        });
    }
    render() {
        return (
            <div ref="table" className={this.props.className} style={{ height: this.props.height }}></div>
        );
    }
    componentDidMount() {
        this.$table = $(this.refs.table);
    }
    shouldComponentUpdate(np, ns) {
        const { is_load } = this.state;
        if (is_load !== ns.is_load && ns.is_load && this.$table !== null) {
            this.renderThead(1);
            this.renderTbody(1);
            this.props.renderCallback && this.props.renderCallback(this.$table);
        }
        if (np.height !== this.props.height) {
            return true;
        }
        return false;
    }
    /**
     * 渲染表头的方法
     * @param Number is_load 是否需要判断gg-grid是否加载成功 1:不需要 0:需要
     */
    renderThead(is_load = 0) {
        if (!is_load && !this.state.is_load) return;
        const { getHead, pinHead } = this.props;
        getHead && getHead(this.$table);
        this.props.renderHeaderCallback && this.props.renderHeaderCallback(this.$table);
        if (pinHead !== null) {
            this.$table.ggGrid('pinHead', pinHead);
        }
    }
    /**
     * 渲染表身的方法
     * @param Number is_load 是否需要判断gg-grid是否加载成功 1:不需要 0:需要
     */
    renderTbody(is_load = 0) {
        if (!is_load && !this.state.is_load) return;
        const { getBody } = this.props;
        getBody && getBody(this.$table);
        this.props.renderBodyCallback && this.props.renderBodyCallback(this.$table);
        this.$table.ggGrid('resize');
    }
    addLoading() {
        if (this.$table === null) {
            this.handleError("gg-grid模块还没有加载");
            return;
        }
        this.$table.addClass('loadingStyle');
    }
    removeLoading() {
        if (this.$table === null) {
            this.handleError("gg-grid模块还没有加载");
            return;
        }
        this.$table.removeClass('loadingStyle');
    }
    method() {
        if (this.$table === null) {
            this.handleError("gg-grid模块还没有加载");
            return;
        }
        this.$table.ggGrid(...arguments);
    }
    handleError() {
        console.error(...arguments);
    }
}

GGrid.propTypes = {
    className: PropTypes.string,
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['auto']),
    ]),
    getHead: PropTypes.func.isRequired,
    getBody: PropTypes.func,
    pinHead: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.objectOf(null),
    ]),
    renderCallback: PropTypes.func,
    renderHeaderCallback: PropTypes.func,
    renderBodyCallback: PropTypes.func,
};
GGrid.defaultProps = {
    height: 'auto'
};

export default GGrid;
