import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';

import GetData from 'Common/GetData';
import Action from 'Common/GetData/Action';
import ID from './ID';
import store from './reducers/store';
import Container from './Container';

import "./index.less";

const Index = connect(state => {
    return {
        state: state[ID],
    };
}, Action(ID))(GetData({
    id: ID,
    component: Container,
    stop: true
}));

render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById('layout-main')
);
