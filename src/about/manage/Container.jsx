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
                            <li><a href="/about/join">电梯招聘</a></li>
                            <li><a href="/about/contact">联系电梯</a></li>
                        </ul>
                    </div>
                </div>
                <div className="left">
                    <ol className="breadcrumb">
                        <li>关于电梯</li>
                        <li className="active">公司治理</li>
                    </ol>
                    <h1>公司治理</h1>
                </div>
            </div>
        );
    }
}

export default Container;
