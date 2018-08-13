import React from 'react';

export default props => {
    return (
        <div className="container">
            <h3>业务案例</h3>
            <ul className="catalog">
                <li><a href="javascript:void(0)">背景</a></li>
                <li><a href="javascript:void(0)">城市需求调研表</a></li>
                <li><a href="javascript:void(0)">结果</a></li>
            </ul>
            <h5>背景</h5>
            <p>A厨电品牌在一二线城市拥有很好的市场份额，但随着近年消费者厨房家电行业竞争的逐渐激烈，该公司的业绩增速开始放缓，而且一二线市场营销费用居高不下，虽然广告投放后营业收入增加，但利润几乎没有增长。公司已经提早布局了三线城市，不过时间上有些晚于竞争对手，在这种情况下，公司决定加大三线城市的营销力度，争取业绩有实质突破。梯电传媒与该公司签订营销服务协议后，首先对品牌在12个省份的138个城市进行了市场需求调研，调研结果如下：</p>
            <img className="res" src={require('./images/资源 1.png')} alt="资源 1"/>
            <h5>城市需求调研表</h5>
            <img className="res" src={require('./images/表格内容.png')} alt="表格内容"/>
            <h5>结果</h5>
            <p>本次投放覆盖人群300万左右，覆盖家庭数量100万左右，根据调查结果显示，转化率在1.30%，预估带动销量13000台，按照均价3000元计算，预估带动收入3900万元，产生利润800万元，远大于其投放成本，该品牌转化统计结果与公司内部销售数据基本一致。同时，客户首选A增长率在58%，客户知道A增长率在38%，起到了极大的品牌宣传效果。</p>
        </div>
    );
};
