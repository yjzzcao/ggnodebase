import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class TabList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        }
    }
    componentWillMount() {
        this.setState({
            current: this.props.current
        })
    }
    checkTitleIndex(index) {
        return index == this.state.current ? 'active' : '';
    }
    handleClick(index) {
        this.setState({
            current: index
        })
    }
    render() {
        return (
            <div>
                <div className="common-nav">
                    <ul className="clearfix">
                        {
                            React.Children.map(this.props.children, (child, index) => {
                                return (
                                    <li onClick={ this.handleClick.bind(this, index) }
                                        className={ this.checkTitleIndex(index) }
                                    >
                                        <a href={ child.props.url ? child.props.url : 'javascript: void(0);' }>{ child.props.title }</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="nav-content">
                    {
                        React.Children.map(this.props.children, (child, index) => {
                            return index == this.state.current ? child.props.children : null
                        })
                    }
                </div>
            </div>
        )
    }
}

TabList.defaultProps = {
    current: 0,// 默认第一个tab标签
}

TabList.propTypes = {
    current: PropTypes.number,// 默认展示的tab标签，从0开始
}

class Nav extends Component {
    render() {
        return (
            <div></div>
        )
    }
}
Nav.propTypes = {
    title: PropTypes.string.isRequired,//tab名称
    url: PropTypes.string,//是否跳转
}


export { TabList, Nav }
