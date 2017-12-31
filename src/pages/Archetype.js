import React from 'react';
import '../style/index.css';
import archetypes from '../data/archetypes';
import StatBlock from '../blocks/StatBlock';

export default class Archetype extends React.Component {
  state = {selected: archetypes[Object.keys(archetypes)[0]]};

  select = (event) => {
    this.setState({selected: archetypes[event.target.value]});
  }

  render() {
    const {selected} = this.state;
    return (
      <div className='module'>
        <select onChange={this.select}>
          {Object.keys(archetypes).map((key)=>
            <option value={key} key={key}>{archetypes[key].name}</option>
          )}
        </select>
        <h2>Archetype:&nbsp;<span className='title'>{selected.name}</span></h2>
        <p><b>Starting Stats: </b></p>
        <div className='block'>
          {Object.keys(selected.characteristics).map((stat)=>
            <StatBlock  key={stat}
                        textTop={stat}
                        textBottom={selected.characteristics[stat]}
                        block='characteristic' />
            )}
        </div>
        <div className='block'>
          <StatBlock  textTop='Wounds'
                      textBottom={`0 | ${selected.woundThreshold}`}
                      block='attrib' />
          <StatBlock  textTop='Strain'
                      textBottom={`0 | ${selected.strainThreshold}`}
                      block='attrib' />
        </div>
        <p><b>Starting XP:</b>&nbsp;{selected.experience}&emsp;</p>


        <div>
          <b>Starting Skills:</b><p style={{textIndent: '1em'}}>{selected.skills.description}</p>
        </div>
        <div>
          <b>Starting Talents:</b>
          {Object.keys(selected.talents).map((talent)=>
            <div key={talent} style={{textIndent: '1em'}}>
              <p><b>{selected.talents[talent].name}</b></p>
              <p>{selected.talents[talent].description}</p>
          </div>
          )}
        </div>
        <p><b>Setting:</b>&nbsp;{selected.setting}</p>
        <p><b>Description:</b>&nbsp;{selected.description}</p>
      </div>
    );
  }
}
