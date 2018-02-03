import React from 'react';
import {getData} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Component from './index';


class NewMainPage extends React.Component {

  componentWillMount() {
    this.props.getData();
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
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewMainPage);
