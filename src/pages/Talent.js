import React, { Component } from 'react';
import '../index.css';
import talents from '../data/talents';

class Talents extends Component {
  constructor() {
      super();
      this.state = {
        selected: talents.BoughtInfo,
      };
    }

  select() {
    this.setState({selected: talents[this.refs.talent.options[this.refs.talent.selectedIndex].id]});
  }

  render() {
    return (
      <div className='module'>
        <select ref='talent' onChange={this.select.bind(this)}>
          {Object.keys(talents).map((key)=>
            <option id={key} key={key}>{talents[key].name}</option>
          )}
        </select>
        <h2>Talent:&nbsp;<span className='title'>{this.state.selected.name}</span></h2>
      </div>
    )
  }
}
export default Talents;
