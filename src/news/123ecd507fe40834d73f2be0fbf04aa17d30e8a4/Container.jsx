import React, { Component } from 'react';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <div className="catalog">
                    <div className="title"><div>更多新闻</div></div>
                    <ul>
                        <li>
                            <a className="title" href="/news/2db541edaa028cd6376d252c0ece0dee0c05c585">梯电传媒与雪花啤酒达成战略合作</a>
                            <div className="create-time">新闻 | 2018年6月25日</div>
                        </li>
                        <li>
                            <a className="title" href="/news/664117987f40543870dfe5ce934a11ed5fc992ea">梯电传媒与蓝月亮达成战略合作</a>
                            <div className="create-time">新闻 | 2018年5月16日</div>
                        </li>
                        <li>
                            <a className="title" href="/news/c297efec05c776979fd47dce463a036ee4e1494d">梯电传媒与李奥贝纳广告公司举行会谈</a>
                            <div className="create-time">新闻 | 2018年4月20日</div>
                        </li>
                        <li>
                            <a className="title" href="/news/eb7e380b2b1f9c1b474f522800276a20938f1674">2018年中国广告营销发展趋势：广告市场总体增速放缓，但生活圈媒体和互联网广告细分市场保持较高景气度</a>
                            <div className="create-time">新闻 | 2018年4月19日</div>
                        </li>
                        <li>
                            <a className="title" href="/news/03c6b11c132ae19a0fc8c183b0e8e2abd73cfe53">广告市场复盘及展望：从媒体比较角度再论电梯媒体价值</a>
                            <div className="create-time">新闻 | 2018年3月1日</div>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <ol className="breadcrumb">
                        <li>首页</li>
                        <li>新闻</li>
                        <li className="active">梯电传媒百企百城计划</li>
                    </ol>
                    <h3 className="title">梯电传媒百企百城计划，助力100家企业抢占三线城市营销红利，持续为客户创造价值</h3>
                    <div className="create-time">2018年7月2日</div>
                    <p>
                        在目前一二线城市人口红利与流量见顶的情况下，新零售，消费升级也开始从一二线城市开始向下传导，很多企业开始布局三线城市，2018年可以说是三线城市开启流量红利的元年，而且三线城市的用户相比一二线城市，不仅没有房贷压力，而且空余消费时间很多，可以说是既有钱又有闲。布局三线城市企业除了借助传统渠道外，营销方面除了借助互联网，电梯传媒可以说是最优的选择，不仅能够长期树立消费者心目中的品牌形象，而且可以直接带来效果转化，抢占三线城市的营销红利已经迫在眉睫。梯电传媒开启百企百城计划，将助力100家企业抢占三线城市营销红利，持续为客户创造价值。<br/>
                        去三线城市已经成为许多企业的共识，而且2015年资本寒冬过后，人们普遍认为移动互联网的人口红利已经触顶，但三四线城市的主流人群背后蕴藏着巨大机会。庞大的人口背后是巨大的消费潜力，其中最典型的莫过于去年表现颇为抢眼的拼多多。
                    </p>
                </div>
            </div>
        );
    }
}

export default Container;
