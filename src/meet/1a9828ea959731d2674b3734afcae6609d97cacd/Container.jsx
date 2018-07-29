import React, { Component, Fragment } from 'react';
import $ from 'lib/jquery';

class Container extends Component {
    render() {
        return (
            <Fragment>
                <div className="banner">
                    <img src={require('./images/会议第八届数字营销banner.png')} alt="会议第八届数字营销banner" />
                </div>
                <div className="zhanwei">
                    <div className="tab-nav" data-spy="affix" data-offset-top="270">
                        <div id="navbar" className="container">
                            <ul className="nav nav-tabs" role="tablist">
                                <li><a href="#notice">会议通知</a></li>
                                <li><a href="#address">会议地址</a></li>
                                <li><a href="#schedule">会议日程</a></li>
                                <li><a href="#guest">会议嘉宾</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <ol className="breadcrumb">
                        <li>首页</li>
                        <li>会议活动</li>
                        <li className="active">2018第八届数字营销与社交媒体峰会</li>
                    </ol>
                    <section className="section-box1">
                        <h3 id="notice"><div>会议通知</div></h3>
                        <div className="content">
                            <div className="title">2018第八届数字营销与社交媒体峰会</div>
                            <div className="blue">会议内容</div>
                            <p>互联网+时代已经来临。随着数字技术和社交媒体的快速发展，沟通渠道，设备以及模式越来越多样化和复杂化。研究表明近一半的人已经参与到数字化活动特别是社交媒体中。企业间的互动已经完全进入到数字化时代。大多数营销者都面临着同样的挑战：如何整合线上和线下资源和渠道？如何提升消费者参与度？如何创建内容能够真正的与你的目标客户群建立联系？如何提升数字营销 ROI 以及设 定 KPI? 来加入我们 2018 年 9 月 5 日到 7 日举办的第八届中国数字营销&社交媒体峰会，您的这些疑问都可以得到解答。 </p>
                            <p>本届峰会将关注品牌如何运用数字营销工具，分享最新的数字营销方法，创新策略和最佳解决方案。 讨论品牌如何成功的监控和评估数字营销的 ROI 以及重要的社交工具如何帮助营销者实现理想的营销效果。 第七届中国数字营销&社交媒体峰会 2018 将邀请数字营销和社交媒体领域专业人士一起探讨最新的热点话题和挑战。来自国际知名 B2B, B2C 行业的数字营销专家会会分享最新案例和经验，这是一次耳目一新的思想碰撞和最新案例分享的盛会我们期待和您相遇在九月！</p> 
                            <div className="blank">为什么参加？</div>
                            <p>
                                加快企业社交媒体使用的步伐<br />
                                采用最优的社交媒体渠道与您的客户进行交流<br />
                                了解最新的新媒体趋势例如互联网+，内容营销，粉丝经济，程序化购买<br />
                                结合使用社交媒体，公共关系和广告实现最佳的营销策略<br />
                                借助客户的力量实现口碑营销和品牌忠诚度<br />
                                更好的理解和分析社交媒体数据以及如何利用这些数据<br />
                                提升您的营销和宣传策略<br />
                            </p>
                            <div className="blank">谁应该参加？</div>
                            <p>
                                负责以下领域的总经理、副总裁、总监和经理：<br />
                                营销、数码营销、互动营销、移动营销、在线营销、企业沟通、公共关系、品牌推广、客户关系、社交媒体、广告、社会化商业、社会团体、 危机管理。
                            </p>
                        </div>
                    </section>
                    <section  className="section-box2">
                        <h3 id="address"><div>会议地址</div></h3>
                        <div className="content">
                            <div className="title">会议地点：上海 上海龙之梦大酒店 长宁区延安西路1116号</div>
                        </div>
                    </section>
                    <section  className="section-box3">
                        <h3 id="schedule"><span className="note">（最终日程以会议现场为准）</span><div>会议日程</div></h3>
                        <div className="content">
                            <div className="blue">9月15日</div>
                            <p>
                                <span className="-time">09:00-09:45</span> 第一讲：B2B潜在顾客开发&数字营销<br/>
                                Davis Pang，首席运营宫兼创始人，致趣百川
                            </p>
                            <p>
                                <span className="-time">09:45-10:30</span> 第二讲市场营销-说服人的艺术以及所需要的科学依据<br/>
                                面向数字消费者的全渠道购物体验；存储虚拟现实体验，在线定制产品；在线购买，离线交付；检查库存在线；网上购物，离线退货/换货<br/>
                                Ben Hassing,电商与技术高级副/总裁，沃尔玛
                            </p>
                            <p>
                                <span className="-time">10:30-10:50</span> 休息
                            </p>
                            <p>
                                <span className="-time">10:50-11:35</span> 第三讲：B2C电子商务市场概况与经验分享<br/>
                                Farrukh Shad,零售战略和电子商务高级副总裁，施耐德电气
                            </p>
                            <p>
                                <span className="-time">11:35-12:20</span> 第四讲：通过360度新媒体活动推动新产品发布<br/>
                                Brian Chan,市场总监，好时巧克力
                            </p>
                            <p>
                                <span className="-time">12:20-13:20</span> 午餐
                            </p>
                            <p>
                                <span className="-time">13:20-14:05</span> 第五讲：数字消费者决策过程与在线生态系统<br/>
                                深入了解消费者的需求，制定高度相关的战略建议，以满足未满足的需求，并在数字消费者决策过程中转换为适当的数字内容/工具。<br/>
                                建立一个包括启动前、启动后和启动阶段的在线生态系统，并评估数字营销投资ROl。<br/>
                                陶石泉,江记酒庄董事长,江小白
                            </p>
                            <p>
                                <span className="-time">14:05-14:50</span> 第六讲：培养与客户的情感联系<br/>
                                没有人买钻头只是想要买一个钻头，他想要的是一个孔。但是他又是真的想要一个孔吗？这个人买钻头或许只是想买“他对他家人的爱”他是想要把全家照挂在家里的墙上，所以我们不应该问“你想在哪里打孔\"，而应该问“你想挂些什么”。有效的营销吸引是情感而不是理性。在这个我们要用做点什么和买点什么来表达自己的时代，如何用情感在产品服务和品牌上塑造我们的想法。<br/>
                                Wini Wong,全球营销执行副总裁，EF英孚教育
                            </p>
                            <p>
                                <span className="-time">14:50-15:20</span> 休息
                            </p>
                            <p>
                                <span className="-time">15:20-16:20</span> 第七讲：什么是新的品牌和新的零售业，为什么跨国公司在这个竞争中获胜更难?<br/>
                                顾客导向；数据驱动；全渠道营销策略<br/>
                                Lu Guo,Shopal创始人兼首席执行官；<br/>
                                Johnson&iohnson 数字电子商务的前副总裁
                            </p>
                            <p>
                                <span className="-time">16:20-17:05</span> 第八讲：低关心度的产品如何让消费者感兴趣？<br/>
                                四个轮胎是汽车和地面之间唯一的接触点。汽车的性能依赖于它。所以非常重要，对吧？然而，中国消费者的驾驶年龄平均为3.5年。第一次拥有汽车的消费者不了解轮胎，不在乎轮胎，直到他们的轮胎没气了！米其林是一个领先的轮胎制造商，但它还有另一个身份，称为“米其林指南”，它决定了哪些是世界上最好的餐厅。米其林在中国还拥有汽车后市场最大的连锁网络，在米其林的市场营销策略中，这些资产是如何叠加结合利用的？米其林如何管理消费者，在“数字\"和“新零售”时代创造更好的价值呢？<br/>
                                Clara Gao,BTC高级市场总监，米其林（中国）投资有限公司
                            </p>
                            <p>
                                <span className="-time">17:05-17:50</span> 第九讲：创造连接消费者和品牌的体验<br/>
                                体验式营销让消费者通过一对一的互动与品牌建立联系。CMO专家组将分享大型品牌吸引新客户的方式，他们极具创意的参与活动利用高科技和深入的客户洞察力进行讨论详细说明如何在营销策略中使用个人和可共享的实时体验将扩大覆盖范围，转换客户并推动销售。<br/>
                                Wini Wong,全球营销执行副总裁，EF英孚教育<br/>
                                叶立森，高级营销总监，Valio<br/>
                                Tor Petersen,首席技术官，SpaceCycle<br/>
                                Mika Kanai,资生堂数字营销总经理
                            </p>
                            <div className="blue">9月6号</div>
                            <p>
                                <span className="-time">09:00-09:45</span> 第一讲：品牌数字趋势与2018战略<br/>
                                如果你认为2017对于数字战略和营销来说是个爆炸性的一年，那就为2018做好准备吧。你工作的冲动和反复无常，2018更具挑战性，考验你避免不稳定决策的能力，找出对你的企业至关重要的因素以及你可以忽略的东西。随着关键技术的成熟和用户行为的遵循，这些是您在2018岁以后应该记住的趋势。<br/>
                                区块链；3DVR和物联网进行动量；UX成为CX；内容战略的演变；RTA实时分析<br/>
                                赞助商待定
                            </p>
                            <p>
                                <span className="-time">09:45-10:30</span> 第二讲：基于账户的内容营销-在营销策略之前识别潜在客户<br/>
                                在您终于触及B2B决策者之前，定位并与之互动是至关重要的。基于帐户的营销（ABM）是一项具有针对性和高效率的战略举措。通过打破销售和营销之间的隔阂，ABM供了一个特定的营销过程在一个统一的目标下，帮助识别，达到并影响目标客户，从而实现您的业务目标.Linkedln Account Targeting和Linkedln Marketing Solutions(LMS)是ABM的重要组成部分和工具，它们都基于LinkedLi的动态大日期池。<br/>
                                Vianne Cai营销解决方案总经理，领英中国
                            </p>
                            <p>
                                <span className="-time">10:30-10:50</span> 休息
                            </p>
                            <p>
                                <span className="-time">10:50-11:35</span> 第三讲：Mad Tech 和区块链在数字变革中的崛起<br/>
                                Vincent Lee 亚太地区陶氏化学公司数字营销与通讯
                            </p>
                            <p>
                                <span className="-time">11:35-12:20</span> 第四讲：如何通过数字视频建立消费者的参与度<br/>
                                Julius Marcea,宝马集团中国客户关系管理总监，华晨宝马汽车，
                            </p>
                            <p>
                                <span className="-time">12:20-13:30</span> 午餐
                            </p>
                            <p>
                                <span className="-time">13:30-14:30</span> 第五讲：建立完整的B2B数字营销路线图<br/>
                                B2B的数字营销战略；案例分析；完整的B2B数字营销 Rodemap；B2B品牌和集成在线和离线资源的战略；B2C模式在B2B企业中的一些趋势和成功经验<br/>
                                王焕，首席数字官，圣龙班中国
                            </p>
                            <p>
                                <span className="-time">14:30-15:15</span> 第六讲：数字化营销在医药行业的运用<br/>
                                Yi Hou,IT总监礼来公司
                            </p>
                            <p>
                                <span className="-time">15:15-15:35</span> 休息
                            </p>
                            <p>
                                <span className="-time">15:35-16:20</span> 第七讲：大数据引领社会营销<br/>
                                深入介绍腾讯社交广告如何以数据洞察为基础，以更精准的人群肖像、更匹配的营销场景、更动人的理念，帮助品牌与用户建立一个温度连接，引领营销步入智能化时代。<br/>
                                TBD
                            </p>
                            <p>
                                <span className="-time">16:20-17:05</span> 第八讲：捕获ROI成功：数字营销的KPI设置<br/>
                                Eric Li,公关和营销服务的高级总监，雅培营养中国
                            </p>
                            <p>
                                <span className="-time">17:05-17:50</span> 第九讲：社交媒体如何能真正帮助到销售转化<br/>
                                Sandy Zhang,市场总监，亚马通
                            </p>
                            <p>
                                <span className="-time">17:50-20:00</span> 鸡尾酒会
                            </p>
                            <div className="blue">9月7日</div>
                            <p>
                                <span className="-time">09:00-09:45</span> 第一讲:数字化转型与商业模式创新<br/>
                                Chrise WANG，科思创亚太区客户体验数字化总监，汉高粘合剂技术
                            </p>
                            <p>
                                <span className="-time">09:45-10:30</span> 第二讲：B2B企业如何拥抱数字时代<br/>
                                钟路音，公关传播和广告推广总监，GE医疗集团大中国区
                            </p>
                            <p>
                                <span className="-time">10:30-10:50</span> 休息
                            </p>
                            <p>
                                <span className="-time">10:50-11:35</span> 第三讲:B2B企业在社会化媒体中的应用与价值<br/>
                                传统制造业通过社会化媒体平台获取舆情数据，构建产品和销售平台，管理客户，进行内部和外部的数据交换，并利用现有实体基于位置和需求的新的O20渠道，适合B2B业务内容和品牌的社会化媒体营销。<br/>
                                Ela Xu,市场总监，施耐德电气
                            </p>
                            <p>
                                <span className="-time">11:35-12:00</span> 第四讲如何将B2B业务归档到电子商务模式？<br/>
                                对于B2B营销，如何计算您对企业的贡献以及如何证明自己；B2B行业的电子商务挑战以及如何突破障碍。<br/>
                                Louisa Luo,公关经理&首席用户体验宫，GSK
                            </p>
                            <p>
                                <span className="-time">12:20-13:30</span> 午餐
                            </p>
                            <p>
                                <span className="-time">13:30-14:20</span> 第五讲新时期数字营销的本质<br/>
                                用户和产品争夺（公司战略）；大品牌与小品牌争夺（品牌战略）；真假数字营销竞争（营销战略）；好的和坏的内容营销（内容营销）<br/>
                                主持人：Lucy Feng，欧司朗亚太区汽车照明亚太区营销总监<br/>
                                王换，首麻数字宫，圣龙班中国<br/>
                                Cathy Gu,首席知识官，市场部网<br/>
                                Adam Cheng,伟迪捷（上海）标识技术有限公司，大中华区产品管理与市场总监<br/>
                                Chunhua Lu,对外通讯总监，雷尼韦尔中国<br/>
                                Ella Xu,市场总监，施耐德电气
                            </p>
                            <p>
                                <span className="-time">14:20-15:05</span> 第六讲:品牌跨界营销<br/>
                                Jay Jiang,企业传讯副总裁，博世（中国）投资有限公司
                            </p>
                            <p>
                                <span className="-time">15:05-15:35</span> 休息
                            </p>
                            <p>
                                <span className="-time">15:35-16:20</span> 第七讲：闭环分析驱动PPC有效性<br/>
                                PPC（按点击付费）被营销人员更广泛地用于工业产品，但是随着预算限制/CPC（点击成本）的增加，我们也面临广告支出减少的回报。除了营销团队和销售团队的合作之外，营销人员利用PPC的闭环分析将增强PPC的有效性，使营销人员在PPCADSLP（登陆页面）的聊天/呼叫/形式领先者的闭环上更具可见性，并采取正确的对策来实现PH、PPC目标。<br/>
                                程峰，大中华区产品管理与市场总监，伟速捷（上海）标识技术有限公司
                            </p>
                            <p>
                                <span className="-time">16:20-17:05</span> 第八讲：如何掌握微信和其他社交媒体工具<br/>
                                通过微信等社交媒体工具的提高，我们的营销方式已经发生了很大的变化。在今天的会议上，我们将探讨在中国社会媒体的最新趋势，包括当前的内容需求、产业结构和商业模式。您还将了解如何：<br/>
                                通过新媒体增加线上/线上销售；无预算地扩大品牌知名度；经营成长你的微信账号有效没有预算<br/>
                                Peter Petermann,首麻战略宫麦迪逊邦
                            </p>
                            <p>
                                <span className="-time">17:05-17:50</span> 第九讲：TBD
                            </p>
                            <p>
                                <span className="-time">17:50</span> 结束
                            </p>
                        </div>
                    </section>
                    <section  className="section-box4">
                        <h3 id="guest"><span className="note">（最终出席嘉宾以会议现场为准）</span><div>会议嘉宾</div></h3>
                        <div className="content">
                            <p>
                                Ben Hassing, 电商与技术高级副总裁，沃尔玛<br/>
                                Stella Zhong, 战略倡议与营销共享服务副总裁, 百胜中国<br/>
                                Mahmoud El Salahy,总经理，中国威富公司北面<br/>
                                陶石泉, 江记酒庄董事长, 江小白<br/>
                                Wini Wong, 全球营销执行副总裁，EF英孚教育<br/>
                                梅林，营销副总裁，强生<br/>
                                邓进, 华东地区总经理, 悠易互通<br/>
                                Wini Wong, 全球营销执行副总裁，EF英孚教育<br/>
                                梅林，营销副总裁，强生<br/>
                                Vivian Xiao, 传播总监，飞利浦照明<br/>
                                冯莲, 数字副总裁，麦当劳<br/>
                                Vianne Cai, 营销解决方案总经理，领英中国<br/>
                                Vivienne Gong, 全球运营和营销主管,今日头条<br/>
                                Julius Marcea, Head of CRM,宝马集团中国<br/>
                                Claire Li,市场部总监，通用电气公司<br/>
                                王祥宇，总经理，腾讯<br/>
                                Eric Li，公关和营销服务的高级总监，雅培营养中国<br/>
                                Victoria Chen,大数据及分析总监，阿里巴巴集团<br/>
                                主持人: 顾婷婷, 首席知识官，市场部网<br/>
                                王焕，首席数字官，圣戈班中国<br/>
                                Kris Tan, 业务发展和传播总监, 凯斯纽荷兰工业公司<br/>
                                Chrise WANG, 亚太区客户体验数字化总监，汉高粘合剂技术<br/>
                                邓进, 华东地区总经理, 悠易互通<br/>
                                待定,信息技术总监,礼来公司<br/>
                                Chrise WANG, 亚太区客户体验数字化总监，汉高粘合剂技术<br/>
                                钟路音, 公关传播和广告推广总监，GE医疗集团大中国区<br/>
                                Jay Jiang，企业传讯副总裁，，博世（中国）投资有限公司<br/>
                                Farrukh Shad，零售战略和电子商务高级副总裁，施耐德电气<br/>
                                王焕，首席数字官，圣戈班中国<br/>
                                Clare Xu, 中国和亚太地区传播总监，赛诺菲制药<br/>
                                Peter Petermann, 首席战略官, 麦迪逊邦<br/>
                            </p>
                        </div>
                    </section>
                </div>
            </Fragment>
        );
    }
    componentDidMount() {
        $(window).on('hashchange', function () {
            const $target = $(location.hash);
            if ($target.length === 1) {
                const top = $target.offset().top - 132;
                $('html,body').animate({ scrollTop: top }, 200);
            }
        });
    }
}

export default Container;