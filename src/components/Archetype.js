import React from 'react';
import Description from './Description';
import StatBlock from './StatBlock';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeArchetype} from '../actions/index';

class Archetype extends React.Component {

  handleSelect = (event) => {
    this.props.changeState(event.target.value);
  }

  makeDescription = (skills) => {
    let description = '';
    Object.keys(skills).forEach((key) => {
      description+=`${skills[key]} rank in ${key} \n`
    });
    return description;
  }

  render() {
    const {archetype, archetypes} = this.props;
    const masterArchetype = archetypes[archetype];
    return (
      <div className='module'>
        <select value={archetype ? archetype : ''} onChange={this.handleSelect}>
          <option></option>
          {Object.keys(archetypes).map((key)=>
            <option value={key} key={key}>{archetypes[key].name}</option>
          )}
        </select>
        <h2>Archetype:&nbsp;<span className='title'>{masterArchetype && masterArchetype.name}</span></h2>
        <p><b>Starting Stats: </b></p>
        <div className='block'>
          {Object.keys(masterArchetype ? masterArchetype.characteristics : '').map((stat)=>
            <StatBlock  key={stat}
                        textTop={stat}
                        textBottom={masterArchetype.characteristics[stat]}
                        block='characteristic' />
            )}
        </div>
        {masterArchetype &&
          <div className='block'>
            <StatBlock  textTop='Wounds'
                        textBottom={`0 | ${masterArchetype.woundThreshold}`}
                        block='attrib' />
            <StatBlock  textTop='Strain'
                        textBottom={`0 | ${masterArchetype.strainThreshold}`}
                        block='attrib' />
          </div>
        }
        <p><b>Starting XP:</b>&nbsp;{masterArchetype && masterArchetype.experience}&emsp;</p>


        <div>
          <b>Starting Skills:</b>
            {masterArchetype && Object.keys(masterArchetype.skills).map((key) =>
              <p key={key} style={{textIndent: '1em'}}>{masterArchetype.skills[key]} rank in {key}</p>
            )}
        </div>
        <div>
          <b>Starting Talents:</b>
          {Object.keys(masterArchetype ? masterArchetype.talents : '').map((talent)=>
            <div key={talent} style={{textIndent: '1em'}}>
              <p><b>{masterArchetype.talents[talent].name}</b></p>
              <p><Description text={masterArchetype.talents[talent].description}/></p>
          </div>
          )}
        </div>
        <p><b>Setting:</b>&nbsp;{masterArchetype && masterArchetype.setting}</p>
        <p><b>Description:</b>&nbsp;<Description text={masterArchetype ? masterArchetype.description : ''} /></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeState: changeArchetype}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Archetype);
