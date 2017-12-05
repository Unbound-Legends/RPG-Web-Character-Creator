import React from 'react';
import ReactDOM from 'react-dom';
import Channel from './channel';
import './index.css';
import * as firebase from 'firebase';
import config from './config';
firebase.initializeApp(config.config);

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
  var webApp =
  <div>
    <h1>BLANK PAGE</h1>
  </div>;

ReactDOM.render(
    webApp,
    document.getElementById('root')
  );
};
