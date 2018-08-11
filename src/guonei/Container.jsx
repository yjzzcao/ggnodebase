import React, { Component } from 'react';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <div className="left">
                    <div id="navbar" className="sidebar">
                        <ul className="nav nav-pills nav-stacked" data-spy="affix" data-offset-top="78">
                            <li className="active"><a href="#basic">平台概况</a></li>
                            <li><a href="#super">平台优势</a></li>
                            <li><a href="#city">覆盖城市</a></li>
                            <li><a href="#case">成功案例</a></li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    <section id="basic">
                        <div className="title">平台概况</div>
                        <div className="content">
                            <p>
                                梯电传媒是国内三线城市电梯媒体投放首选平台，中国品牌50强超过一半选择我们。<br/>
                                梯电传媒覆盖全国最有价值的138个核心三线城市，超过20万电梯资源，媒体总量超过60万面，每个城市的媒体资源市场份额均在80%以上，是品牌迅速占领三线城市核心消费人群的优质资源。
                            </p>
                            <p>
                                梯电传媒推出“百企百城”计划，帮助100家企业品牌下沉，占领100余个三线城市，该计划面向首批签约的100家企业，以最具有竞争力的价格提供以下营销解决方案：
                            </p>
                            <p>
                                <span className="blank">1. 品牌需求调研</span><br/>
                                包括为品牌在138个最有价值的三线城市精品小区内向目标人群进行需求调查，最终将所有城市的广告投放收入比进行排序，更好的帮助品牌筛选目标城市，以达到广告投放效果的最优策略。<br/>
                                <span className="blank">2. 品牌投放建议</span><br/>
                                包括具体投放哪些城市的哪些社区与写字楼，以及针对不同的城市特点与文化，我们将提供针对每个城市的海报内容建议。<br/>
                                <span className="blank">3. 品牌效果监测</span><br/>
                                包括对每一部电梯的广告画面进行拍照，每周进行复查，对期间损坏的广告位将十倍赔偿，同时向品牌商提供监测报告。<br/>
                                <span className="blank">4. 品牌转化统计</span><br/>
                                包括对客户最终投放的所有城市的楼宇用户进行品牌购买行为转化统计，与品牌商内部增长数据进行对比论证是否一致。
                            </p>
                        </div>
                    </section>
                    <section id="super">
                        <div className="title">平台优势</div>
                        <div className="content">
                            <p><span className="blank">1.</span>以批量采购媒体资源的规模化优势打造最具有竞争力的价格，保证品牌商以最低的成本达到最优的投放效果。</p>
                            <p><span className="blank">2.</span>媒体资源覆盖最具有价值的三线城市主流人群，帮助品牌实现下沉，以极低的成本获取更多用户并持续购买使用。</p>
                            <p><span className="blank">3.</span>提供营销全流程的解决方案，每个环节都有充分的数据支持，不仅帮助品牌实现更多收入与利润，而且让品牌更加清楚用户习惯。</p>
                            <p><span className="blank">4.</span>国内最早提出品牌联动的营销方案，实现两个品牌在同一面电梯媒体内展现，不仅大幅降低企业投放成本，而且实现品牌的价值相互促进。</p>
                        </div>
                    </section>
                    <section id="city">
                        <div className="title">覆盖城市</div>
                        <div className="content">
                        </div>
                    </section>
                    <section id="case">
                        <div className="title">成功案例</div>
                        <div className="content">
                            <li className="item clearfix">
                                <img src={require('./images/成功案例厨电.png')} alt="成功案例厨电"/>
                                <div className="content">
                                    <div className="title">国内第一家将调研统计应用于电梯媒体营销的机构，让企业的投入能够看到量化的产出</div>
                                    <div className="note">A厨电品牌在一二线城市拥有很好的市场份额，但随着近年消费者厨房家电行业竞争的逐渐激烈，该公司的业绩增速开始放缓...</div>
                                    <a href="/banner/eff77dba23ea74fb7816d1b9d57a3199f1daf72c" className="more">点击查看 ></a>
                                </div>
                            </li>
                            <li className="item clearfix">
                                <img src={require('./images/全部成功故事1.png')} alt="全部成功故事1"/>
                                <div className="content">
                                    <div className="title">“云闪付”APP日均二维码交易量快速增长近九成</div>
                                    <div className="note">银联云闪付是银联专为移动互联网打造的统一品牌，围绕云闪付，银联建立了完整的产品体系，为四方模式生态系统下的发卡、收单、商户以及持卡人提供全方位的服务...</div>
                                    <a href="/story/b64f7d39f6ff9137cc2803acf4894ec9f2857d7a" className="more">点击查看 ></a>
                                </div>
                            </li>
                            <li className="item clearfix">
                                <img src={require('./images/全部成功故事2.png')} alt="全部成功故事2"/>
                                <div className="content">
                                    <div className="title">农行手机银行客户数量大幅增长</div>
                                    <div className="note">农行手机银行，是中国农业银行为手机用户提供的专用客户端软件，集金融应用和增值服务于一体，意在满足客户自由、方便、快捷、潮流的移动金融需求，截止2017年末，掌上银行用户总数达2.06亿户...</div>
                                    <a href="/story/51372ede0195c8c3c05a030c42430f7bcfe2a427" className="more">点击查看 ></a>
                                </div>
                            </li>
                            <li className="item clearfix">
                                <img src={require('./images/全部成功故事3.png')} alt="全部成功故事3"/>
                                <div className="content">
                                    <div className="title">雪花勇闯天涯superX 引爆今夏啤酒市场</div>
                                    <div className="note">勇闯天涯superX是华润雪花啤酒自品牌重塑以来推出的首支核心产品，是华润雪花在新的产品开发理念、新的产品精酿技术、新的产品营销模式下推出的一款全新产品，上市后将覆盖餐饮终端等更广泛的渠道...</div>
                                    <a href="/story/b72ff0d5c8542be42784c606041003116be97ae1" className="more">点击查看 ></a>
                                </div>
                            </li>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
    componentDidMount() {
        $(window).on('hashchange', function () {
            const $target = $(location.hash);
            if ($target.length === 1) {
                const top = $target.offset().top - 78;
                $('html,body').animate({ scrollTop: top }, 200);
            }
        });
    }
}

export default Container;