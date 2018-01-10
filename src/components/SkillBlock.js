import React from 'react';
import popup from 'react-popup';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeSkill} from '../actions/index';
import SkillRow from './SkillRow';
import SkillPopup from './SkillPopup';

class SkillBlock extends React.Component {


  handleClick = () => {
    const {type, skills} = this.props;

    popup.create({
      title: `${type} Skills`,
      className: 'alert',
      content: (
        <div className='skill-table'>
          <div className='skill-header'>
            <div className='skill-cell'>Show/Hide</div>
            <div className='skill-cell'>Skill</div>
          </div>
          {Object.keys(skills).map((key)=>
            skills[key].type===type && (
              <SkillPopup skillName={key} key={key}/>
            ),
          )}
        </div>
      )
    })
  }

  render() {
    const {type, skills} = this.props;
    return (
        <div className='skill-table'>
          <div className='skill-heading' onClick={this.handleClick}>{type}</div>
          <div className='module skill-table'>
            <div className='skill-header'>
              <div className='skill-cell'>Skill</div>
              <div className='skill-cell'>Characteristic</div>
              <div className='skill-cell'>Career</div>
              <div className='skill-cell'>Rank</div>
              <div className='skill-cell'>Dice Pool</div>
            </div>
            {Object.keys(skills).map((skillName)=>
              skills[skillName].type === type &&
                <SkillRow skillName={skillName} key={skillName}/>
            )}
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        masterSkills: state.skill,
        skills: state.skills
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeState: changeSkill}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SkillBlock);
