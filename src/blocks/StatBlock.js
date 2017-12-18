import React, { Component } from 'react';
import '../index.css';

class StatBlock extends Component {

  render() {
    return (
      <div className='module'>
      {Object.keys(this.props.path.characteristics).map((stat)=>
        <div className='stats-box' key={stat}>
          <div className='stats-box-top characteristic-box-top'>{stat}</div>
          <div className='stats-box-bottom characteristic-box-bottom'>{this.props.path.characteristics[stat]}</div>
        </div>
      )}
      </div>
    )
  }
}
export default StatBlock;
