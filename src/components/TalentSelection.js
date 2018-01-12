import React from 'react';
import popup from 'react-popup';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeMasterTalents, changeTalentSelection} from '../actions/index';
import {talentCount} from '../reducers/index';
import Description from './Description';

class TalentSelection extends React.Component {

  componentDidMount() {
    this.props.changeSelection(this.props.talentKey);
  }

  handleSubmit = () => {
    const {row, tier, masterTalents, talentSelection} = this.props;
    let newObj = {...masterTalents}
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
    this.props.changeState(newObj);
    popup.close();
  }

  handleChange = (event) => {
    this.props.changeSelection(event.target.value);
    event.preventDefault();
  }

  handleCancel = (event) => {
    popup.close();
    event.preventDefault();
  }

  render() {
    const {talents, options, talentSelection, talentKey} = this.props;
    const talent = talents[talentSelection];
    return (
    <div>
      <select defaultValue={talentKey} className='popup-select' onChange={this.handleChange}>
        <option key='' value=''></option>
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
        </div>
      }
      <div>
        <input type='submit' value='Submit' onClick={this.handleSubmit}/>
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
        talentSelection: state.talentSelection,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeState: changeMasterTalents, changeSelection: changeTalentSelection}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TalentSelection);
