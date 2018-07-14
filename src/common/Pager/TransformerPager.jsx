import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomPager from './CustomPager';

import './TransformerPager.less';

class TransformerPager extends Component {
    render() {
        const { rows, total, current } = this.props;
        const CustomPagerProps = { total, current };
        return (
            <div className="transformer-pager">
                <span style={{ marginRight: '10px' }}>每页</span>
                <select ref={e => this.select = e} value={`${rows}`}
                    style={{ marginRight: '3px' }}
                    onChange={this.handleRowsChange.bind(this)}
                >
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <CustomPager {...CustomPagerProps} onSkipTo={this.onCustomSkipTo.bind(this)} skip={1} />
                <span style={{ margin: '0 20px 0 3px' }}>共{this.props.total}页</span>
                <span>到</span>
                <input ref={e => this.input = e}
                    type="text" className="form-control"
                    style={{ margin: '0 5px' }}
                    onChange={this.handleInputChange.bind(this)}
                    onKeyDown={this.handleInputKeyDown.bind(this)}
                />
                <span style={{ marginRight: '10px' }}>页</span>
                <button className="btn" onClick={this.handleEntrySkioTo.bind(this)}>确定</button>
            </div>
        );
    }
    /**
     * 修改每页条数方法
     */
    handleRowsChange() {
        const { value: rows } = this.select;
        const { onSkipTo } = this.props;
        onSkipTo && onSkipTo(0, parseInt(rows));
    }
    /**
     * rc-pager组件onSkipTo回调方法
     * @param Number page 即将需要跳转页面
     */
    onCustomSkipTo(page) {
        const { rows, onSkipTo } = this.props;
        onSkipTo && onSkipTo(page, parseInt(rows));
    }
    /**
     * 页码跳转输入框只能输入数字
     */
    handleInputChange() {
        const { value: page } = this.input;
        if (page.length === 1) {
            this.input.value = page.replace(/[^1-9]/g, '')
        } else {
            this.input.value = page.replace(/\D/g, '')
        }
    }
    /**
     * 页码跳转确定按钮
     */
    handleEntrySkioTo() {
        const { value } = this.input;
        const { rows, total, onSkipTo } = this.props;
        const page = parseInt(value) > total ? total - 1 : parseInt(value) - 1;
        onSkipTo && onSkipTo(page, parseInt(rows));
    }
    /**
     * 页码跳转输入框回车事件
     */
    handleInputKeyDown(e) {
        if (e.keyCode === 13) {
            this.handleEntrySkioTo();
        }
    }
}

TransformerPager.propTypes = {
    rows: PropTypes.oneOf([20, 50, 100]).isRequired,
    total: PropTypes.number,
    current: PropTypes.number, // 从0开始
    onSkipTo: PropTypes.func, // onSkipTo(page, rows) 即将跳转的页面
};

export default TransformerPager;
