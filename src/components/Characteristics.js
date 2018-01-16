import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions/index';
import {characteristics} from '../reducers/index';
import StatBlock from './StatBlock';

class Characteristics extends React.Component {

  handleClick = (event) => {
    const {masterCharacteristics, characteristics, changeData} = this.props;
    let newObj = {...masterCharacteristics};
    let characteristic = event.target.value;
    if (event.target.name==='Up') {
      if (characteristics[characteristic]>=5) {
        alert(`You have maxed out ${characteristic}`);
        return;
      }
      newObj.creation[characteristic]++;
    }
    if (event.target.name==='Down') {
      if (0>=masterCharacteristics.creation[characteristic]) {
        alert(`${characteristic} cannot be decreased further`);
        return;
      }
      newObj.creation[characteristic]--;
    }
    changeData(newObj, 'masterCharacteristics');
  }



  render() {
    const {characteristics} = this.props;
    return (
      <div className='module'>
        <p><b>Modify Characteristics: </b></p>
        <div className='table'>
          <div className='table-row'>
            {Object.keys(characteristics).map((statUp)=>
              <div key={statUp} className='table-cell-no-border'><button value={statUp} name='Up' onClick={this.handleClick}>Up</button></div>
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
              <div key={statDown} className='table-cell-no-border'><button value={statDown} name='Down' onClick={this.handleClick}>Down</button></div>
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
    return bindActionCreators({changeData: changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Characteristics);
