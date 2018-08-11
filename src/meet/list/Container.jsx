import React, { Component } from 'react';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <ol className="breadcrumb">
                    <li>首页</li>
                    <li className="active">会议活动</li>
                </ol>
                <h1>会议活动</h1>
                <div className="list">
                    <a href="javascript:void(0)" className="item">
                        <img src={require('./images/全部会议内容1.png')} alt="全部会议内容1" />
                        <div className="content">
                            <div className="create-time">会议活动 | 2018年9月5-9月7日</div>
                            <div className="title">2018第八届数字营销与社交媒体峰会</div>
                            <div className="note">中国 上海</div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" className="item">
                        <img src={require('./images/全部会议内容2.png')} alt="全部会议内容2" />
                        <div className="content">
                            <div className="create-time">会议活动 | 2018年9月3日-9月4日</div>
                            <div className="title">GIEC2018全球互联网经济大会</div>
                            <div className="note">中国 北京</div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" className="item">
                        <img src={require('./images/全部会议内容3.png')} alt="全部会议内容3" />
                        <div className="content">
                            <div className="create-time">会议活动 | 2018年6月21日</div>
                            <div className="title">2018中国新品牌论坛</div>
                            <div className="note">中国 北京</div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" className="item">
                        <img src={require('./images/全部会议内容4.png')} alt="全部会议内容4" />
                        <div className="content">
                            <div className="create-time">会议活动 | 2018年6月13日</div>
                            <div className="title">2018全球智能+新商业峰会</div>
                            <div className="note">中国 上海</div>
                        </div>
                    </a>
                    <a href="javascript:void(0)" className="item">
                        <img src={require('./images/全部会议内容5.png')} alt="全部会议内容5" />
                        <div className="content">
                            <div className="create-time">会议活动 | 2018年5月4日 </div>
                            <div className="title">2018世界新媒体大会</div>
                            <div className="note">中国 北京</div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Container;
