import React, { Component } from 'react';
import PropTypes from 'prop-types';

import  './ErrorMsg.less';

export default class Error extends Component {
    render() {
        const { className, children, type } = this.props;
        let icon;
        if (type === "error") {
            icon = require('./images/ico_prompt@2x.png');
        } else {
            icon = require('./images/ico_prompt@2x.png');
        }
        return children === null || children === "" ? null : (
            <div className={`fr-form-error ${className}`}>
                <img src={icon} /> {children}
            </div>
        );
    }
}

Error.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['error', 'warn'])
};

Error.defaultProps = {
    className: "",
    type: 'error'
};
