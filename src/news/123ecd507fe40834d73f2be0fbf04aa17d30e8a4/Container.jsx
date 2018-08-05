import React, { Component } from 'react';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <div className="catalog">
                    <div className="title"><div>更多新闻</div></div>
                    <ul>
                        <li>
                            <a className="title" href="javascript:void(0)">梯电传媒与雪花啤酒达成战略合作</a>
                            <div className="create-time">新闻 | 2018年6月25日</div>
                        </li>
                        <li>
                            <a className="title" href="javascript:void(0)">梯电传媒与蓝月亮达成战略合作</a>
                            <div className="create-time">新闻 | 2018年5月16日</div>
                        </li>
                        <li>
                            <a className="title" href="javascript:void(0)">梯电传媒与李奥贝纳广告公司举行会谈</a>
                            <div className="create-time">新闻 | 2018年4月20日</div>
                        </li>
                        <li>
                            <a className="title" href="javascript:void(0)">2018年中国广告营销发展趋势：广告市场总体增速放缓，但生活圈媒体和互联网广告细分市场保持较高景气度</a>
                            <div className="create-time">新闻 | 2018年4月19日</div>
                        </li>
                        <li>
                            <a className="title" href="javascript:void(0)">广告市场复盘及展望：从媒体比较角度再论电梯媒体价值</a>
                            <div className="create-time">新闻 | 2018年3月1日</div>
                        </li>
                    </ul>
                </div>
                <div style={{ overflow: 'hidden' }}>
                    <ol className="breadcrumb">
                        <li>首页</li>
                        <li>新闻</li>
                        <li className="active">TODO</li>
                    </ol>
                    <h3 className="title">TODO</h3>
                    <div className="create-time">TODO</div>
                    <p>TODO</p>
                </div>
            </div>
        );
    }
}

export default Container;
