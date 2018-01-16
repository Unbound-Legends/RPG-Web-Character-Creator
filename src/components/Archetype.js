import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { changeData } from '../actions/index';
import ArchetypeStats from './ArchetypeStats';

class Archetype extends React.Component {

  handleSelect = (event) => {
    this.props.changeData(event.target.value, 'archetype');
    this.props.changeData({}, 'archetypeSpecialSkills');
  }

  render() {
    const {archetype, archetypes} = this.props;
    return (
      <div className='module'>
        <select value={archetype ? archetype : ''} onChange={this.handleSelect}>
          <option></option>
          {Object.keys(archetypes).map((key)=>
            <option value={key} key={key}>{archetypes[key].name}</option>
          )}
        </select>
        <ArchetypeStats />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        archetypes: state.archetypes,
        archetype: state.archetype,
    };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({changeData: changeData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Archetype)
