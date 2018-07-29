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
                        <div className="content"></div>
                    </section>
                    <section className="section-box2">
                        <h3 id="address"><div>会议地址</div></h3>
                        <div className="content"></div>
                    </section>
                    <section className="section-box3">
                        <h3 id="schedule"><span className="note">（最终日程以会议现场为准）</span><div>会议日程</div></h3>
                        <div className="content"></div>
                    </section>
                    <section className="section-box4">
                        <h3 id="guest"><span className="note">（最终出席嘉宾以会议现场为准）</span><div>会议嘉宾</div></h3>
                        <div className="content"></div>
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