import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const DataLoad = props => {
    const { fillType, color, fontSize, offsetTop } = props;
    const style = {
        height: fillType === 'full' ? `calc(100% - ${offsetTop}px)` : null,
        top: `${offsetTop}px`
    };
    return (
        <div className={`data-load fill-${fillType} data-load-${props.loadAnimation}`} style={style}>
            <div style={{ color, fontSize }}>
                {props.loadAnimation ? <img src={require("./images/data_load.gif")} /> : null}
                <div>{props.loadAnimation ? null : props.loadMsg}</div>
            </div>
        </div>
    );
}

// loadAnimation 为true是正在加载，展示加载动画
// loadAnimation 为false时一般用于加载失败展示
DataLoad.propTypes = {
    fillType: PropTypes.oneOf(['full', 'auto']),
    fontSize: PropTypes.number,
    color: PropTypes.string,
    offsetTop: PropTypes.number,
    loadAnimation: PropTypes.bool,
    loadMsg: PropTypes.string,
};
DataLoad.defaultProps = {
    fillType: 'full',
    fontSize: 14,
    color: "#999",
    offsetTop: 0,
    loadAnimation: true,
    loadMsg: '正在玩命加载中'
};

export default DataLoad;
