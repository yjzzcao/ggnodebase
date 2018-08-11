import React, { Component } from 'react';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <ol className="breadcrumb">
                    <li>首页</li>
                    <li className="active">新闻</li>
                </ol>
                <h1>新闻</h1>
                <div className="list">
                    <a href="/news/123ecd507fe40834d73f2be0fbf04aa17d30e8a4" className="item">
                        <img src={require('./images/全部新闻1.png')} alt="全部新闻1" />
                        <div className="content">
                            <div className="create-time">新闻 | 2018年7月2日</div>
                            <div className="title">梯电传媒百企百城计划，助力100家企业抢占三线城市营销红利，持续为客户创造价值</div>
                        </div>
                    </a>
                    <a href="/news/2db541edaa028cd6376d252c0ece0dee0c05c585" className="item">
                        <img src={require('./images/全部新闻2.png')} alt="全部新闻2" />
                        <div className="content">
                            <div className="create-time">新闻 | 2018年6月25日</div>
                            <div className="title">梯电传媒与雪花啤酒达成战略合作</div>
                        </div>
                    </a>
                    <a href="/news/664117987f40543870dfe5ce934a11ed5fc992ea" className="item">
                        <img src={require('./images/全部新闻3.png')} alt="全部新闻3" />
                        <div className="content">
                            <div className="create-time">新闻 | 2018年5月16日</div>
                            <div className="title">梯电传媒与蓝月亮达成战略合作 </div>
                        </div>
                    </a>
                    <a href="/news/c297efec05c776979fd47dce463a036ee4e1494d" className="item">
                        <img src={require('./images/全部新闻4.png')} alt="全部新闻4" />
                        <div className="content">
                            <div className="create-time">新闻 | 2018年4月20日</div>
                            <div className="title">梯电传媒与李奥贝纳广告公司举行会谈</div>
                        </div>
                    </a>
                    <a href="/news/eb7e380b2b1f9c1b474f522800276a20938f1674" className="item">
                        <img src={require('./images/全部新闻5.png')} alt="全部新闻5" />
                        <div className="content">
                            <div className="create-time">新闻 | 2018年4月19日</div>
                            <div className="title">2018年中国广告营销发展趋势</div>
                            <div className="note">广告市场总体增速放缓，但生活圈媒体和互联网广告细分市场保持较高景气度</div>
                        </div>
                    </a>
                    <a href="/news/03c6b11c132ae19a0fc8c183b0e8e2abd73cfe53" className="item">
                        <img src={require('./images/全部新闻6.png')} alt="全部新闻6" />
                        <div className="content">
                            <div className="create-time">新闻 | 2018年3月1日</div>
                            <div className="title">广告市场复盘及展望</div>
                            <div className="note">从媒体比较角度再论电梯媒体价值</div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Container;
