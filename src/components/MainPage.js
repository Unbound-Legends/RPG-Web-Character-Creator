import React from 'react';
import {getData} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as Component from './index';


class MainPage extends React.Component {

  componentWillMount() {
    this.props.getData();
  }

  render() {
      return <Tabs defaultIndex={13}>
          <TabList>
              <Tab>Character Select</Tab>
              <Tab>Character Description</Tab>
              <Tab>Character Image</Tab>
              <Tab>Attributes</Tab>
              <Tab>Archetype</Tab>
              <Tab>Characteristics</Tab>
              <Tab>Career</Tab>
              <Tab>Motivations</Tab>
              <Tab>Skills</Tab>
              <Tab>Talents</Tab>
              <Tab>XP</Tab>
              <Tab>Critical</Tab>
              <Tab>Equipment Log</Tab>
              <Tab>Carried Gear</Tab>
              <Tab>Notes</Tab>
              <Tab>Show Characteristics</Tab>
              <Tab>Sign Out</Tab>
              <Tab>About</Tab>
          </TabList>
          <TabPanel> <Component.CharacterSelect/> </TabPanel>
          <TabPanel> <Component.CharacterDescription/> </TabPanel>
          <TabPanel> <Component.CharacterImage/> </TabPanel>
          <TabPanel> <Component.Attributes/> </TabPanel>
          <TabPanel> <Component.Archetype/> </TabPanel>
          <TabPanel> <Component.Characteristics/> </TabPanel>
          <TabPanel> <Component.Career/> </TabPanel>
          <TabPanel> <Component.Motivation/> </TabPanel>
          <TabPanel> <Component.Skill/> </TabPanel>
          <TabPanel> <Component.Talents/> </TabPanel>
          <TabPanel> <Component.XPCounter/> </TabPanel>
          <TabPanel> <Component.Critical/> </TabPanel>
          <TabPanel> <Component.EquipmentLog/> </TabPanel>
          <TabPanel> <Component.CarriedGear/> </TabPanel>
          <TabPanel> <Component.Notes/> </TabPanel>
          <TabPanel> <Component.ShowCharacteristics/> </TabPanel>
          <TabPanel> <Component.SignOut/> </TabPanel>
          <TabPanel> <Component.About/> </TabPanel>
      </Tabs>
  }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        character: state.character,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage);
