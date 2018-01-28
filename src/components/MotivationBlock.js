import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
const seedrandom = require('seedrandom');
var rng = seedrandom('added entropy.', { entropy: true });


class MotivationBlock extends React.Component {

  handleSelect = (event) => {
    const {masterMotivations, type, motivations, changeData} = this.props;
    let newObj={...masterMotivations};
    newObj[type]={key: event.target.value, description:motivations[type][event.target.value] ? motivations[type][event.target.value] : ''};
    changeData(newObj, 'masterMotivations')
    event.preventDefault();
  };

  handleChange = (event) => {
    const {masterMotivations, type, changeData} = this.props;
    let newObj={...masterMotivations};
    newObj[type].description=event.target.value;
    changeData(newObj, 'masterMotivations')
    event.preventDefault();
  };

  handleClick = () => {
    const {motivations, type, masterMotivations, changeData} = this.props;
    const list = Object.keys(motivations[type])
    let newKey = list[Math.floor(rng() * list.length)];
    let newObj={...masterMotivations};
    newObj[type]={key: newKey, description:motivations[type][newKey]};
    changeData(newObj, 'masterMotivations')
  };

  render() {
    const {type, masterMotivations, motivations} = this.props;
    const name = masterMotivations[type].key;
    const description = masterMotivations[type].description;
    return (
    <div className='motivation-module'>
      <div className='motivation-title'>{type}:
          <select onChange={this.handleSelect} style={{marginLeft: '1vw'}} value={name}>
            <option value=''/>
            {Object.keys(motivations[type]).map((key)=>
              <option key={key} value={key}>{key}</option>
            )}
          </select>
      </div>
        <textarea onChange={this.handleChange}
                  rows='10'
                  cols='45'
                  className='textField'
                  placeholder={description ? '' : `Enter your ${type}...`}
                  value={description ? description : ''}>
        </textarea>
        <button onClick={this.handleClick}>Random</button>
    </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      masterMotivations: state.masterMotivations,
      motivations: state.motivations,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MotivationBlock);
