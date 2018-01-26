import React from 'react';
import {getData, getCharacterList, changeCharacter, addCharacter} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {About, Archetype, Career, Characteristics, Motivation,
        Skill, Attributes, Talents, XPCounter, Critical, ShowCharacteristics,
        SignOut, CharacterSelect }
        from './index';
import {dataTypes} from '../functions/lists';

class MainPage extends React.Component {

    componentWillMount() {
        const {getData, character} = this.props;
        dataTypes.forEach((type) => getData(type, character));
    }


    render() {
      return <Tabs defaultIndex={0}>
          <TabList>
              <Tab>CharacterSelect</Tab>
              <Tab>Attributes</Tab>
              <Tab>Archetype</Tab>
              <Tab>Characteristics</Tab>
              <Tab>Career</Tab>
              <Tab>Motivations</Tab>
              <Tab>Skills</Tab>
              <Tab>Talents</Tab>
              <Tab>XP</Tab>
              <Tab>Critical</Tab>
              <Tab>ShowCharacteristics</Tab>
              <Tab>Sign Out</Tab>
              <Tab>About</Tab>
          </TabList>
          <TabPanel>
              <CharacterSelect/>
          </TabPanel>
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
              <ShowCharacteristics />
          </TabPanel>
          <TabPanel>
              <SignOut />
          </TabPanel>
          <TabPanel>
              <About/>
          </TabPanel>
      </Tabs>;
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        characterList: state.characterList,
        character: state.character,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getData, getCharacterList, changeCharacter, addCharacter}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage);