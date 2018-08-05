import React, { Component, Fragment } from 'react';

class Container extends Component {
    render() {
        return (
            <Fragment>
                <div className="banner">
                    <img src={require('./images/故事云闪付.png')} alt="故事云闪付" />
                    <div className="note">银联云闪付APP日均二维码交易量快速增长近九成</div>
                </div>
                <div className="container">
                    <img className="cut-off-line" src={require('./images/故事详情分割线.png')} alt="故事详情分割线" />
                    <div className="box">
                        <ol className="breadcrumb">
                            <li>首页</li>
                            <li>成功故事</li>
                            <li className="active">银联云闪付APP日均二维码交易量快速增长近九成</li>
                        </ol>
                        <h3>银联云闪付APP日均二维码交易量快速增长近九成</h3>
                        <p>银联云闪付是银联专为移动互联网打造的统一品牌，围绕云闪付，银联建立了完整的产品体系，为四方模式生态系统下的发卡、收单、商户以及持卡人提供全方位的服务。2017年12月11日，中国银联携手商业银行、支付机构等产业各方共同发布银行业统一APP“云闪付”。梯电传媒通过和银联云闪付合作，为银联云闪付在超过100个三线城市进行了电梯媒体的APP推广，推广当天的APP下载量即占据APP Store榜首，一周之后，银联云闪付APP日均二维码交易量快速增长近九成。银联市场相关负责人郑先生表示：“我们对梯电传媒的执行效率和服务质量十分认可，对梯电传媒的支持力度和服务能力非常满意。梯电传媒帮助银联云闪付获取了广大客户的认可，让更多的城市用户下载并使用银联云闪付APP，期待双方未来在市场营销等领域的深度合作。”未来，银联会更加树立品牌价值，完善品牌内容。云闪付从最初的移动支付品牌，囊括HCE、可穿戴、手机Pay到加入金融IC卡、二维码等的支持，形成如今的云闪付体系，再到成立“云闪付”APP，经过了一段改进与变化的过程，这也表现了银联云闪付一直没有停下前进的脚步。而云闪付要进步，也需要不断拓展新功能。</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Container;
