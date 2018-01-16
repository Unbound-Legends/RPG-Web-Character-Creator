import React from 'react';
import {changeChannel} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getData } from '../actions/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Archetype from './Archetype';
import Characteristics from './Characteristics';
import Career from './Career';
import Motivation from './Motivation';
import Skill from './Skill';
import Talents from './Talents';
import About from './About';

const channel = window.location.pathname.slice(1);
const dataTypes = [
    'archetype',
    'archetypeSpecialSkills',
    'career',
    'careerSkills',
    'masterMotivations',
    'masterSkills',
    'masterTalents',
    'masterCharacteristics'
  ];

class MainPage extends React.Component {

  componentDidMount() {
    this.props.changeChannel(channel);
    dataTypes.forEach((type) => this.props.getData(channel, type));
  }

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

function mapStateToProps(state) {
    return {
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeChannel: changeChannel, getData: getData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage);
