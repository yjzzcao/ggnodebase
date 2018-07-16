import React, { Component, Fragment } from 'react';

class Carousel extends Component {
    render() {
        return (
            <div id="carousel-generic" className="carousel slide" data-ride="carousel" data-interval="50000">
                <ol className="carousel-indicators">
                    <li data-target="#carousel-generic" data-slide-to="0" className="active"></li>
                    <li data-target="#carousel-generic" data-slide-to="1"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="item active" style={{ backgroundColor: '#0b131f', backgroundImage: `url(${require('./images/banner1.png')})` }}>
                        <div className="carousel-caption banner1">
                            <div className="container">
                                <img className="font" src={require('./images/banner1字.png')} alt="font" />
                                <a href="javascript:void(0)">
                                    查看案例<img src={require('./images/link-arrow1.png')} width="48" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="item" style={{ backgroundColor: '#c6c6c6', backgroundImage: `url(${require('./images/banner2.png')})` }}>
                        <div className="carousel-caption banner2">
                            <div className="container">
                                <img className="font" src={require('./images/banner2字.png')} alt="font" />
                                <a href="javascript:void(0)">
                                    查看案例<img src={require('./images/link-arrow2.png')} width="48" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Container extends Component {
    render() {
        return (
            <Fragment>
                <Carousel />
                <div className="container">Welcome Express React</div>
            </Fragment>
        );
    }
}

export default Container;
