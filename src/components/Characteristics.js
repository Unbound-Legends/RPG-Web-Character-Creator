import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeMasterCharacteristics} from '../actions/index';
import {characteristics} from '../reducers/index';
import StatBlock from './StatBlock';

class Characteristics extends React.Component {

  render() {
    const {archetype, archetypes, masterCharacteristics, characteristics} = this.props;
    const masterArchetype = archetypes[archetype];
    return (
      <div className='module'>
        <p><b>Modify Characteristics: </b></p>
        <div className='table'>
          <div className='table-row'>
            {Object.keys(characteristics).map((statUp)=>
              <div key={statUp} className='table-cell-no-border'><button >Up</button></div>
            )}
          </div>
          <div className='table-row'>
          {Object.keys(characteristics).map((stat)=>
            <div key={stat} className='table-cell-no-border'>
              <StatBlock  textTop={stat}
                          textBottom={characteristics[stat]}
                          block='characteristic' />
            </div>
          )}
        </div>
          <div className='table-row'>
            {Object.keys(characteristics).map((statDown)=>
              <div key={statDown} className='table-cell-no-border'><button>Down</button></div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        masterCharacteristics: state.masterCharacteristics,
        characteristics: characteristics(state),
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeState: changeMasterCharacteristics}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Characteristics);
