import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'react-popup';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as firebase from 'firebase';
import './style/index.css';
import 'react-tabs/style/react-tabs.css';
import config from './config';
import Channel from './channel';
import Archetype from './pages/Archetype';
import Career from './pages/Career';
import Talent from './pages/Talent';
import About from './blocks/About'
firebase.initializeApp(config);

if (window.location.pathname !== '/') {
  var channel = window.location.pathname.slice(1).toLowerCase();
}
var webapp = '';
channel ? webapp =  mainPage(): webapp = loginPage();

render(webapp);

function setChanName(chanName) {
  window.location = `/${chanName}`;
}

function loginPage() {
  return <Channel setFormChan={setChanName} />;
}

function mainPage () {
  return (
    <Tabs>
  		<TabList>
  			<Tab>Archetype</Tab>
  			<Tab>Career</Tab>
  			<Tab>Talents</Tab>
        <Tab>About</Tab>
  		</TabList>
      <TabPanel>
        <Archetype/>
      </TabPanel>
      <TabPanel>
        <Career/>
      </TabPanel>
      <TabPanel>
        <Talent/>
      </TabPanel>
      <TabPanel>
        <About/>
      </TabPanel>
    </Tabs>
    );
}

function render(webapp) {
  ReactDOM.render(
    webapp,
    document.getElementById('root')
  );
  ReactDOM.render(
    <Popup />,
    document.getElementById('popupContainer')
  );
}
