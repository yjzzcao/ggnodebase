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
                            <li><a href="/about/join">天梯招聘</a></li>
                            <li><a href="/about/contact">联系电梯</a></li>
                        </ul>
                    </div>
                </div>
                <div className="left">
                    <ol className="breadcrumb">
                        <li>关于电梯</li>
                        <li className="active">梯电招聘</li>
                    </ol>
                    <h1>梯电招聘</h1>
                    <h3>数据分析经理</h3>
                    <p>
                        <span className="blank">工作职责</span><br/>
                        1、深入理解公司相关业务的方向和需求，应用先进的统计建模、数据挖掘、机器学习等方法建立数据模型，提供决策建议<br/>
                        2、指导客户进行业务数据分析<br/>
                        3、参与规划公司相关业务数据分析平台建设<br/>
                        4、其他临时性项目性工作
                    </p>
                    <p>
                        <span className="blank">任职资格</span><br/>
                        1、本科及以上学历，统计学、数学、经济学等相关专业<br/>
                        2、有营销领域数据建模、分析等工作经验者优先<br/>
                        3、具备良好的执行力、沟通协调能力、分析判断能力<br/>
                        4、积极主动，能够自我驱动，追求卓越<br/>
                        5、精通各类数据统计模型和数据挖掘技术，并有独立完整的建模实践经验<br/>
                        6、熟练使用主流数据分析工具及数据挖掘工具
                    </p>

                    <h3>大客户销售总监</h3>
                    <p>
                        <span className="blank">工作职责</span><br/>
                        1.负责大客户销售工作，完成年度销售目标<br/>
                        2.负责大客户的开发、跟进工作<br/>
                        3.维护区域内的大客户关系，深度挖掘老客户的需求<br/>
                        4.研究市场需求，为客户提供可执行的建议与执行方案
                    </p>
                    <p>
                        <span className="blank">任职资格</span><br/>
                        1.拥有5年以上的广告、媒体等全国性大客户销售管理经验<br/>
                        2.拥有丰富的客户资源<br/>
                        3.能适应一定的出差频率
                    </p>
                    <h3>海外公司“出海易”团队副总经理</h3>
                    <p>
                        <span className="blank">工作职责</span><br/>
                        1.协助总经理组建经营团队，完善管理体系、制度、业务流程和运营标准<br/>
                        2.根据公司下达的业绩目标制定公司整体业务发展规划和经营计划<br/>
                        3.监督各部门工作的执行，对所负责经营团队工作绩效进行追踪<br/>
                        4.负责带领团队达成广告销售目标
                    </p>
                    <p>
                        <span className="blank">任职资格</span><br/>
                        1.广告行业 8 年以上工作经验，拥有丰富大客户资源储备和塑造优秀销售团队经历<br/>
                        2.熟悉广告运营公司运营管理，熟悉广告行业运作模式<br/>
                        3.具有较强的市场开拓能力<br/>
                        4.能够熟练的使用英语口语<br/>
                        5.能够适应长期在东南亚国家出差
                    </p>
                </div>
            </div>
        );
    }
}

export default Container;
