import React, { Component, Fragment } from 'react';

class CarouselOther extends Component {
    render() {
        return (
            <div id="carousel-other" className="carousel slide" data-ride="carousel" data-interval="50000">
                <ol className="carousel-indicators">
                    <li data-target="#carousel-other" data-slide-to="0" className="active"></li>
                    <li data-target="#carousel-other" data-slide-to="1"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <a href="/meet/1a9828ea959731d2674b3734afcae6609d97cacd" className="item active" style={{ backgroundImage: `url(${require('./images/会议活动1.png')})` }}>
                        <div className="carousel-caption"></div>
                    </a>
                    <a href="/meet/97d750cd5315e93a9c26895c1a6df27df828b1c4" className="item" style={{ backgroundImage: `url(${require('./images/会议活动2.png')})` }}>
                        <div className="carousel-caption"></div>
                    </a>
                </div>
                <a className="left carousel-control" href="#carousel-other" role="button" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#carousel-other" role="button" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

class Carousel extends Component {
    render() {
        return (
            <div id="carousel-generic" className="carousel slide" data-ride="carousel" data-interval="50000">
                <ol className="carousel-indicators">
                    <li data-target="#carousel-generic" data-slide-to="0" className="active"></li>
                    <li data-target="#carousel-generic" data-slide-to="1"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="item active" style={{ backgroundColor: '#0b131f', backgroundImage: `url(${require('./images/banner1.png')})` }}>
                        <div className="carousel-caption banner1">
                            <div className="container">
                                <img className="font" src={require('./images/banner1字.png')} alt="font" />
                                <a href="/banner/84b977732d09ee02fc2bdf57ee84ca8a2b7a36e0">
                                    查看案例<img src={require('./images/link-arrow1.png')} width="48" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="item" style={{ backgroundColor: '#c6c6c6', backgroundImage: `url(${require('./images/banner2.png')})` }}>
                        <div className="carousel-caption banner2">
                            <div className="container">
                                <img className="font" src={require('./images/banner2字.png')} alt="font" />
                                <a href="/banner/eff77dba23ea74fb7816d1b9d57a3199f1daf72c">
                                    查看案例<img src={require('./images/link-arrow2.png')} width="48" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Container extends Component {
    render() {
        return (
            <Fragment>
                <Carousel />
                <div className="container">
                    <div className="equal-table desc1">
                        <div className="equal-table-cell item">
                            <div>
                                <h3>国内客户解决方案</h3>
                                <p>针对138个最有价值的三线城市，以电梯媒体资源为依托的营销解决方案</p>
                            </div>
                        </div>
                        <div className="equal-table-cell item">
                            <div>
                                <h3>营销下沉解决方案</h3>
                                <p>针对国内企业有营销下沉需求的客户，提供详细的数据调研与分析服务</p>
                            </div>
                        </div>
                        <div className="equal-table-cell item">
                            <div>
                                <h3>出海客户解决方案</h3>
                                <p>针对国内有出海需求的大客户，提供海外市场落地营销解决方案</p>
                            </div>
                        </div>
                    </div>
                    <div className="row desc2">
                        <div className="col-xs-12 col-md-6 left">
                            <div className="item">
                                <h3>梯电传媒覆盖全国最有价值的138个核心三线城市</h3>
                                <p>60万媒体资源助力品牌迅速占领三线城市核心消费人群</p>
                                <a href="/guonei">了解更多<img src={require('./images/link-arrow1.png')} width="48" /></a>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 right">
                            <div className="item">
                                <div className="image-box">
                                    <img src={require('./images/品牌解读.png')} alt="品牌解读" />
                                </div>
                                <a href="/about/abstract">品牌解读</a>
                                <h3>梯电传媒是覆盖三线城市两亿人次的电梯媒体平台</h3>
                                <p>是企业获取客户的最优渠道，是品牌下沉服务的创新者</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="desc3">
                    <div className="container">
                        <p>广告市场复盘及展望：</p>
                        <p>从媒体比较角度再论电梯媒体价值</p>
                        <a href="/news/03c6b11c132ae19a0fc8c183b0e8e2abd73cfe53">了解更多<img src={require('./images/link-arrow1.png')} /></a>
                    </div>
                </div>
                <div className="container">
                    <div className="title">
                        <a href="/meet/list">查看全部<img src={require('./images/箭头-8.png')} width="9"/></a>
                        <h3>会议活动</h3>
                    </div>
                    <CarouselOther />
                    <div className="title">
                        <a href="/story/list">查看全部<img src={require('./images/箭头-8.png')} width="9"/></a>
                        <h3>成功故事</h3>
                    </div>
                    <div className="row desc4">
                        <div className="col-md-4">
                            <div className="image-box box1">
                                <img src={require('./images/成功故事1.png')} alt="成功故事1"/>
                                <div>
                                    <div className="title">成功故事</div>
                                    <p>“云闪付”APP日均二维码交易量快速增长近九成</p>
                                    <a href="/story/b64f7d39f6ff9137cc2803acf4894ec9f2857d7a">更多<img src={require('./images/link-arrow2.png')} width="38" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-box box2">
                                <img src={require('./images/成功故事2.png')} alt="成功故事2"/>
                                <div>
                                    <div className="title">成功故事</div>
                                    <p>农行手机银行客户数量大幅增长</p>
                                    <a href="/story/51372ede0195c8c3c05a030c42430f7bcfe2a427">更多<img src={require('./images/link-arrow2.png')} width="38" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-box box3">
                                <img src={require('./images/成功故事3.png')} alt="成功故事3"/>
                                <div>
                                    <div className="title">成功故事</div>
                                    <p>雪花勇闯天涯superX 引爆今夏啤酒市场</p>
                                    <a href="/story/b72ff0d5c8542be42784c606041003116be97ae1">更多<img src={require('./images/link-arrow2.png')} width="38" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="title">
                        <a href="/news/list">查看全部<img src={require('./images/箭头-8.png')} width="9"/></a>
                        <h3>近期新闻</h3>
                    </div>
                    <div className="row desc5">
                        <div className="col-md-4">
                            <div className="image-box box1">
                                <img src={require('./images/新闻1.png')} alt="新闻1"/>
                                <div>
                                    <div className="title">新闻  |  2018年7月2日</div>
                                    <p>梯电传媒百企百城计划，助力100家企业抢占三线城市营销红利，持续为客户创造价值</p>
                                    <a href="/news/123ecd507fe40834d73f2be0fbf04aa17d30e8a4">更多<img src={require('./images/link-arrow2.png')} width="38" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <a className="item" href="/news/2db541edaa028cd6376d252c0ece0dee0c05c585">
                                <div className="note">新闻  |  2018年6月25日</div>
                                <div className="main">梯电传媒与雪花啤酒达成战略合作</div>
                            </a>
                            <a className="item" href="/news/664117987f40543870dfe5ce934a11ed5fc992ea">
                                <div className="note">新闻  |  2018年5月16日</div>
                                <div className="main">梯电传媒与蓝月亮达成战略合作</div>
                            </a>
                            <a className="item" href="/news/c297efec05c776979fd47dce463a036ee4e1494d">
                                <div className="note">新闻  |  2018年4月20日</div>
                                <div className="main">梯电传媒与李奥贝纳广告公司举行会谈</div>
                            </a>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Container;
