import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import config from './config';
import Channel from './channel';
import './index.css';
import Archetype from './pages/Archetype';
import Career from './pages/Career';
import Talent from './pages/Talent';

firebase.initializeApp(config);

if (window.location.pathname !== '/') {
  var channel = window.location.pathname.slice(1).toLowerCase();
}

if (channel !== undefined) {
  startUp();
} else {
  setChanPage();
}

function setChanName(chanName) {
  window.location = `/${chanName}`;
}

function setChanPage() {
  ReactDOM.render(
    <Channel setFormChan={setChanName} />,
    document.getElementById('root')
  );
}

function startUp () {
  var webApp = <Career />;

ReactDOM.render(
    webApp,
    document.getElementById('root')
  );
};
