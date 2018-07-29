import React, { Component, Fragment } from 'react';
import $ from 'lib/jquery';

class Container extends Component {
    render() {
        return (
            <Fragment>
                <div className="banner">
                    <img src={require('./images/会议giec-banner.png')} alt="会议giec-banner" />
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
                        <li className="active">GIEC2018全球互联网经济大会</li>
                    </ol>
                    <section className="section-box1">
                        <h3 id="notice"><div>会议通知</div></h3>
                        <div className="content">
                            <div className="title">2018第八届数字营销与社交媒体峰会</div>
                            <div className="blue">会议内容</div>
                            <p>GIEC全球互联网经济大会每年秋季在北京盛大举办，作为万物互联时代的顶级行业平台，历经多届成功举办，业已成为年度互联网行业盛会。</p>
                            <p>近年来，我国电子商务增长势态迅猛增长，移动互联网、物联网、智能硬件等技术的快速发展，为互联网的发展提供了更加丰富的“助燃剂”和“催化剂”，智能产业在众多领域已经初显群鹿角逐的激烈态势。为了积极响应国家提出中国制造2025、互联网+、大众创业万众创新等战略，推进互联网与传统行业进行深度融合，促进产业转型升级，创造新的发展生态，培育经济新的增长点。</p>
                            <p>GIEC2018全球互联网经济大会将围绕“万物智生 数字赋能”为主题，邀请政府官员、企业高管、专家学者相聚一堂，共议新形势下如何利用互联网创新促进各领域智能化渗透、如何加强产业链上下游、软硬件各环节的整合协同。诚挚邀请海内外精英相聚京城，共享行业盛会。</p>
                            <p>
                                <span className="-blank">GIEC2018奖项评选：</span><br/>
                                互联网经济年度大奖——互联网独角兽们绽放异彩的舞台<br/>
                                2018年度奖项评选——获奖榜单300+媒体权威发布<br/>
                                年度最受欢迎新锐APP精品<br/>
                                年度最受欢迎分类信息平台<br/>
                                年度最受欢迎互联网金融平台<br/>
                                年度最受欢迎综合电商平台<br/>
                                年度最受欢迎社交网络工具<br/>
                                年度最受欢迎出行服务网络平台<br/>
                                年度最受欢迎网络游戏精品<br/>
                                年度最受欢迎视频娱乐网站<br/>
                                年度最受欢迎O2O生活服务平台<br/>
                                年度最受欢迎跨境电商品牌<br/>
                                年度最受欢迎人才招聘网站<br/>
                                年度最受欢迎无人机智能硬件<br/>
                                年度最佳网上支付服务商<br/>
                                年度最佳软件服务商<br/>
                                年度最受欢迎VR智能硬件产品<br/>
                                年度最佳网络营销服务商<br/>
                                年度最佳云计算服务商<br/>
                                年度最受欢迎场景内容制作商<br/>
                            </p>
                        </div>
                    </section>
                    <section  className="section-box2">
                        <h3 id="address"><div>会议地址</div></h3>
                        <div className="content">
                            <div className="title">会议地点：上海 上海龙之梦大酒店 长宁区延安西路1116号</div>
                        </div>
                    </section>
                    <section  className="section-box3">
                        <h3 id="schedule"><span className="note">（最终日程以会议现场为准）</span><div>会议日程</div></h3>
                        <div className="content">
                            <img src={require('./images/会议giec日程.png')} alt="会议giec日程" />
                        </div>
                    </section>
                    <section  className="section-box4">
                        <h3 id="guest"><span className="note">（最终出席嘉宾以会议现场为准）</span><div>会议嘉宾</div></h3>
                        <div className="content">
                            <img src={require('./images/会议giec嘉宾.png')} alt="会议giec嘉宾" />
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
