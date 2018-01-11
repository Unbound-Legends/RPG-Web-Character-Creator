import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeMasterSkills} from '../actions/index';
import {skillDice, skillRanks} from '../reducers/index';
import Description from './Description';

class SkillRow extends React.Component {

  handleRankChange = (event) => {
    const {masterSkills, skillName, changeState} = this.props;
    let newObj = {...masterSkills};
    console.log(event.target.value);
    newObj[skillName].rank = +event.target.value;
    console.log(newObj);
    changeState(newObj);
  }

  render() {
    const {masterSkills, skills, skillName, careerSkills, skillDice, skillRanks} = this.props;
    const skill = skills[skillName];
    return (
      <div className={masterSkills ? (masterSkills[skillName].show ? 'skill-row' : 'skill-row-hide') : 'skill-row'}>
        <div className='skill-cell'>
          {skill.name}
        </div>
        <div className='skill-cell'>
          {skill.characteristic}
        </div>
        <div className='skill-cell'>
          <input type='checkbox' checked={careerSkills.includes(skillName)} readOnly/>
        </div>
        <div className='skill-cell'>
          <select defaultValue={skillRanks[skillName]} onChange={this.handleRankChange}>
            {[0,1,2,3,4,5].map((key)=> <option key={key} value={key}>{key}</option> )}
          </select>
        </div>
        <div className='skill-cell'>
          <Description text={skillDice[skillName]} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        masterSkills: state.masterSkills,
        skills: state.skills,
        careerSkills: state.careerSkills,
        skillDice: skillDice(state),
        skillRanks: skillRanks(state),
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeState: changeMasterSkills}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SkillRow);
