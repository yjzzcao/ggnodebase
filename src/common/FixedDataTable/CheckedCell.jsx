/**
 * 动态依赖第三方模块/src/lib/fixed-data-table-2
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CheckedCell.less';

class MyCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Cell: null
        };
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
    }
    componentWillMount() {
        const _this = this;
        import('lib/fixed-data-table-2').then(FDT => {
            // 没必要加载样式
            // 加载组件
            const { Cell } = FDT;
            _this.setState({ Cell });
        });
    }
    render() {
        const { Cell } = this.state;
        const { className = '', height, width, checked, disabled, onClick } = this.props;
        const cellProps = { height, width };
        const inputProps = { checked, disabled, onClick };
        return Cell === null ? null : (
            <Cell {...cellProps} className={`fdt-checked_cell ${className}`}>
                <label role="button">
                    <input ref="input" type="checkbox" className="fr-check" {...inputProps} />
                    <i className="fr-icon-checked"></i>
                </label>
            </Cell>
        );
    }
    getValue() {
        const { input } = this.refs;
        if (input) {
            return input.checked;
        } else {
            return null;
        }
    }
    setValue(checked) {
        const { input } = this.refs;
        if (input) {
            input.checked = checked;
        }
    }
}

MyCell.propTypes = {
    // cellProps
    className: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    // inputProps
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default MyCell;
