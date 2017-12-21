import React from 'react';
import TalentBlock from '../blocks/TalentBlock';
import '../index.css';

export default class Talents extends React.Component {
  state = {masterTalents: {1:{1:''}}};

  select(row, tier, key) {
    let masterTalents = Object.assign({}, this.state.masterTalents);
    masterTalents[row][tier] = key;

    if (+row===+tier || +tier===5) {
      if (masterTalents[+row+1] === undefined) masterTalents[+row+1]={1:''};
    } else masterTalents[row][+tier+1]='';

    if (+tier===1) masterTalents[+row+1]={1:''};

    if (masterTalents[row][tier].description === '') {
      masterTalents[row][tier].description = `See ${masterTalents[row][tier].book}, page ${masterTalents[row][tier].page}, for more details.`
    }

    this.setState({masterTalents: masterTalents})
  }

  render() {
    const {masterTalents} = this.state;
    return (
      <div className='module'>
        {Object.keys(masterTalents).map((row)=>
          <div key={row} className='talent-row'>
            {Object.keys(masterTalents[row]).map((tier)=>
              <TalentBlock  key={row+tier}
                            row={+row}
                            tier={+tier}
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
