import React, { Component } from 'react';
import TalentBlock from '../blocks/TalentBlock';
import talents from '../data/talents';
import '../index.css';
class Talents extends Component {
  constructor() {
      super();
      this.state = {
        selectedKey: 'BoughtInfo',
      };
  }

  select(key) {
    this.setState({selectedKey: key});
  }

  render() {
    return (
      <div className='module'>
        <TalentBlock talentKey={this.state.selectedKey} submit={this.select.bind(this)}/>
      </div>

    )
  }
}
export default Talents;
