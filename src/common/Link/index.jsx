import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tool, { merged } from 'Common/Tool';

const Link = props => {
    // props的值不能直接修改
    const _props = merged({}, props);
    if (Tool.type(_props.title) !== 'string' && Tool.type(_props.children) === 'string') {
        _props.title = _props.children;
    }
    return (
        <a {..._props}>{_props.children}</a>
    );
}

Link.propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string
};

Link.defaultProps = {
    target: '_blank'
};

export default Link;
