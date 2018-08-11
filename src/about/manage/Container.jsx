import React, { Component } from 'react';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <div className="right">
                    <div className="navbar">
                        <div className="title">关于电梯</div>
                        <ul className="nav nav-pills nav-stacked">
                            <li><a href="javacript:void(0)">公司简介</a></li>
                            <li><a href="javacript:void(0)">公司治理</a></li>
                            <li><a href="javacript:void(0)">天梯招聘</a></li>
                            <li><a href="javacript:void(0)">联系电梯</a></li>
                        </ul>
                    </div>
                </div>
                <div className="left">
                    <ol className="breadcrumb">
                        <li><a href="javascript:void(0)">关于电梯</a></li>
                        <li className="active">公司治理</li>
                    </ol>
                    <h1>公司治理</h1>
                </div>
            </div>
        );
    }
}

export default Container;
