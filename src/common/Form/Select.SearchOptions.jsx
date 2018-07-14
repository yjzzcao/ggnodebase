/**
 * 带搜索的单选下拉
 * TODO: 受控模式
 * TODO: 多选
 * TODO: 自定义模板
 */
import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import Select, { Option } from './Select';
export { Option };
import DataService from 'Common/DataService';
import Tool, { merged } from 'Common/Tool';

import './Select.SearchOptions.less';

class SearchSelectOptions extends Component {
    render() {
        const { className, width } = this.props;
        const style = { minWidth: width };
        return (
            <ul className={`fr-search_options ${className}`} style={style}>
                <div>
                    <input ref={e => this.keyword = e}
                        type="text" className="form-control"
                        onChange={this.handleKeywordChange.bind(this)}
                    />
                </div>
                {this.renderOptions()}
            </ul>
        );
    }
    renderOptions() {
        const { type, value, renderOptions } = this.props;
        if (renderOptions) {
            const Options = renderOptions();
            return Children.map(Options, (child, index) => {
                let __selected = false, __onClick = null, __type = type;
                if (!Tool.isNotBlank(child)) return child;
                __selected = !!(`${value}` === `${child.props.value}`);
                __onClick = () => this.props.__handleSingleSelect(child.props.value, child.props.children, index, ...arguments);
                return cloneElement(child, { __type, __selected, __onClick });
            });
        } else {
            return null;
        }
    }
    handleKeywordChange() {
        const keyword = this.keyword.value;
        const { handleKeywordChange } = this.props;
        handleKeywordChange && handleKeywordChange(keyword);
    }
}
SearchSelectOptions.propTypes = {
    // SelectProps 由Select组件传递
    className: PropTypes.string,
    width: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    __handleSingleSelect: PropTypes.func, // void __handleSingleSelect(value, text, index)
    // ComponentProps
    handleKeywordChange: PropTypes.func.isRequired, // void handleKeywordChange(keyword)
    renderOptions: PropTypes.func.isRequired, // Array[OptionElement] renderOptions()
};
class SearchSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            text: null,
            data: []
        };
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
    }
    render() {
        const { keyname } = this.props;
        const optionsProps = {
            handleKeywordChange: keyword => this.getData({ [keyname]: keyword }),
            renderOptions: () => this.props.renderOptions(this.state.data)
        };
        return (
            <Select {...this.props}
                value={this.state.value}
                getText={() => this.state.text}
                onChange={this.handleSelectChange.bind(this)}
                optionsElement={<SearchSelectOptions {...optionsProps} />}
                onVisibleChange={this.onVisibleChange.bind(this)}
            />
        )
    }
    getData(params = {}) {
        const _this = this;
        const { apiName, apiParams } = this.props;
        const dataResponse = DataService.get(apiName, merged({}, apiParams, params));
        const callbackNoError = res => {
            const { code, data } = res;
            if (code === 0) {
                _this.setState({ data });
            } else {
                _this.setState({ data: [] });
            }
        };
        const callbackAnyError = res => {
            _this.setState({ data: [] });
        };
        DataService.handleDataResponse({ dataResponse, callbackNoError, callbackAnyError });
        // setTimeout(() => {
        //     if (params.keyword) {
        //         _this.setState({ data: ['广发证券', '银河证券'] });
        //     } else {
        //         _this.setState({ data: ['招商证券', '海通证券', '广发证券', '中泰证券', '银河证券', 'zyyx'] });
        //     }
        // }, 200);
    }
    handleSelectChange(value, text) {
        this.setState({ value, text })
    }
    onVisibleChange(open) {
        open && this.getData()
        return true;
    }
    getValue() {
        const { value, text } = this.state;
        return { value, text };
    }
    setValue(obj) {
        const { value, text } = obj;
        this.setState({ value, text });
    }
}
SearchSelect.propTypes = {
    apiName: PropTypes.string.isRequired,
    apiParams: PropTypes.object.isRequired,
    keyname: PropTypes.string,
    renderOptions: PropTypes.func.isRequired, // Array[OptionElement] renderOptions(data)
};
SearchSelect.defaultProps = {
    keyname: 'keyword'
};

export default SearchSelect;
