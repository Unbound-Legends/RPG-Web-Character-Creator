import React from 'react';
import popup from 'react-popup';
import {connect} from 'react-redux';
import {SkillRow, SkillPopup} from './index';

class SkillBlock extends React.Component {


  handleClick = () => {
    const {type, skills} = this.props;

    popup.create({
      title: `${type} Skills`,
      className: 'alert',
      content: (
        <div className='table'>
          <div className='table-header'>
            <div className='table-cell'>Show/Hide</div>
            <div className='table-cell'>Skill</div>
          </div>
          {Object.keys(skills).sort().map((key)=>
            skills[key].type===type && (
              <SkillPopup skillKey={key} key={key}/>
            ),
          )}
        </div>
      )
    })
  };

  render() {
    const {type, skills} = this.props;
    return (
        <div className='table-table'>
          <div className='table-heading' onClick={this.handleClick}>{type}</div>
          <div className='table'>
            <div className='table-header'>
              <div className='table-cell skill-block-name'>Skill</div>
              <div className='table-cell skill-block-career'>Career</div>
              <div className='table-cell skill-block-rank'>Rank</div>
              <div className='table-cell skill-block-dice'>Dice Pool</div>
            </div>
            {Object.keys(skills).sort().map((skillKey)=>
              skills[skillKey].type === type &&
                <SkillRow skillKey={skillKey} key={skillKey}/>
            )}
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        skills: state.skills,
    };
}

export default connect(mapStateToProps)(SkillBlock);
