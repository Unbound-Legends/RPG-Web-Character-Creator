import React from 'react';
import popup from 'react-popup';
import TalentBlock from '../blocks/TalentBlock';
import talents from '../data/talents';
import '../style/index.css';

export default class Talents extends React.Component {
  state = {masterTalents: {1:{1:''}}, count: {}};


  select(row, tier, key) {
    row=+row;
    tier=+tier;
    let masterTalents = this.state.masterTalents;

    masterTalents[row][tier]=key
    //if the new talents isn't blank make a new empty block
    if (key !== ''){
      //select tier 1 talent, add the next tier 1 row
      if (tier===1) masterTalents[row+1]={1:''};
      //if the row allows, add the next tier
      if (row>tier && 5>tier) if (masterTalents[row-1][tier+1]!=='') masterTalents[row][tier+1]='';
      //add the same tier in the next row if it wasn't allowed in a previous select
      if (masterTalents[row+1][tier]===undefined) {
        if (masterTalents[row+1][tier-1]!==undefined && masterTalents[row+1][tier-1]!=='') masterTalents[row+1][tier]='';
      }
    }
    this.setState({masterTalents: masterTalents}, () => this.makeCount());
  }

  makeCount = () => {
    const {masterTalents} = this.state;
    let count = {};
    Object.keys(masterTalents).forEach((row)=>{
      Object.keys(masterTalents[row]).forEach((tier)=>{
        let talent = masterTalents[row][tier];
        if(talent!=='') count[talent] = count[talent] ? count[talent]+1 : 1;
      })
    })
    this.setState({count: count})
  }

  countXP = () => {
    const {masterTalents} = this.state;
    let xp = 0;
    Object.keys(masterTalents).forEach((row)=>{
      Object.keys(masterTalents[row]).forEach((tier)=>{
        if (masterTalents[row][tier] !== '') xp = xp+(5*tier);
      })
    })
    return xp;
  }

  popupList = () => {
    const {count} = this.state;
    popup.create({
      title: 'Talents',
      className: 'alert',
      content: (
        <div>{Object.keys(count).sort().map((key)=><p className='noMargin' key={key}>{talents[key].name}: {count[key]}</p>)}</div>
      ),
    })
  }

  render() {
    const {masterTalents, count} = this.state;
    return (
      <div className='module'>
        <div><span onClick={this.popupList}>Total XP: {this.countXP()}</span></div>
        {Object.keys(masterTalents).map((row)=>
          <div key={row} className='talent-row'>
            {Object.keys(masterTalents[row]).map((tier)=>
              <TalentBlock  key={row+tier}
                            row={+row}
                            tier={+tier}
                            count={count}
                            masterTalents={masterTalents}
                            talentKey={masterTalents[row][tier]}
                            submit={this.select.bind(this, row, tier)}/>
            )}
          </div>
          )}
        </div>
    )
  }
}
