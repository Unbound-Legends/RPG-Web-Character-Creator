import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'react-popup';
import * as firebase from 'firebase';
import './styles/index.css';
import config from './config';
import Channel from './pages/Channel';
import MainPage from './pages/MainPage';

firebase.initializeApp(config);

if (window.location.pathname !== '/') var channel = window.location.pathname.slice(1);

ReactDOM.render(
  channel ? <MainPage /> : <Channel />,
  document.getElementById('root')
);
ReactDOM.render(
  <Popup />,
  document.getElementById('popupContainer')
);
