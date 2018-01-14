import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Archetype from './Archetype';
import Characteristics from './Characteristics';
import Career from './Career';
import Motivation from './Motivation';
import Skill from './Skill';
import Talents from './Talents';
import About from './About';

export default class MainPage extends React.Component {
  render() {
    return (
      <Tabs defaultIndex={1}>
    		<TabList>
    			<Tab>Archetype</Tab>
          <Tab>Characteristics</Tab>
          <Tab>Career</Tab>
          <Tab>Motivations</Tab>
          <Tab>Skills</Tab>
          <Tab>Talents</Tab>
          <Tab>About</Tab>
    		</TabList>
        <TabPanel>
          <Archetype />
        </TabPanel>
        <TabPanel>
          <Characteristics />
        </TabPanel>
        <TabPanel>
          <Career />
        </TabPanel>
        <TabPanel>
          <Motivation />
        </TabPanel>
        <TabPanel>
          <Skill />
        </TabPanel>
        <TabPanel>
          <Talents />
        </TabPanel>
        <TabPanel>
          <About />
        </TabPanel>
      </Tabs>
      );
  }
}
