import React, { Component } from 'react'
import PropTypes from 'prop-types';
import $ from 'jQuery';

import Tool from 'Common/Tool';

const headerHeight = 44;
const rowHeight = 35;
const scrollHeight = 20;
export { headerHeight, rowHeight, scrollHeight };

class GGPinGrid extends Component {
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
            <div ref={e => this.table = e} style={{ height: this.props.height }}></div>
        );
    }
    componentDidMount() {
        this.$table = $(this.table);
    }
    shouldComponentUpdate(np, ns) {
        const { is_load } = this.state;
        if (is_load !== ns.is_load && ns.is_load && this.$table !== null) {
            this.renderThead(1);
            this.renderTbody(1);
        }
        return false;
    }
    /**
     * @param    {Number}   is_load 是否重新渲染表头,默认渲染，当GGgrid加载失败时不渲染
     */
    renderThead(is_load = 0) {
        if (!is_load && !this.state.is_load) return;
        const { getHead, pinHead } = this.props;
        getHead && getHead(this.$table);
        this.props.renderHeaderCallback && this.props.renderHeaderCallback(this.$table);
        if (pinHead !== null) {
            this.$table.ggPinGrid('pinHead', pinHead);
        }
    }
    /**
     * @param    {Number}   is_load 是否重新渲染表身，默认渲染，当GGgrid加载失败时不渲染
     */
    renderTbody(is_load = 0) {
        if (!is_load && !this.state.is_load) return;
        const { getBody } = this.props;
        getBody && getBody(this.$table);
        this.props.renderBodyCallback && this.props.renderBodyCallback(this.$table);
        this.$table.ggPinGrid('resize');
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
        this.$table.ggPinGrid(...arguments);
    }
    handleError() {
        console.error(...arguments);
    }
}

GGPinGrid.propTypes = {
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['auto']),
    ]),
    getHead: PropTypes.func.isRequired,
    getBody: PropTypes.func.isRequired,
    pinHead: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.objectOf(null),
    ]),
    renderCallback: PropTypes.func,
    renderHeaderCallback: PropTypes.func,
    renderBodyCallback: PropTypes.func,
};
GGPinGrid.defaultProps = {
    height: 'auto',
    pinHead: null
};

export default GGPinGrid;
