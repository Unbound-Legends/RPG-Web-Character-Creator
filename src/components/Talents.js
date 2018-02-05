import React from 'react';
import popup from 'react-popup';
import {connect} from 'react-redux';
import {talentCount} from '../reducers';
import {TalentBlock, TalentList} from './index';

class Talents extends React.Component {

  popupList = () => {
    popup.create({
      title: 'Talents',
      className: 'alert',
      content: (
        <TalentList />
      ),
    })
  };

  render() {
    const {masterTalents} = this.props;
    return (
      <div className='module breakBefore'>
        <div className='module-header'>TALENTS</div>
        <hr />
        {Object.keys(masterTalents).map((row)=>
          <div key={row} className='talent-row'>
            {Object.keys(masterTalents[row]).map((tier)=>
              <TalentBlock  key={row+tier}
                            row={+row}
                            tier={+tier}
                            talentKey={masterTalents[row][tier]}/>
            )}
          </div>
          )}
        </div>
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

export default connect(mapStateToProps)(Talents);
