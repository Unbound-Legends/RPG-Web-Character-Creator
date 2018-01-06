import React from 'react';
import popup from 'react-popup';
import skills from '../data/skills.js';
import SkillRow from './SkillRow';
import SkillPopup from './SkillPopup';
import '../styles/index.css';
import '../styles/popup.css';



export default class SkillBlock extends React.Component {
  state = {masterSkills: this.props.masterSkills};


  handleClick = () => {
    const {type, handleChange} = this.props;
    const {masterSkills} = this.state;

    popup.create({
      title: `${type} Skills`,
      className: 'alert',
      content: (
        <div className='skill-table'>
          <div className='skill-header'>
            <div className='skill-cell'>Show/Hide</div>
            <div className='skill-cell'>Skill</div>
          </div>
          {Object.keys(masterSkills).map((key)=>
            skills[key].type===type && (
              <SkillPopup masterSkill={masterSkills[key]}
                          skill={skills[key]}
                          handleChange={handleChange}
                          type={key}
                          key={key}
              />
            ),
          )}
        </div>
      )
    })
  }

  render() {
    const {type, characteristics, masterSkills, handleChange} = this.props;
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
            {Object.keys(masterSkills).map((key)=>
              skills[key].type===type && (
                <SkillRow key={key}
                          handleChange={handleChange}
                          characteristics={characteristics}
                          masterSkill={masterSkills[key]}
                          type={key}
                          skill={skills[key]}
                />
              ),
            )}
          </div>
        </div>
    )
  }
}
