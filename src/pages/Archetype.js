import React, { Component } from 'react';
import '../index.css';
import archetypes from '../data/archetypes';
import StatBlock from '../blocks/StatBlock';

class Archetype extends Component {

  constructor() {
      super();
      this.state = {
        selected: archetypes.AverageHuman,
      };
    }

  select() {
    this.setState({selected: archetypes[this.refs.archetype.options[this.refs.archetype.selectedIndex].id]});
  }

  render() {
    return (
      <div className='module'>
        <select ref='archetype' onChange={this.select.bind(this)}>
          {Object.keys(archetypes).map((key)=>
            <option id={key} key={key}>{archetypes[key].name}</option>
          )}
        </select>
        <h2>Archetype:&nbsp;<span className='title'>{this.state.selected.name}</span></h2>
        <p><b>Starting Stats: </b></p>
        <StatBlock path={ this.state.selected } />
        <div>
          <div className='stats-box attrib-box'>
            <div className='stats-top-box attrib-top-box'>Wounds</div>
            <div className='stats-bottom-box attrib-bottom-box'>0 | {this.state.selected.woundThreshold}</div>
          </div>
          <div className='stats-box attrib-box'>
            <div className='stats-top-box attrib-top-box'>Strain</div>
            <div className='stats-bottom-box attrib-bottom-box'>0 | {this.state.selected.strainThreshold}</div>
          </div>
        </div>
        <p><b>Starting XP:</b>&nbsp;{this.state.selected.experience}&emsp;</p>


        <div>
          <b>Starting Skills:</b><p style={{textIndent: '1em'}}>{this.state.selected.skills.description}</p>
        </div>
        <div>
          <b>Starting Talents:</b>
          {Object.keys(this.state.selected.talents).map((talent)=>
            <div key={talent} style={{textIndent: '1em'}}>
              <p><b>{this.state.selected.talents[talent].name}</b></p>
              <p>{this.state.selected.talents[talent].description}</p>
          </div>
          )}
        </div>
        <p><b>Setting:</b>&nbsp;{this.state.selected.setting}</p>
        <p><b>Description:</b>&nbsp;{this.state.selected.description}</p>
      </div>
    );
  }
}
export default Archetype;
