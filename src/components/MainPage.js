import React from 'react';
import {changeChannel} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getData } from '../actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { About, Archetype, Career, Characteristics, Motivation, Skill, Attributes, Talents, XPCounter, Critical } from './index';

const channel = window.location.pathname.slice(1);
const dataTypes = [
    'archetype',
    'archetypeSpecialSkills',
    'career',
    'careerSkills',
    'masterMotivations',
    'masterSkills',
    'masterTalents',
    'creationCharacteristics',
    'talentModifiers',
    'currentWound',
    'currentStrain',
    'earnedXP',
    'critical',
  ];

class MainPage extends React.Component {

  componentDidMount() {
    this.props.changeChannel(channel);
    dataTypes.forEach((type) => this.props.getData(channel, type));
  }

  render() {
      return <Tabs defaultIndex={0}>
          <TabList>
              <Tab>Attributes</Tab>
              <Tab>Archetype</Tab>
              <Tab>Characteristics</Tab>
              <Tab>Career</Tab>
              <Tab>Motivations</Tab>
              <Tab>Skills</Tab>
              <Tab>Talents</Tab>
              <Tab>XP</Tab>
              <Tab>Critical</Tab>
              <Tab>About</Tab>
          </TabList>
          <TabPanel>
              <Attributes/>
          </TabPanel>
          <TabPanel>
              <Archetype/>
          </TabPanel>
          <TabPanel>
              <Characteristics/>
          </TabPanel>
          <TabPanel>
              <Career/>
          </TabPanel>
          <TabPanel>
              <Motivation/>
          </TabPanel>
          <TabPanel>
              <Skill/>
          </TabPanel>
          <TabPanel>
              <Talents/>
          </TabPanel>
          <TabPanel>
              <XPCounter />
          </TabPanel>
          <TabPanel>
              <Critical />
          </TabPanel>
          <TabPanel>
              <About/>
          </TabPanel>
      </Tabs>;
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
