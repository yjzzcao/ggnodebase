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
                        <li className="active">公司简介</li>
                    </ol>
                    <h1>公司简介</h1>
                    <h3>国内电梯媒体平台</h3>
                    <p>
                        梯电传媒是国内三线城市电梯媒体投放首选平台，中国品牌50强超过一半选择我们。<br/>
                        梯电传媒覆盖全国最有价值的138个核心三线城市，超过20万电梯资源，媒体总量超过60万面，每个城市的媒体资源市场份额均在80%以上，是品牌迅速占领三线城市核心消费人群的优质资源。
                    </p><p>
                        梯电传媒推出“百企百城”计划，帮助100家企业品牌下沉，占领100余个三线城市，该计划面向首批签约的100家企业，以最具有竞争力的价格提供以下营销解决方案：
                    </p><p>
                        <span className="blank">1. 品牌需求调研</span><br/>
                        包括为品牌在138个最有价值的三线城市精品小区内向目标人群进行需求调查，最终将所有城市的广告投放收入比进行排序，更好的帮助品牌筛选目标城市，以达到广告投放效果的最优策略。<br/>
                        <span className="blank">2. 品牌投放建议</span><br/>
                        包括具体投放哪些城市的哪些社区与写字楼，以及针对不同的城市特点与文化，我们将提供针对每个城市的海报内容建议。<br/>
                        <span className="blank">3. 品牌效果监测</span><br/>
                        包括对每一部电梯的广告画面进行拍照，每周进行复查，对期间损坏的广告位将十倍赔偿，同时向品牌商提供监测报告。<br/>
                        <span className="blank">4. 品牌转化统计</span><br/>
                        包括对客户最终投放的所有城市的楼宇用户进行品牌购买行为转化统计，与品牌商内部增长数据进行对比论证是否一致。
                    </p>
                    <h3>海外电梯媒体平台</h3>
                    <p>
                        梯电传媒的海外营销服务品牌名称为“出海易”。出海易作为全球媒体资源平台，为出海企业提供落地营销解决方案，让企业全球化更加容易。<br/>
                        出海易是向中国企业提供海外落地营销解决方案的领军品牌，作为全球优质媒体资源平台，公司帮助中国两万家出海企业在全球快速扩张，让企业享受“一带一路”的巨大历史机遇，坐拥全球化红利，赢得企业的国际声誉与收益。
                    </p><p>
                        出海易在全球掌握城市电梯媒体核心资源，电梯作为一个国家与一座城市的重要基础设施，是最日常的生活场景，电梯更是城市主流人群每天的必经之路，具有高频与低干扰的特点，这正是在今天能够引爆品牌的最核心以及最稀缺的资源。出海易的业务已经覆盖主要的亚洲国家，包括印度、韩国、巴基斯坦、孟加拉国、泰国、菲律宾、印尼、越南、马来西亚、新加坡等10余个国家，而且正在逐步拓展欧美的业务。每天出海易的媒体资源覆盖4亿城市人口，超过200多个城市以及200万个电梯终端。
                    </p><p>
                        出海易的客户主要针对中国有出海需求的企业，中国企业出海是大势所趋，许多中国品牌都在积极贯彻2013年习近平主席提出的“一带一路”倡议，响应国内新时代全球化号召，这也成为了有史以来国内品牌进军海外的最大发展动力。这些品牌包括联想、华为、小米、OPPO、VIVO、一加等消费电子行业、也包括阿里巴巴、腾讯、百度、京东、猎豹等互联网企业、还包括海尔、海信、TCL、格力、美的等家电企业，更有吉利、长城、比亚迪、奇瑞、江淮等汽车品牌。
                    </p>
                </div>
            </div>
        );
    }
}

export default Container;
