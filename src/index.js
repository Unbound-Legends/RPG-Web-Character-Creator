import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'react-popup';
import * as firebase from 'firebase';
import config from './config';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers';
import Channel from './components/Channel';
import MainPage from './components/MainPage';
require ('./styles/index.css');
require ('./styles/popup.css');
require ('./styles/tabs.css');

firebase.initializeApp(config);

const store = createStore(allReducers);

if (window.location.pathname !== '/') var channel = window.location.pathname.slice(1);

ReactDOM.render(
  <Provider store={store}>
    {channel ? <MainPage /> : <Channel />}
  </Provider>,
  document.getElementById('root')
);
ReactDOM.render(
  <Provider store={store}>
    <Popup />
  </Provider>,
  document.getElementById('popupContainer')
);
