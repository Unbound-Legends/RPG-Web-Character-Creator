import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeArchetype, changeArchetypeSpecialSkills} from '../actions/index';
import ArchetypeStats from './ArchetypeStats';

class Archetype extends React.Component {

  handleSelect = (event) => {
    this.props.changeState(event.target.value);
    this.props.changeArchetypeSpecialSkills({});
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
        archetype: state.archetype,
        archetypes: state.archetypes
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeState: changeArchetype, changeArchetypeSpecialSkills: changeArchetypeSpecialSkills}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Archetype);
