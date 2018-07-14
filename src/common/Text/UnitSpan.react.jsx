import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tool from 'Common/Tool';

export const UnitSpan = props => {
    const value = Tool.milliFormat(props.value, props.fixed, '', props.zoom, props.isfixed);
    const style = {
        fontSize: props.fontSize
    };
    if (props.baseZero !== null) {
        style.color = Tool.RiseFallColor(value, props.baseZero);
    }
    return (
        <span className={props.className} style={style}>
            <span>{value}</span>
            {value === '--' ? null : <span style={{ fontSize: '0.6667em' }}>{props.unit}</span>}
        </span>
    );
}
UnitSpan.propTypes = {
    className: PropTypes.string,
    fontSize: PropTypes.number,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    fixed: PropTypes.number,
    unit: PropTypes.string,
    zoom: PropTypes.number,
    baseZero: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.objectOf(null),
    ]),
    isfixed: PropTypes.bool
};
UnitSpan.defaultProps = {
    fontSize: 14,
    fixed: 4,
    unit: '',
    zoom: 1,
    baseZero: null,
    isfixed: false
};

const UnitTypeSpan = props => {
    const params = {};
    if (props.type === 'return') { // 百分号+颜色
        params.fixed = 2;
        params.unit = '%';
        params.zoom = 100;
        params.baseZero = 0;
    } else if (props.type === 'sharp') { // 保留2位
        params.fixed = 2;
    } else if (props.type === 'max_retracement') { // 百分号
        params.fixed = 2;
        params.unit = '%';
        params.zoom = 100;
        params.isfixed = true;
    }
    return (
        <UnitSpan {...props} {...params} />
    )
}
UnitTypeSpan.propTypes = {
    type: PropTypes.oneOf(['return', 'sharp', 'max_retracement']),
};
export default UnitTypeSpan;
