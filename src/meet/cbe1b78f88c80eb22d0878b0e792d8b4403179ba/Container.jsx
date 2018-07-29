import React, { Component, Fragment } from 'react';
import $ from 'lib/jquery';

class Container extends Component {
    render() {
        return (
            <Fragment>
                <div className="banner">
                    <img src={require('./images/会议新品牌banner.png')} alt="会议新品牌banner" />
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
                        <li className="active">2018中国新品牌论坛</li>
                    </ol>
                    <section className="section-box1">
                        <h3 id="notice"><div>会议通知</div></h3>
                        <div className="content">
                            <div className="title">2018中国新品牌论坛</div>
                            <div className="blue">会议内容</div>
                            <p>主题：未来500强从这里启航</p>
                            <p>
                                党的十九大和两会已胜利召开，为积极贯彻落实党中央国务院要求，全面推动中国制造2025、振兴实体经济和国家品牌战略，在相关部门指导下，我们倾力打造的中国新品牌战略即将盛大启航，将助力中国1000家中小企业成为单打领军！成为行业小王！近期拟在北京举办“首届中国新品牌论坛”，特邀您出席共同迈入中国品牌发展的新时代！<br />
                                本次活动拟邀请中国社会科学院、中国工程院、全国工商联、中国科协、北京大学、清华大学等有关部门领导和专家，以及企业家、创业家、投资家和国际服务机构等出席。
                            </p>
                            <p>
                                一.活动背景<br />
                                随着国家品牌战略的实施，近年来中国品牌事业已取得丰硕成果，各行业和各地区涌现了许多国家级名牌产品和名牌企业，尤为可喜的是一大批中国新品牌在迅速崛起，已成为我国经济社会蓬勃发展的新生力量。中国新品牌具有创业时间短、成长速度快、产品创新多、市场覆盖广、企业文化新、管理团队精、经营战略准、发展前景好等特点，新品牌的目标：就是未来的中国大品牌，就是未来的商界新领袖，就是未来500强！
                            </p>
                            <p>
                                二、组织机构<br />
                                本次论坛由商会智库主办，中关村成长型科技企业互助促进会、中国人生科学学会、专业媒体、金融机构、服务平台等机关单位联合支持。
                            </p>
                            <p>
                                三、主要议题<br />
                                1. 未来500强：创新与创业<br />
                                2. 中小企业品牌之路：单打冠军与行业小王<br />
                                3. 企业转型升级：新产品、新模式、新价值<br />
                                4. 互联网时代的战略规划与顶层设计<br />
                                5. 新品牌上市之道：新三板、创业板、中小板<br />
                                6. 企业家精神：创始人基因与赋能新团队<br />
                                7. 民族品牌崛起与一带一路
                            </p>
                            <p>
                                四、参会代表：<br />
                                新品牌企业、优秀商协会、主流媒体和相关政府部门领导500人；
                            </p>
                            <p>主办单位：商会智库、中国新品牌论坛组委会</p>
                        </div>
                    </section>
                    <section className="section-box2">
                        <h3 id="address"><div>会议地址</div></h3>
                        <div className="content">
                            <div className="title">会议地点：北京世纪金源大饭店（暂定）</div>
                        </div>
                    </section>
                    <section className="section-box3">
                        <h3 id="schedule"><span className="note">（最终日程以会议现场为准）</span><div>会议日程</div></h3>
                        <div className="content">
                            <p>
                                <div className="blank">6月21日9:00-18:00</div>
                            </p>
                            <p>
                                <span className="-time">21日全天</span><br />
                                有关领导致辞：《未来500强从这里启航》<br />
                                特邀嘉宾主题演讲：《中国新品牌的崛起》<br />
                                “21世纪，21个第一品牌”主题演讲：<br />
                                ——展示单打冠军发展模式<br />
                                ——解读行业小王成长密码<br />
                                ——探索领军品牌打造之道<br />
                                ——透析爆品战略定位落地
                            </p>
                            <p>
                                <span className="-time">21日晚上</span><br />
                                未来500强·新品牌案例（最具活力、最具价值、最具未来等）<br />
                                合作签约（金融机构、媒体机构、服务机构、商会负责人）<br />
                                长征精神音乐会（企业家精神，重建价值观）
                            </p>
                        </div>
                    </section>
                    <section className="section-box4">
                        <h3 id="guest"><span className="note">（最终出席嘉宾以会议现场为准）</span><div>会议嘉宾</div></h3>
                        <div className="content">
                            <img src={require('./images/会议新品牌嘉宾.png')} alt="会议新品牌嘉宾" />
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
