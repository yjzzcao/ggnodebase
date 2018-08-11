import React, { Component } from 'react';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <ol className="breadcrumb">
                    <li>首页</li>
                    <li className="active">成功故事</li>
                </ol>
                <h1>成功故事</h1>
                <div className="list">
                    <a href="/story/b64f7d39f6ff9137cc2803acf4894ec9f2857d7a" className="item">
                        <img src={require('./images/全部成功故事1.png')} alt="全部成功故事1" />
                        <div className="content">
                            <div className="title">“云闪付”APP日均二维码交易量快速增长近九成</div>
                            <div className="note">银联云闪付是银联专为移动互联网打造的统一品牌，围绕云闪付，银联建立了完整的产品体系，为四方模式生态系统下的发卡、收单、商户以及持卡人提供全方位的服务...</div>
                        </div>
                    </a>
                    <a href="/story/51372ede0195c8c3c05a030c42430f7bcfe2a427" className="item">
                        <img src={require('./images/全部成功故事2.png')} alt="全部成功故事2" />
                        <div className="content">
                            <div className="title">农行手机银行客户数量大幅增长</div>
                            <div className="note">农行手机银行，是中国农业银行为手机用户提供的专用客户端软件，集金融应用和增值服务于一体，意在满足客户自由、方便、快捷、潮流的移动金融需求，截止2017年末，掌上银行用户总数达2.06亿户，全年交易额达31.8万亿元...</div>
                        </div>
                    </a>
                    <a href="/story/b72ff0d5c8542be42784c606041003116be97ae1" className="item">
                        <img src={require('./images/全部成功故事3.png')} alt="全部成功故事3" />
                        <div className="content">
                            <div className="title">雪花勇闯天涯superX 引爆今夏啤酒市场</div>
                            <div className="note">勇闯天涯superX是华润雪花啤酒自品牌重塑以来推出的首支核心产品，是华润雪花在新的产品开发理念、新的产品精酿技术、新的产品营销模式下推出的一款全新产品，上市后将覆盖餐饮终端等更广泛的渠道...</div>
                        </div>
                    </a>
                    <a href="/story/516b1928310792a9695db572b535172934304315" className="item">
                        <img src={require('./images/全部成功故事4.png')} alt="全部成功故事4" />
                        <div className="content">
                            <div className="title">著名汽车品牌成功出海越南</div>
                            <div className="note">对于中国汽车品牌想要在越南与日系、德系、韩系汽车争得市场份额并不容易，先如今，该汽车品牌已经在越南建立了组装厂，并在当地实现了良好的运营与销售，而这一切良好的开端都是好的产品与营销策略的完美结合...</div>
                        </div>
                    </a>
                    <a href="/story/0fe6e78e8562e9d719926d0bbc1f5a5a84883521" className="item">
                        <img src={require('./images/全部成功故事5.png')} alt="全部成功故事5" />
                        <div className="content">
                            <div className="title">知名手机品牌成功出海印度</div>
                            <div className="note">开疆拓土并非易事，而进军印度市场更是难上加难，这是非常棘手的市场，但不管面临多么艰巨的困难，勇往直前就能够扭转局面。对于该品牌在印度的成功，主要做对了三个事情...</div>
                        </div>
                    </a>
                    <a href="/story/4b6915b1acb3781bbd7ce072ddb2daf8f9906822" className="item">
                        <img src={require('./images/全部成功故事6.png')} alt="全部成功故事6" />
                        <div className="content">
                            <div className="title">新兴互联网品牌成功出海马来西亚</div>
                            <div className="note">该品牌此前主要通过搜索引擎、展示广告、联盟广告、邮件营销等方式进行推广，其中，搜索引擎是第一大流量入口，其有超过一半的流量来自谷歌，但是该企业逐渐发现与高额互联网营销费用不相匹配的是客户粘度很低...</div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Container;
