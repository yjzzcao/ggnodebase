import React, { Component, Fragment } from 'react';
import $ from 'lib/jquery';

class Container extends Component {
    render() {
        return (
            <Fragment>
                <div className="banner">
                    <img src={require('./images/会议新媒体banner.png')} alt="会议新媒体banner" />
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
                        <li className="active">2018世界新媒体大会</li>
                    </ol>
                    <section className="section-box1">
                        <h3 id="notice"><div>会议通知</div></h3>
                        <div className="content">
                            <div className="title">2018世界新媒体大会</div>
                            <div className="blue">会议内容</div>
                            <p>2016年政府工作报告首次指出我国发展正处于这样一个关键时期，必须培育壮大新动能，加快发展新经济。要推动新技术、新产业、新业态加快成长。近几年随着全球新经济以及AI、VR等新技术的发展，不断地催动媒体进行技术变革，提升智能化、精准化水平，以迎接全球新市场的挑战。</p>
                            <p>大会特色：</p>
                            <p>
                                1、规模宏大，细节取胜<br />
                                规模宏大，来自媒体主管政府部门领导、新媒体门户领袖、新媒体专家、新媒体地方门户领袖、新媒体领域风险投资人等将超过2000人。
                            </p>
                            <p>
                                2、形式多样  注重体验<br />
                                会议将通过主题演讲、研讨、高峰对话、媒体采访、线下交流等形式，增进业界的互动交流、产业合作、市场拓展、项目交易、资本对接等方面的密切合作。
                            </p>
                            <p>
                                3、观点碰撞，思想盛宴<br />
                                给予嘉宾充分表达思想和观点的舞台，来自新闻、视频、社交等热门领域专家相互研讨新媒体行业商业模式创新之路。在观点碰撞之中，丰富思想，拓宽眼界，深化见识，结交朋友。
                            </p>
                            <p>
                                4、媒体云集，传播正能量<br />
                                知名媒体行业领袖、权威媒体专家、新媒体领域风险投资人等汇聚一堂，剖析解读新媒体成功案例，学习新媒体的管理和运营的策略。
                            </p>
                        </div>
                    </section>
                    <section className="section-box2">
                        <h3 id="address"><div>会议地址</div></h3>
                        <div className="content">
                            <div className="title">会议地点：北京  北京国际会议中心  北京市朝阳区北辰东路8号</div>
                        </div>
                    </section>
                    <section className="section-box3">
                        <h3 id="schedule"><span className="note">（最终日程以会议现场为准）</span><div>会议日程</div></h3>
                        <div className="content">
                            <p><div className="blank">2018-05-04 08:00至 2018-05-04 18:00结束</div></p>
                            <p>即将更新，敬请期待</p>
                        </div>
                    </section>
                    <section className="section-box4">
                        <h3 id="guest"><span className="note">（最终出席嘉宾以会议现场为准）</span><div>会议嘉宾</div></h3>
                        <div className="content">
                            <img src={require('./images/会议新媒体嘉宾.png')} alt="会议新媒体嘉宾" />
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