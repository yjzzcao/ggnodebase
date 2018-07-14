import React from 'react';
import PropTypes from 'prop-types';
import Pager from 'rc-pager';
import './CustomPager.less';

const CustomPager = props => {
    return (
        <Pager {...props}
            total={props.total || 1}
            nextLabel={[
                <span key="nt" style={{ margin: '0 5px' }}>下一页</span>,
                <img key="ni" src={require('./images/next_ed.png')} style={{ position: 'relative', top: '-1px' }} />
            ]}
            nextLabelDisabled={[
                <span key="nt" style={{ margin: '0 5px' }}>下一页</span>,
                <img key="ni" src={require('./images/next.png')} style={{ position: 'relative', top: '-1px' }} />
            ]}
            previousLabel={[
                <img key="pi" src={require('./images/prev_ed.png')} style={{ position: 'relative', top: '-1px' }} />,
                <span key="pt" style={{ margin: '0 5px' }}>上一页</span>
            ]}
            previousLabelDisabled={[
                <img key="pi" src={require('./images/prev.png')} style={{ position: 'relative', top: '-1px' }} />,
                <span key="pt" style={{ margin: '0 5px' }}>上一页</span>
            ]}
            foldLabel={<img src={require('./images/fold.png')} />}
        ></Pager>
    );
}
CustomPager.propTypes = {
    total: PropTypes.number,
    current: PropTypes.number, // 从0开始
    onSkipTo: PropTypes.func, // onSkipTo(page) 即将跳转的页面
};

export default CustomPager;
