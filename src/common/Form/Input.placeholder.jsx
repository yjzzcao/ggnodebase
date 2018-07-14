import React, { Component } from 'react';
import $ from 'jQuery';
import Tool from 'Common/Tool';

export default class Input extends Component {
    render() {
        return <input ref="input" {...this.props} />
    }
    componentDidMount() {
        if (Tool.isIElt('9.0')) {
            const $this = $(this.refs.input);
            import('lib/jquery.placeholder').then(_ => {
                $this.placeholder();
            });
        }
    }
}
