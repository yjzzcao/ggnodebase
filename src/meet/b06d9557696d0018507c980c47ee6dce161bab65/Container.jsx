import React, { Component, Fragment } from 'react';
import $ from 'lib/jquery';

class Container extends Component {
    render() {
        return (
            <Fragment>
                <div className="banner">
                    <img src={require('./images/会议全球智能banner.png')} alt="会议全球智能banner" />
                </div>
                <div className="zhanwei">
                    <div className="tab-nav" data-spy="affix" data-offset-top="270">
                        <div id="navbar" className="container">
                            <ul className="nav nav-tabs" role="tablist">
                                <li><a href="#notice">会议通知</a></li>
                                <li><a href="#address">会议地址</a></li>
                                <li><a href="#schedule">会议日程</a></li>
                                <li><a href="#guest">会议嘉宾</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <ol className="breadcrumb">
                        <li>首页</li>
                        <li>会议活动</li>
                        <li className="active">2018全球智能+新商业峰会</li>
                    </ol>
                    <section className="section-box1">
                        <h3 id="notice"><div>会议通知</div></h3>
                        <div className="content">
                            <div className="title">2018全球智能+新商业峰会</div>
                            <div className="blue">会议内容</div>
                            <p>由上海市经济和信息化委员会、上海市商务委员会、上海市长宁区人民政府指导，上海市长宁区青年联合会和亿欧公司联合主办。峰会才去“1+8”的组织架构，除了6月13日的“全球AI领袖峰会”外，14-15日将举办包括AI消费产品峰会、只能+新出行峰会、智能+大健康峰会、智能+新金融峰会、AI国际化峰会、智能+教育峰会、智能+新服务峰会、智能+新零售峰会在内的8场垂直峰会，预计总参会人次将达到4000人。</p>
                        </div>
                    </section>
                    <section className="section-box2">
                        <h3 id="address"><div>会议地址</div></h3>
                        <div className="content">
                            <div className="title">会议地点：北京 北京世纪金源大饭店（暂定）</div>
                        </div>
                    </section>
                    <section className="section-box3">
                        <h3 id="schedule"><span className="note">（最终日程以会议现场为准）</span><div>会议日程</div></h3>
                        <div className="content">
                            <div className="blue">全球人工智能领袖峰会</div>
                            <img src={require('./images/会议全球智能日程1.png')} alt="会议全球智能日程1"/>
                            <div className="blue">AI国际峰会</div>
                            <img src={require('./images/会议全球智能日程2.png')} alt="会议全球智能日程2"/>
                            <div className="blue">AI产品峰会</div>
                            <img src={require('./images/会议全球智能日程3.png')} alt="会议全球智能日程3"/>
                            <div className="blue">智能+新服务峰会</div>
                            <img src={require('./images/会议全球智能日程4.png')} alt="会议全球智能日程4"/>
                            <div className="blue">智能+新出行峰会</div>
                            <img src={require('./images/会议全球智能日程5.png')} alt="会议全球智能日程5"/>
                            <div className="blue">智能+大健康峰会</div>
                            <img src={require('./images/会议全球智能日程6.png')} alt="会议全球智能日程6"/>
                            <div className="blue">智能+教育峰会</div>
                            <img src={require('./images/会议全球智能日程7.png')} alt="会议全球智能日程7"/>
                            <div className="blue">智能+零售峰会</div>
                            <img src={require('./images/会议全球智能日程8.png')} alt="会议全球智能日程8"/>
                            <div className="blue">智能+新金融峰会</div>
                            <img src={require('./images/会议全球智能日程9.png')} alt="会议全球智能日程9"/>
                        </div>
                    </section>
                    <section className="section-box4">
                        <h3 id="guest"><span className="note">（最终出席嘉宾以会议现场为准）</span><div>会议嘉宾</div></h3>
                        <div className="content">
                            <img src={require('./images/会议全球智能嘉宾1.jpeg')} alt="会议全球智能嘉宾1"/>
                            <img src={require('./images/会议全球智能嘉宾2.jpeg')} alt="会议全球智能嘉宾2"/>
                            <img src={require('./images/会议全球智能嘉宾3.jpeg')} alt="会议全球智能嘉宾3"/>
                            <img src={require('./images/会议全球智能嘉宾4.jpeg')} alt="会议全球智能嘉宾4"/>
                            <img src={require('./images/会议全球智能嘉宾5.jpeg')} alt="会议全球智能嘉宾5"/>
                        </div>
                    </section>
                </div>
            </Fragment>
        );
    }
    componentDidMount() {
        $(window).on('hashchange', function () {
            const $target = $(location.hash);
            if ($target.length === 1) {
                const top = $target.offset().top - 132;
                $('html,body').animate({ scrollTop: top }, 200);
            }
        });
    }
}

export default Container;