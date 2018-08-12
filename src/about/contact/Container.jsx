import React, { Component } from 'react';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <div className="right">
                    <div className="navbar">
                        <div className="title">关于电梯</div>
                        <ul className="nav nav-pills nav-stacked">
                            <li><a href="/about/abstract">公司简介</a></li>
                            <li><a href="/about/manage">公司治理</a></li>
                            <li><a href="/about/join">梯电招聘</a></li>
                            <li><a href="/about/contact">联系梯电</a></li>
                        </ul>
                    </div>
                </div>
                <div className="left">
                    <ol className="breadcrumb">
                        <li>关于电梯</li>
                        <li className="active">联系梯电</li>
                    </ol>
                    <h1>联系梯电</h1>
                    <div className="address"><span className="blank">地址：</span>中国·上海市浦东新区博霞路22号</div>
                    <div className="phone"><span className="blank">总机：</span>021-50207135</div>
                    <div className="mail"><span className="blank">邮箱：</span>service@elevatormedia.cn</div>
                    <h1 style={{ marginTop: '92px' }}>媒体联系</h1>
                    <div className="media">
                        <div className="-icon"><img src={require('./images/信件-02.png')} alt="信件"/></div>
                        <img src={require('./images/点击手-02.png')} alt="点击手"/>
                        <a href="mailto:corporate@elevatormedia.cn">corporate@elevatormedia.cn</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Container;
