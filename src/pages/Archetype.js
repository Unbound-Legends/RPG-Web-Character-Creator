import React from 'react';
import '../styles/index.css';
import Description from '../blocks/Description';
import archetypes from '../data/archetypes';
import StatBlock from '../blocks/StatBlock';

export default class Archetype extends React.Component {
  state = {masterArchetype: this.props.archetype ? this.props.archetype : undefined};

  componentWillReceiveProps(nextProps) {
    this.setState({masterArchetype:nextProps.archetype})
  }

  select = (event) => {
    this.props.handleChange('archetype', archetypes[event.target.value])
  }

  render() {
    const {masterArchetype} = this.state;
    return (
      <div className='module'>
        <select onChange={this.select}>
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
          <b>Starting Skills:</b><p style={{textIndent: '1em'}}>{masterArchetype && masterArchetype.skills.description}</p>
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
