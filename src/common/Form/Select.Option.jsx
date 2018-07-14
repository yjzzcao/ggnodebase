import React from 'react';

const Option = props => {
    return (
        <li role="button"
            className={`${props.className} -option-item ${props.__selected ? " selected" : ""}`}
            onClick={props.__onClick}
        >
            {props.__type === 'multiple' ? <span className="-select-icon"></span> : null}
            {props.children}
        </li>
    );
}

Option.defaultProps = {
    className: ''
};

export default Option;
