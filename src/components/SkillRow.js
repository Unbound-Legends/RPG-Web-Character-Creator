import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions/index';
import {skillDice, skillRanks} from '../reducers/index';
import Description from './Description';

class SkillRow extends React.Component {

  handleRankChange = (event) => {
    const {masterSkills, skillKey, changeData} = this.props;
    let newObj = {...masterSkills};
    newObj[skillKey].rank = +event.target.value;
    changeData(newObj, 'masterSkills');
  }

  render() {
    const {masterSkills, skills, skillKey, careerSkills, skillDice, skillRanks} = this.props;
    const skill = skills[skillKey];
    return (
      <div className={masterSkills ? (masterSkills[skillKey].show ? 'table-row' : 'table-row-hide') : 'table-row'}>
        <div className='table-cell'>
          {skill.name}
        </div>
        <div className='table-cell'>
          {skill.characteristic}
        </div>
        <div className='table-cell'>
          <input type='checkbox' checked={careerSkills.includes(skillKey)} readOnly/>
        </div>
        <div className='table-cell'>
          <select defaultValue={skillRanks[skillKey]} onChange={this.handleRankChange}>
            {[0,1,2,3,4,5].map((key)=> <option key={key} value={key}>{key}</option> )}
          </select>
        </div>
        <div className='table-cell'>
          <Description text={skillDice[skillKey]} />
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
    return bindActionCreators({changeData: changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SkillRow);
