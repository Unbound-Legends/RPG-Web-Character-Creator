import React from 'react';
import popup from 'react-popup';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions/index';
import {talentCount} from '../reducers/index';
import Description from './Description';
import TalentDedication from './TalentDedication';

class TalentSelection extends React.Component {
  state = {talentSelection: this.props.talentKey, selection: this.props.talentModifiers.dedication[this.props.row] ? this.props.talentModifiers.dedication[this.props.row] : ''}

  handleSubmit = () => {
    const {row, tier, masterTalents, talentModifiers, changeData} = this.props;
    const {talentSelection, selection} = this.state;
    let newObj = {...masterTalents};
    newObj[row][tier] = talentSelection;
    //if the new talents isn't blank make a new empty block
    if (talentSelection !== ''){
      //select tier 1 talent, add the next tier 1 row
      if (tier===1) newObj[row+1]={1:''};
      //if the row allows, add the next tier
      if (row>tier && 5>tier) if (masterTalents[row-1][tier+1]!=='') newObj[row][tier+1]='';
      //add the same tier in the next row if it wasn't allowed in a previous select
      if (masterTalents[row+1]!==undefined) {
        if (masterTalents[row+1][tier]===undefined) {
          if (masterTalents[row+1][tier-1]!==undefined && masterTalents[row+1][tier-1]!=='') newObj[row+1][tier]='';
        }
      }
    }

    changeData(newObj, 'masterTalents');

    if (selection!=='') {
      let newObj2 = {...talentModifiers};
      newObj2.dedication[row] = selection;
      changeData(newObj2, 'talentModifiers');
    }
    popup.close();
    this.setState({talentSelection: ''});
    this.setState({selection: ''});
  }

  handleChange = (event) => {
    this.setState({talentSelection: event.target.value})
    event.preventDefault();
  }

  handleCancel = (event) => {
    popup.close();
    event.preventDefault();
  }

  handleDedicationChange = (name) => {
     this.setState({selection: name})
  }

  render() {
    const {talents, options, talentKey, row} = this.props;
    const {talentSelection, selection} = this.state;
    const talent = talents[talentSelection];
    return (
    <div>
      <select defaultValue={talentKey} className='popup-select' onChange={this.handleChange}>
        <option value=''></option>
        {options.map((key)=>
          <option value={key} key={key}>{talents[key].name}</option>
        )}
        </select>
      {talent &&
        <div>
          <br/>
          <p><b>Name:</b> {talent.name}</p>
          <p><b>Tier:</b> {talent.tier}</p>
          <p><b>Activation:</b> {talent.activation ? 'Active' : 'Passive' }</p>
          {talent.turn ?  <p>{talent.turn}</p> : null}
          {talent.ranked ? <p><b>Ranked</b></p> : <p><b>Not Ranked</b></p> }
          <p><b>Setting:</b> {talent.setting}</p>
          <p><b>Description:</b> <Description text={talent.description}/></p>
          {talentSelection === 'Dedication' && <TalentDedication row={row} selection={selection} handleDedicationChange={this.handleDedicationChange}/>}

        </div>
      }
      <div>
        <input disabled={talentSelection==='Dedication' && selection === ''} type='submit' value='Submit' onClick={this.handleSubmit}/>
        <button value='Clear' onClick={this.handleCancel}>Cancel</button>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        masterTalents: state.masterTalents,
        talentCount: talentCount(state),
        talents: state.talents,
        talentModifiers: state.talentModifiers,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData: changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TalentSelection);
