import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { merged } from 'Common/Tool';

// TODO: 兼容IE8 placeholder
export default class AddonInput extends Component {
    render() {
        const { className, style, width, addonText } = this.props;
        const inputProps = merged({}, this.props);
        delete inputProps.className;
        delete inputProps.style;
        delete inputProps.width;
        delete inputProps.addonText;
        return (
            <div className={`input-group ${className}`} style={merged({ width }, style) }>
                <input ref="input" type="text" className="form-control" {...inputProps} />
                <span role="button" className="input-group-addon" onClick={this.handleClick.bind(this)}>{addonText}</span>
            </div>
        );
    }
    handleClick() {
        this.refs.input.focus();
    }
    getValue() {
        return this.refs.input.value;
    }
    setValue(value) {
        this.refs.input.value = value;
    }
}

AddonInput.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.number,
    addonText: PropTypes.string
};

AddonInput.defaultProps = {
    className: '',
    style: {},
    width: 100,
    addonText: '-'
};

export default AddonInput;
