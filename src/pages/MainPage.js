import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../styles/tabs.css';
import Archetype from './Archetype';
import Career from './Career';
import Talent from './Talent';
import Skill from './Skill';
import Motivation from './Motivation';
import About from '../blocks/About'

export default class MainPage extends React.Component {

  render() {
    return (
      <Tabs defaultIndex={3}>
    		<TabList>
    			<Tab>Archetype</Tab>
    			<Tab>Career</Tab>
    			<Tab>Talents</Tab>
          <Tab>Skills</Tab>
          <Tab>Motivations</Tab>
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
          <Skill/>
        </TabPanel>
        <TabPanel>
          <Motivation/>
        </TabPanel>
        <TabPanel>
          <About/>
        </TabPanel>
      </Tabs>
      );
  }
}
