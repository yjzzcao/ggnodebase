import React, { Component } from 'react';
import { merged } from 'Common/Tool';
import DataService from 'Common/DataService';

/**
 * 模块入口方法
 * 
 * @param {Object} mySeting
 * @returns
 */
const Main = (mySeting) => {
    var seting = {
        id: '',                     // 应用唯一id表示
        type: 'GET',                // 请求类型
        url: '',                    // 请求地址
        data: null,                 // 发送给服务器的数据
        stop: false,                // true拦截请求，false不拦截请求
        component: <div></div>,     // 数据回调给的组件
        success: null,              // callback执行的方法 (res, state, props) => { return state; }
        error: null,                // callback执行的方法 (res, state, props) => { return state; }
        after: null               // callback执行的方法 (state, props) => { return state; }
    };

    /**
     * 覆盖默认设置
     */
    for (let key in mySeting) {
        seting[key] = mySeting[key];
    }

    /**
     * 组件入口
     * 
     * @class Index
     * @extends {Component}
     */
    class Index extends Component {
        constructor(props) {
            super(props);

            /**
             * 初始化状态
             * 
             * @param {Object} props
             */
            this.initState = (props) => {
                var { state } = props;
                var { pathname, search } = window.location;
                this.path = pathname + search;

                if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path) {
                    this.setState(state.path[this.path]);
                } else {
                    var state = merged(state.defaults); // 数据库不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
                    state.path = this.path;
                    this.setState(state);
                }
            }

            /**
             * DOM初始化完成后执行回调
             */
            this.redayDOM = () => {
                let { success, error, after } = this.props.seting;
                let { scrollX, scrollY } = this.state;
                if (this.get) return false; // 已经加载过
                window.scrollTo(scrollX, scrollY); // 设置滚动条位置
                if (this.testStop()) return false; // 请求被拦截

                let dataResponse = DataService.get(this.getUrl(), this.getData());
                let callbackNoError = (res) => {
                    let _state = merged(this.state);
                    var _props = merged(this.props);
                    _state.loadStatus = 1;
                    _state.loadMsg = '加载成功';
                    typeof success === "function" ? (_state = success(res, _state, _props)) : null;
                    this.props._setState(_state);
                };
                let callbackAnyError = (res) => {
                    let _state = merged(this.state);
                    var _props = merged(this.props);
                    _state.loadStatus = -1;
                    _state.loadMsg = '加载失败';
                    typeof error === "function" ? (_state = error(res, _state, _props)) : null;
                    this.props._setState(_state);
                };
                let afterRespons = () => {
                    if (typeof after === "function") {
                        let _state = merged(this.state);
                        var _props = merged(this.props);
                        _state = after(_state, _props);
                        this.props._setState(_state);
                    }
                };
                this.get = DataService.handleDataResponse({
                    dataResponse,
                    callbackNoError, 
                    callbackAnyError,
                    afterRespons
                });
            }

            /**
             * 组件卸载前执行一些操作
             */
            this.unmount = () => {
                if (typeof this.get !== 'undefined') {
                    this.get.abort && this.get.abort();
                    delete this.get;
                    // delete this.action;
                }
                this.state.scrollX = window.scrollX; //记录滚动条位置
                this.state.scrollY = window.scrollY;
                this.props._setState(this.state);
            }

            /**
             * 获取ajax 请求url
             * 
             * @returns Object
             */
            this.getUrl = () => {
                var { url } = this.props.seting;
                if (typeof url === 'function') {
                    return url(this.props, this.state);
                } else if (url && typeof url === 'string') {
                    return url;
                } else {
                    return this.props.location.pathname;
                }
            }

            /**
             * 获取要发送的数据
             * 
             * @returns
             */
            this.getData = () => {
                var { data } = this.props.seting;
                if (data === undefined || data === null) {
                    return {};
                } else if (typeof data === 'function') {
                    return data(this.state, this.props);
                } else {
                    return data;
                }
            }

            /**
             * 是否要拦截请求
             * 
             * @returns
             */
            this.testStop = () => {
                var { stop } = this.props.seting;
                var result = stop;
                if (typeof stop === 'function') {
                    result = stop(this.props, this.state);
                }
                if (result) { // 如果禁止请求需要this.get修改为true,假装已经请求过了
                    this.get = true;
                }
                return result;
            }
        }
        componentWillMount() {
            this.initState(this.props);
        }
        render() {
            return <this.props.seting.component {...this.props} state={this.state} />;
        }
        /**
         * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
         * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
         * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
         */
        componentDidMount() {
            this.redayDOM();
        }
        /**
         * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
         */
        componentWillReceiveProps(np) {
            var { pathname, search } = window.location;
            var path = pathname + search;
            if (this.path !== path) {
                this.unmount(); // 地址栏已经发生改变，做一些卸载前的处理
            }
            this.initState(np);
        }
        /**
         * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
         * 使用该方法可以在组件更新之后操作 DOM 元素。
         */
        componentDidUpdate() {
            this.redayDOM();
        }
        /**
         * 在组件从 DOM 中移除的时候立刻被调用。
         * 在该方法中执行任何必要的清理，比如无效的定时器，
         * 或者清除在 componentDidMount 中创建的 DOM 元素
         */
        componentWillUnmount() {
            this.unmount(); // 地址栏已经发生改变，做一些卸载前的处理
        }
    }
    Index.defaultProps = { seting }

    return Index;
}

export default Main;
