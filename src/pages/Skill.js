import React from 'react';
import '../styles/index.css';
import SkillBlock from '../blocks/SkillBlock';
var characteristics = {
  Brawn: 2,
  Agility: 2,
  Intellect: 2,
  Cunning: 2,
  Willpower: 2,
  Presence: 2
};
var masterSkills = {
  Alchemy: {career: true, show:true, rank: 0},
  Arcana: {career: false, show:true, rank: 2},
  Astrocartography: {career: false, show:true, rank: 0},
  Athletics: {career: false, show:true, rank: 0},
  Brawl: {career: false, show:true, rank: 0},
  Charm: {career: false, show:true, rank: 0},
  Coercion: {career: false, show:true, rank: 0},
  Computers: {career: false, show:true, rank: 0},
  Cool: {career: false, show:true, rank: 0},
  Coordination: {career: false, show:true, rank: 0},
  Deception: {career: false, show:true, rank: 1},
  Discipline: {career: false, show:true, rank: 0},
  Divine: {career: false, show:true, rank: 0},
  Driving: {career: true, show:true, rank: 0},
  Gunnery: {career: false, show:true, rank: 0},
  Knowledge: {career: false, show:true, rank: 2},
  Leadership: {career: false, show:true, rank: 0},
  Mechanics: {career: false, show:true, rank: 0},
  Medicine: {career: false, show:true, rank: 0},
  Melee: {career: false, show:true, rank: 0},
  MeleeHeavy: {career: false, show:true, rank: 0},
  MeleeLight: {career: false, show:true, rank: 0},
  Negotiation: {career: true, show:true, rank: 3},
  Operating: {career: false, show:true, rank: 0},
  Perception: {career: false, show:true, rank: 0},
  Piloting: {career: false, show:true, rank: 0},
  Primal: {career: true, show:true, rank: 0},
  Ranged: {career: false, show:true, rank: 0},
  RangedHeavy: {career: false, show:true, rank: 0},
  RangedLight: {career: false, show:true, rank: 0},
  Resilience: {career: false, show:true, rank: 0},
  Riding: {career: false, show:true, rank: 0},
  Skulduggery: {career: false, show:true, rank: 0},
  Stealth: {career: false, show:true, rank: 0},
  Streetwise: {career: false, show:true, rank: 0},
  Survival: {career: false, show:true, rank: 0},
  Vigilance: {career: false, show:true, rank: 0}
}

export default class Skill extends React.Component {
  state = {masterSkills: masterSkills};

  handleChange = (skill, attrib, value) => {
    if(isNaN(value)) value= +value;
    let newObj = this.state.masterSkills;
    newObj[skill][attrib] = value;
    this.setState({masterSkills: newObj});
  }

  render() {
    const {masterSkills} = this.state;
    return (
      <div className='skill-table skill-module module'>
        <div className='skill-cell'>
          <SkillBlock   type='General'
                        handleChange={this.handleChange}
                        characteristics={characteristics}
                        masterSkills={masterSkills}
          />
        </div>
        <div className='skill-cell'>
          {['Combat', 'Magic', 'Social', 'Knowledge'].map((type)=>
            <SkillBlock   key={type}
                          type={type}
                          handleChange={this.handleChange}
                          characteristics={characteristics}
                          masterSkills={masterSkills}
            />
          )}
        </div>
      </div>
    )
  }
}
