import React from 'react';
import popup from 'react-popup';
import {connect} from 'react-redux';
import {talentCount} from '../reducers/index';
import TalentSelection from './TalentSelection';
import StatBlock from './StatBlock';

class TalentBlock extends React.Component {

  activation = () => {
    const {talents, talentKey} = this.props;
    if (talentKey==='') return 'inactive';
    if (talents[talentKey].activation) return 'active'
    else return 'passive';
  }

  makeOptions = (cb) => {
    const {tier, talentCount, talentKey, talents} = this.props;
      let options = [];
      Object.keys(talents).forEach((key)=>{
        //checked to make sure the improved and supreme talensts aren't selected first
        if (key.includes('Improved') || key.includes('Supreme')) {
          if ((key.includes('Improved') && talentCount[key.slice(0, -8)]) ||
              (key.includes('Supreme') && talentCount[key.slice(0, -7)])) {
              if (tier===talents[key].tier && !talentCount[key]) options.push(key);
          }
        }
        //talent from this tier and has not been selected already
        else if (tier===talents[key].tier && !talentCount[key]) options.push(key);
        //talent is ranked and has been selected enough for this tier
        else if (talents[key].ranked && ((talents[key].tier+talentCount[key])===tier)) options.push(key);
        if (key===talentKey) options.push(key);
      })
      if (tier===5 && !options.includes('Dedication')) options.push('Dedication')

      options.sort();
      cb(options);
  }

  selectPopup = () => {
    const {talentKey, row, tier} = this.props;
    this.makeOptions((options) => {
      popup.create({
        title: 'Talent',
        className: 'alert',
        content: (
          <TalentSelection options={options} row={row} tier={tier} talentKey={talentKey} />
        ),
      })
    })
  }

  render() {
    const {talents, talentKey} = this.props;
    const talent = talents[talentKey];
    return (
      <StatBlock  onClick={this.selectPopup}
                  textTop={talent && talent.name}
                  textBottom={(talent ? talent.description+'\n'+(talent.activation ? talent.turn : '') : 'inactive')}
                  block='talent'
                  topMod={this.activation()} />
    )
  }
}

function mapStateToProps(state) {
    return {
        masterTalents: state.masterTalents,
        talents: state.talents,
        talentCount: talentCount(state),
    };
}

export default connect(mapStateToProps)(TalentBlock);
