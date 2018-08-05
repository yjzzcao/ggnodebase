import React, { Component, Fragment } from 'react';

class Container extends Component {
    render() {
        return (
            <Fragment>
                <div className="banner">
                    <img src={require('./images/故事农行.png')} alt="故事农行" />
                    <div className="note">农行手机银行客户数量大幅增长</div>
                </div>
                <div className="container">
                    <img className="cut-off-line" src={require('./images/故事详情分割线.png')} alt="故事详情分割线" />
                    <div className="box">
                        <ol className="breadcrumb">
                            <li>首页</li>
                            <li>成功故事</li>
                            <li className="active">农行手机银行客户数量大幅增长</li>
                        </ol>
                        <h3>农行手机银行客户数量大幅增长</h3>
                        <p>
                            农行手机银行，是中国农业银行为手机用户提供的专用客户端软件，集金融应用和增值服务于一体，意在满足客户自由、方便、快捷、潮流的移动金融需求，截止2017年末，掌上银行用户总数达2.06亿户，全年交易额达31.8万亿元。但农行手机银行一直希望用户数量能再进一步有所突破，在一二线城市用户量饱和且获客成本居高不下的背景下，农行希望进一步拓展三线城市的用户，通过网点营销与场景营销相结合的方式进行。<br/>
                            梯电传媒在与农行手机银行签订合作协议后，首先帮助农行在上百个三线城市做了客户调研，结果显示，三线城市的农行用户有50%仍在首选柜台与网银转账，将这部分客户转化为手机银行客户是很现实的举措。通过持续一个月的电梯媒体对农行手机银行的传播，不仅很好带动了农行客户转化为手机银行客户，而且极大带动了非农行客户转化为农行客户，同时开通了农行手机银行。<br/>
                            未来，农行秉承“开放、定制、整合、共享”的核心服务理念，持续加强掌上银行产品和服务创新。掌上银行将基本覆盖存款、贷款、转账、投资理财、信用卡等各类金融服务。</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Container;
