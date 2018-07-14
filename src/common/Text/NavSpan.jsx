import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tool from 'Common/Tool';

const NavSpan = props => {
    return (
        <span className={props.className}>
            {props.is_real === 0 ? <span style={{ color: '#ff7800', marginRight: '5px', verticalAlign: 'sub' }}>*</span> : null}
            <span style={{ color: Tool.RiseFallColor(Tool.milliFormat(props.nav), 1) }}>{Tool.milliFormat(props.nav)}</span>
        </span>
    );
}

NavSpan.propTypes = {
    className: PropTypes.string,
    nav: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    is_real: PropTypes.oneOf([0, 1])
};

NavSpan.defaultProps = {
    is_real: 1
};

export default NavSpan;
