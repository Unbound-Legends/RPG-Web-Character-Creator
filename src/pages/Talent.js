import React, { Component } from 'react';
import TalentBlock from '../blocks/TalentBlock';
import '../index.css';

var talents = {
    1: {
      1: ''
    },
    2: {
      1: '',
      2: ''
    },
    3: {
      1: '',
      2: '',
      3: ''
    },
    4: {
      1: '',
      2: '',
      3: '',
      4: ''
    },
    5: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: ''
    },
    6: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: ''
    },
    7: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: ''
    },
    8: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: ''
    }
}
class Talents extends Component {
  constructor() {
      super();
      this.state = {
        masterTalents: talents,
      };
  }

  select(row, tier, key) {
    let masterTalents = Object.assign({}, this.state.masterTalents);
    masterTalents[row][tier] = key;
    this.setState({masterTalents: masterTalents})
  }

  render() {
    return (
      <div className='module'>
        {Object.keys(talents).map((row)=>
          <div key={row} className='talent-row'>
            {Object.keys(talents[row]).map((tier)=>
              <TalentBlock key={row+tier} talentKey={this.state.masterTalents[row][tier]} submit={this.select.bind(this, row, tier)}/>
            )}
          </div>
        )}
      </div>

    )
  }
}
export default Talents;
