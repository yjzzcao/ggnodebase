import React, { Component, Fragment } from 'react';

class Container extends Component {
    render() {
        return (
            <Fragment>
                <div className="banner">
                    <img src={require('./images/故事雪花.png')} alt="故事雪花" />
                    <div className="note">雪花勇闯天涯superX 引爆今夏啤酒市场</div>
                </div>
                <div className="container">
                    <img className="cut-off-line" src={require('./images/故事详情分割线.png')} alt="故事详情分割线" />
                    <div className="box">
                        <ol className="breadcrumb">
                            <li>首页</li>
                            <li>成功故事</li>
                            <li className="active">雪花勇闯天涯superX 引爆今夏啤酒市场</li>
                        </ol>
                        <h3>雪花勇闯天涯superX 引爆今夏啤酒市场</h3>
                        <p>
                            勇闯天涯superX是华润雪花啤酒自品牌重塑以来推出的首支核心产品，是华润雪花在新的产品开发理念、新的产品精酿技术、新的产品营销模式下推出的一款全新产品，上市后将覆盖餐饮终端等更广泛的渠道。作为一款主打年轻人市场的啤酒新品，勇闯天涯superX为年轻人量身定制。<br/>
                            勇闯天涯superX的“super”代表超级、无限，X代表探索、未知，“superX”意味着未来将为年轻用户带来无限探索的可能。<br/>
                            2018年世界杯期间，梯电传媒为勇闯天涯superX量身定制了框架广告，投放了138个三线城市，迅速引起各地方年轻人的强烈消费欲望，投放当周内，勇闯天涯superX销量暴增100%，甚至有些城市的餐厅内出现了断货现象，品牌成功引爆各城市年轻群体。<br/>
                            当市场进行变革，越来越多的年轻消费者涌入啤酒市场，原地等待只能注定被时代抛弃。在大时代的背景下，雪花啤酒作为啤酒行业的领军品牌，及时调整品牌战略，扩大产业布局，重新打造属于啤酒行业的年轻时代。雪花啤酒不仅完成了产品的重组升级，更积极致力于与年轻消费者产生深层次的交流互动。
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Container;
