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
  state = {masterCharacter: {}};

  handleChange = (attrib, value) => {
    let newObj = this.state.masterCharacter;
    newObj[attrib] = value;
    this.setState({masterCharacter: newObj});
  }

  render() {
    const {masterCharacter} = this.state;
    return (
      <Tabs defaultIndex={0}>
    		<TabList>
    			<Tab>Archetype</Tab>
    			<Tab>Career</Tab>
    			<Tab>Talents</Tab>
          <Tab>Skills</Tab>
          <Tab>Motivations</Tab>
          <Tab>About</Tab>
    		</TabList>
        <TabPanel>
          <Archetype archetype={masterCharacter.archetype} handleChange={this.handleChange}/>
        </TabPanel>
        <TabPanel>
          <Career career={masterCharacter.career} handleChange={this.handleChange}/>
        </TabPanel>
        <TabPanel>
          <Talent/>
        </TabPanel>
        <TabPanel>
          <Skill/>
        </TabPanel>
        <TabPanel>
          <Motivation motivations={masterCharacter.motivations} handleChange={this.handleChange}/>
        </TabPanel>
        <TabPanel>
          <About/>
        </TabPanel>
      </Tabs>
      );
  }
}
