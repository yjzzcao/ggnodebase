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
                <div className="content">
                    <ol className="breadcrumb">
                        <li>首页</li>
                        <li>新闻</li>
                        <li className="active">梯电传媒与雪花啤酒达成战略合作</li>
                    </ol>
                    <h3 className="title">梯电传媒与雪花啤酒达成战略合作</h3>
                    <div className="create-time">2018年6月25日</div>
                    <p>
                        6月15日，梯电传媒与中国最大啤酒品牌雪花啤酒签约仪式在北京举行。标志着雪花啤酒正式成为梯电传媒的战略合作伙伴。雪花啤酒营销中心总经理曾申平、梯电传媒董事长陈曦、梯电传媒市场总监尹书君等出席了本次签约仪式。<br/>
                        雪花啤酒营销中心总经理曾申平表示，梯电传媒作为国内非常有影响力的传媒公司，拥有国内非常优质的三线城市电梯媒体资源，是国内品牌下沉宣传的首选渠道。雪花啤酒作为中国最大啤酒企业和销量第一啤酒品牌，始终致力于服务消费者。此次强强联手，也是双方为更好服务中国啤酒爱好者和，接下的将与梯电传媒合作，主要推广勇闯天涯品牌。<br/>
                        梯电传媒董事长陈曦在签约仪式中则表示，雪花啤酒携手梯电传媒意义重大，雪花啤酒可以利用梯电传媒的媒介资源平台，通过电梯媒体宣传，提升雪花啤酒品牌推广。梯电传媒的100多个城市都将加入到合作支持雪花旗下品牌推广的阵营中，共同助力雪花啤酒提升品牌影响力。
                    </p>
                </div>
            </div>
        );
    }
}

export default Container;
