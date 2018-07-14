import React, { Component } from 'react';
import './MobilePager.less';

export default class MobilePager extends Component {
    render() {
        let { current, total } = this.props;
        return (
            <div className="mobile-pager">
                <a className={`btn pre${current <= 0 ? " display" : ""}`}
                    onClick={this.handleClick.bind(this, 'pre')}
                >
                    <span className="caret"></span>
                    {
                        // <span>上一页</span>
                    }
                </a>
                <span><em>{current + 1}</em><i>/{total}</i></span>
                <a className={`btn next${current >= total - 1 ? " display" : ""}`}
                    onClick={this.handleClick.bind(this, 'next')}
                >
                    {
                        // <span>下一页</span>
                    }
                    <span className="caret"></span>
                </a>
            </div>
        );
    }
    handleClick(type) {
        let { current, total } = this.props;
        if (type === "pre" && current > 0) {
            this.props.onSkipTo(--current);
        }
        if (type === "next" && current < total - 1) {
            this.props.onSkipTo(++current);
        }
    }
}
