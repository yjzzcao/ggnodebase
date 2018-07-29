import React, { Component, Fragment } from 'react';

class Container extends Component {
    render() {
        return (
            <Fragment>
                <div className="banner">
                    <img src="TODO" alt="TODO" />
                </div>
                <div className="container">
                    <img className="cut-off-line" src={require('./images/故事详情分割线.png')} alt="故事详情分割线" />
                    <div className="box">
                        <ol className="breadcrumb">
                            <li>首页</li>
                            <li>成功故事</li>
                            <li className="active">TODO</li>
                        </ol>
                        <h3>TODO</h3>
                        <p>TODO</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Container;
