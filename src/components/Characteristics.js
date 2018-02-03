import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {characteristics} from '../reducers';

class Characteristics extends React.Component {

    countXP = () => {
        const {archetypes, archetype, creationCharacteristics} = this.props;
        let xp = 0;
        if (archetype===null) return 0;
        //starting characteristics
        let startingCharacteristics = archetypes[archetype].characteristics;

        Object.keys(creationCharacteristics).forEach((characteristic)=>{
            let points = creationCharacteristics[characteristic];
            for(let i=0; points>i; i++) {
                xp += (startingCharacteristics[characteristic]+i+1)*10;
            }
        });
        return xp;
    };

    handleClick = (event) => {
        const {creationCharacteristics, characteristics, changeData} = this.props;
        let newObj = {...creationCharacteristics};
        let characteristic = event.target.value;
        if (event.target.name==='Up') {
          if (characteristics[characteristic]>=5) {
            alert(`You have maxed out ${characteristic}`);
            return;
          }
          newObj[characteristic]++;
        }
        if (event.target.name==='Down') {
          if (0>=creationCharacteristics[characteristic]) {
            alert(`${characteristic} cannot be decreased further`);
            return;
          }
          newObj[characteristic]--;
        }
        changeData(newObj, 'creationCharacteristics');
    };

    render() {
        const {characteristics} = this.props;
        const chars = ['Brawn', 'Agility', 'Intellect', 'Cunning', 'Willpower', 'Presence'];
        return (
          <div className='module'>
              <div><span>Total XP: {this.countXP()}</span></div>
              <p><b>Modify Characteristics: </b></p>
            <div className='table'>
              <div className='table-row'>
                {chars.map((statUp)=>
                  <div key={statUp} className='table-cell-no-border'><button value={statUp} name='Up' onClick={this.handleClick}>Up</button></div>
                )}
              </div>
              <div className='table-row'>
              {chars.map((stat)=>
                <div key={stat} className='table-cell-no-border' style={{height: '9vw'}}>
                    <div key={stat} className={`characteristic-table`}>
                        <div className='characteristic-table-topText'>{characteristics[stat]}</div>
                        <div className='characteristic-table-bottomText'>{stat}</div>
                    </div>
                </div>
              )}
            </div>
              <div className='table-row'>
                {chars.map((statDown)=>
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
        creationCharacteristics: state.creationCharacteristics,
        characteristics: characteristics(state),
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Characteristics);
