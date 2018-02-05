import React from 'react';
import {changeCharacter, changeCharacterList, loadData} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Component from './index';
import {db} from "../firestore/db";
const dataTypes = [
    'archetype',
    'archetypeSpecialSkills',
    'armor',
    'career',
    'careerSkills',
    'creationCharacteristics',
    'critical',
    'currentStrain',
    'currentWound',
    'description',
    'earnedXP',
    'gear',
    'masterMotivations',
    'masterSkills',
    'masterTalents',
    'talentModifiers',
    'weapons',
    'money'
];

class NewMainPage extends React.Component {

  componentWillMount() {
      const {user, changeCharacter, changeCharacterList, character} = this.props;
      db.doc(`users/${user}/characters/characterList/`).get()
          .then(doc => {
              let key;
              if (!doc.exists) {
                  key = Math.random().toString(36).substr(2, 16);
                  let newObj = {[key]: {}};
                  db.doc(`users/${user}/characters/characterList/`).set(newObj);
                  changeCharacter(key);
                  changeCharacterList(newObj);
              } else {
                  key = character ? character : Object.keys(doc.data())[0];
                  if (!character) changeCharacter(key);
                  changeCharacterList(doc.data());
              }
          })
  }



    componentWillReceiveProps(nextProps) {
      if (nextProps === this.props) return;
      if (nextProps.character !== this.props.character) {
          console.log('new character');
          db.doc(`users/${this.props.user}/characters/characterList/`).get()
              .then(doc => {
                  let key = nextProps.character;
                  changeCharacterList(doc.data());
                  dataTypes.forEach((type)=>{
                      let data = null;
                      if (doc.data()[key][type]) data = doc.data()[key][type];
                      this.props.loadData(data, type)
                  })
              })
        }
    }


    render() {
      return (
          <div>
              <Component.SignOut/>
              <div className='inlineblock'>
                  <Component.CharacterSelect/>
                  <Component.CharacterImage/>
              </div>
              <Component.Attributes/>
              <Component.ShowCharacteristics/>

              <Component.Skill/>

              <Component.CarriedGear/>
              <div className='inlineblock'>
                  <Component.XPTotal/>
                  <Component.XPAvailable/>
              </div>
              <Component.Motivation/>
              <Component.EquipmentLog/>
              <div className='inlineblock'>
                  <Component.CharacterDescription/>
                  <Component.Notes/>
              </div>
              <Component.Critical/>
              <Component.TalentList/>

              <Component.Talents/>
              <Component.About/>
          </div>

      )}
}

function mapStateToProps(state) {
    return {
        user: state.user,
        character: state.character,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeCharacter, changeCharacterList, loadData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewMainPage);
