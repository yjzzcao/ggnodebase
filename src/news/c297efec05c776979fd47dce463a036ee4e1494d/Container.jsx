import React, { Component } from 'react';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <div className="catalog">
                    <div className="title"><div>更多新闻</div></div>
                    <ul>
                        <li>
                            <a className="title" href="/news/2db541edaa028cd6376d252c0ece0dee0c05c585">梯电传媒与雪花啤酒达成战略合作</a>
                            <div className="create-time">新闻 | 2018年6月25日</div>
                        </li>
                        <li>
                            <a className="title" href="/news/664117987f40543870dfe5ce934a11ed5fc992ea">梯电传媒与蓝月亮达成战略合作</a>
                            <div className="create-time">新闻 | 2018年5月16日</div>
                        </li>
                        <li>
                            <a className="title" href="/news/c297efec05c776979fd47dce463a036ee4e1494d">梯电传媒与李奥贝纳广告公司举行会谈</a>
                            <div className="create-time">新闻 | 2018年4月20日</div>
                        </li>
                        <li>
                            <a className="title" href="/news/eb7e380b2b1f9c1b474f522800276a20938f1674">2018年中国广告营销发展趋势：广告市场总体增速放缓，但生活圈媒体和互联网广告细分市场保持较高景气度</a>
                            <div className="create-time">新闻 | 2018年4月19日</div>
                        </li>
                        <li>
                            <a className="title" href="/news/03c6b11c132ae19a0fc8c183b0e8e2abd73cfe53">广告市场复盘及展望：从媒体比较角度再论电梯媒体价值</a>
                            <div className="create-time">新闻 | 2018年3月1日</div>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <ol className="breadcrumb">
                        <li>首页</li>
                        <li>新闻</li>
                        <li className="active">梯电传媒与李奥贝纳广告公司举行会谈</li>
                    </ol>
                    <h3 className="title">梯电传媒与李奥贝纳广告公司举行会谈，共谋发展</h3>
                    <div className="create-time">2018年4月20日</div>
                    <p>
                        李奥贝纳广告公司（Leo Burnett Worldwide）是一家美国广告公司，于1935年由李奥·贝纳创立，现在是全球最大的跨国广告公司之一。广告公司的创始人李奥·贝纳于1935年创立的李奥贝纳广告公司，如今在全美13家年营业额超过10亿美元的大型广告公司之中名列前茅，年营业额在20亿美元。李奥贝纳”的客户包括全球25个最有价值品牌当中的 7个，如麦当劳、可口可乐、迪斯尼、万宝路、Kellogg、Tampax和Nintendo等，曾为“万宝路”牌香烟创立男性香烟的性格和美国西部牛仔的形象，把在美国市场上占有率不及1%的香烟，推到世界销售的第一位。2002年，它被世界第四大传媒集团阳狮国际收购。<br/>
                        双方在上海浦东香格里拉酒店举行了会谈，梯电传媒充分赞扬了李奥贝纳在广告创意领域的成果，双方沟通交流了未来的合作可能性，梯电传媒董事长陈曦说：“梯电传媒专注在三线城市的电梯媒体，很多客户在广告创意方面也希望交由梯电传媒来设计，但梯电传媒在创意方面需要向李奥贝纳学习，而且这方面双方也有非常大的合作空间，希望双方今后能够多多相互交流，争取早日实现实质性合作。<br/>
                        交谈后，双方一起共进了午餐，探讨了广告传媒行业未来的发展趋势。
                    </p>
                </div>
            </div>
        );
    }
}

export default Container;
