import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Trigger from 'lib/rc-trigger';
import Tool, { merged } from 'Common/Tool';

import Option from './Select.Option';
export { Option };

import './Select.less';

const DefaultInputElement = props => {
    const { className, width, children, cursor } = props;
    const _props = merged({}, props);
    // Trigger组件会传递一些属性，需要直接继承
    delete _props.className;
    delete _props.width;
    delete _props.children;
    return (
        <div {..._props} className={className} style={{ width }}>
            <div role="button" className="-title" style={{ cursor }}>
                <span className="-option-selected">{children}</span>
                <span className="-icon">
                    <img src={require('./images/ico_u@2x.png')} width={6} height={4} />
                </span>
            </div>
        </div>
    );
}

class Select extends Component {
    constructor(props) {
        super(props);
        const DEFAULTVALUE = '';
        this.type = 'single';
        // 设置默认值，如果没有默认值，单选为""，多选为[]
        const value = props.defaultValue === undefined ? DEFAULTVALUE : props.defaultValue;
        this.state = { open: false, value };

        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.cleanValue = this.cleanValue.bind(this);
    }
    componentWillMount() {
        // 如果props中有value属性，则初始化时state.value为props中的值
        const { value = this.state.value } = this.props;
        this.setState({ value });
    }
    render() {
        const { value, open } = this.state;
        // 拼接className空格
        let { className = "" } = this.props;
        let activeClass = ""; // 判断是否已经选择，已选择需要添加active样式
        let openClass = ""; // 判断是否已经展开下拉，已展开需要添加open样式
        /**
         * value = '' or null 表示没有选中
         * 如果value等于其他值但是没有匹配Option 表示有选中
         */
        if (value !== null && value !== '') {
            activeClass = " active";
        }
        if (open) {
            openClass = " open";
        }
        className = className === "" ? className : ` ${className}`;
        className = `-${this.type}${className}${activeClass}${openClass}`;
        return (
            <Trigger
                popupClassName={`fr-select-trigger ${className}`}
                destroyPopupOnHide={this.props.destroyPopupOnHide}
                zIndex={this.props.zIndex}
                action={this.props.action}
                popupVisible={open}
                popup={this.getOptionsElement.bind(this)}
                popupAlign={this.props.popupAlign}
                onPopupVisibleChange={this.onVisibleChange.bind(this)}
                getPopupContainer={this.props.getPopupContainer}
            >
                {this.getInputElement.bind(this)(className)}
            </Trigger>
        );
    }
    getInputElement(className) {
        const { InputElement = null } = this.props;
        const text = this.getText.bind(this)();
        if (InputElement === null) { // 默认input模板
            return (
                <DefaultInputElement
                    className={`fr-select ${className}`}
                    width={this.props.width}
                    cursor={this.props.children && this.props.children.length === 0 ? 'not-allowed' : 'pointer'}
                >{text}</DefaultInputElement>
            );
        } else { // 自定义input模板 需要属性可以单独传递
            const _props = {};
            _props.className = className;
            _props.type = this.type;
            _props.value = this.state.value;
            _props.text = text;
            return cloneElement(InputElement, _props);
        }
    }
    getText() {
        const { value } = this.state;
        const { children, optionsElement, getText } = this.props;
        let text = null;
        // 自定义下拉模板-获取文本
        if (optionsElement) {
            // optionsElement组件必须有getText(value, type)方法
            // if (this.optionsElement && this.optionsElement.getText) {
            //     text = this.optionsElement.getText(value, this.type);
            //     return Tool.isNotBlank(text) ? text : this.props.placeholder;
            // } else
            if (getText) {
                text = getText(value, this.type);
                return Tool.isNotBlank(text) ? text : this.props.placeholder;
            } else {
                console.error("必须传递getText(value, type)方法并返回处理后的Text文本");
                return this.props.placeholder;
            }
        }
        // 默认下拉模板-获取文本
        if (value === null || value === '') {
            return this.props.placeholder;
        }
        Children.map(children, (option, index) => {
            if (!Tool.isNotBlank(option)) return;
            // TODO: 需要支持对象比较
            // 非对象转换成字符串比较
            if (`${option.props.value}` === `${value}`) {
                if (Tool.type(option.props.children) === 'string') {
                    text = option.props.children;
                } else if (Tool.type(option.props.title) === 'string') {
                    text = option.props.title;
                } else {
                    console.error("Option组件children不为字符串时，需要添加title属性", this);
                    text = '(无)';
                }
            }
        });
        return Tool.isNotBlank(text) ? text : this.props.placeholder;
    }
    getOptionsElement() {
        const { width, children, optionsElement } = this.props;
        if (optionsElement) {
            return cloneElement(optionsElement, {
                className: `fr-select-options ${this.type}`,
                width,
                type: this.type,
                value: this.state.value,
                __handleSingleSelect: this.handleSingleSelect.bind(this)
            });
        } else {
            const style = { minWidth: width };
            return (
                <ul className={`fr-select-options ${this.type}`} style={style} >
                    {
                        Children.map(children, (child, index) => {
                            const { value } = this.state;
                            let __selected = false, __onClick = null, __type = this.type;
                            if (!Tool.isNotBlank(child)) return child;
                            __selected = !!(`${value}` === `${child.props.value}`);
                            __onClick = this.handleSingleSelect.bind(this, child.props.value, child.props.children, index);
                            return cloneElement(child, { __type, __selected, __onClick });
                        })
                    }
                </ul>
            );
        }
    }
    componentWillReceiveProps(nextProps) {
        // 如果props中有value属性，则初始化时state.value为props中的值
        if (nextProps.value !== undefined) {
            this.setState({ value: nextProps.value });
        }
    }
    onVisibleChange(open) {
        const { disable, onVisibleChange } = this.props;
        let result = true;
        if (onVisibleChange) {
            result = onVisibleChange(open);
        }
        if (!disable && result) {
            this.setState({ open });
        }
    }
    handleSingleSelect(_value, _text, index) {
        // 如果props中有value属性，则setState为props中的值
        // 但是回调事件使用选择的值
        const { value } = this.props;
        if (value === undefined) {
            this.setState({ open: false, value: _value });
        } else {
            this.setState({ open: false });
        }
        this.props.onChange && this.props.onChange(_value, _text);
    }
    getValue() {
        return this.state.value;
    }
    setValue(value) {
        this.setState({ value });
    }
    cleanValue() {
        this.setState({ value: '' });
    }
}

Select.propTypes = {
    // inputProps
    disable: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    width: PropTypes.number,
    onChange: PropTypes.func, // void onChange(value, text)
    // triggerProps
    destroyPopupOnHide: PropTypes.bool,
    action: PropTypes.array,
    popupAlign: PropTypes.object,
    zIndex: PropTypes.number,
    onVisibleChange: PropTypes.func, // Bool onVisibleChange(open)
    getPopupContainer: PropTypes.func,
    // 自定义模板props
    InputElement: PropTypes.element, // 自定义input模板组件
    optionsElement: PropTypes.element, // 自定义下拉模板组件 另外还必须传递getText(value, type)方法
};

Select.defaultProps = {
    // inputProps
    disable: false,
    placeholder: "请选择",
    width: 100,
    // triggerProps
    destroyPopupOnHide: true,
    action: ['click'],
    popupAlign: { points: ['tl', 'bl'] },
    zIndex: 10,
    // getPopupContainer: null,
    // 自定义模板props
    InputElement: null,
    optionsElement: null
};

export default Select;
