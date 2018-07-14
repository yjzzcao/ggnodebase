import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const ChartLoad = props => {
    const { fillType, color, fontSize, offsetTop } = props;
    const style = {
        height: fillType === 'full' ? `calc(100% - ${offsetTop}px)` : null,
        top: `${offsetTop}px`
    };
    return (
        <div className={`chart-load fill-${fillType} chart-load-${props.loadAnimation}`} style={style}>
            <div style={{ color, fontSize }}>
                <img src={require("./images/chart_load.png")} />
                <div>{props.loadMsg}</div>
            </div>
        </div>
    );
}

ChartLoad.propTypes = {
    fillType: PropTypes.oneOf(['full', 'auto']),
    fontSize: PropTypes.number,
    color: PropTypes.string,
    offsetTop: PropTypes.number,
    loadAnimation: PropTypes.bool,
    loadMsg: PropTypes.string
};
ChartLoad.defaultProps = {
    fillType: 'full',
    fontSize: 14,
    color: '#999',
    offsetTop: 0,
    loadAnimation: true,
    loadMsg: '正在玩命加载中'
};

export default ChartLoad;
