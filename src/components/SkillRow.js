import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {archetypeSkillRank, skillDice, skillRanks} from '../reducers';
import {Description} from './index';

class SkillRow extends React.Component {

  handleRankChange = (event) => {
    const {masterSkills, skillKey, changeData, careerSkills, archetypeSkillRank, career, careers} = this.props;
    let newObj = {...masterSkills};
    let rankType = careers[career] ? careers[career].skills.includes(skillKey) ? 'careerRank' : 'rank' : 'rank';
    newObj[skillKey][rankType] = +event.target.value - (careerSkills.includes(skillKey) ? 1 : 0) - (archetypeSkillRank[skillKey] ? archetypeSkillRank[skillKey].rank : 0);
    changeData(newObj, 'masterSkills');
  };

  shortCharacteristics = () => {
      const {skillKey, skills} = this.props;
      switch (skills[skillKey].characteristic) {
          case 'Agility':
            return 'AG';
          case 'Brawn':
              return 'BR';
          case 'Intellect':
              return 'INT';
          case 'Cunning':
              return 'CUN';
          case 'Willpower':
              return 'WILL';
          case 'Presence':
              return 'PR';
          default:
              return '';
      }
  };

  render() {
    const {masterSkills, skills, skillKey, careerSkills, skillDice, skillRanks, archetypeSkillRank, career, careers} = this.props;
    const skill = skills[skillKey];
    let ranks = [0, 1, 2, 3, 4, 5];
    if (careerSkills.includes(skillKey)) ranks.shift();
    if (archetypeSkillRank[skillKey]) {
        for (let i = 0; archetypeSkillRank[skillKey].rank > i; i++) {
            ranks.shift();
        }
    }
    return (
      <div className={masterSkills[skillKey] ? (masterSkills[skillKey].hide ? 'table-row-hide' : 'table-row') : 'table-row'}>
        <div className='table-cell' style={{textAlign: 'left'}}>
          {`${skill.name} (${this.shortCharacteristics()})`}
        </div>
        <div className='table-cell'>
          <input type='checkbox' checked={career ? careers[career].skills.includes(skillKey) : false} readOnly/>
        </div>
        <div className='table-cell'>
          <select defaultValue={skillRanks[skillKey]} onChange={this.handleRankChange}>
            {ranks.map((key)=> <option key={key} value={key}>{key}</option> )}
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
        career: state.career,
        careers: state.careers,
        skillDice: skillDice(state),
        skillRanks: skillRanks(state),
        archetypeSkillRank: archetypeSkillRank(state),
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SkillRow);
