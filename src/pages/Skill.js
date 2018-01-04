import React from 'react';
import '../styles/index.css';
import SkillBlock from '../blocks/SkillBlock';

export default class Skill extends React.Component {
  state = {masterSkills: {}};

  render() {
    const {masterSkills} = this.state;
    return (
      <div>
          <SkillBlock/>
      </div>
    )
  }
}
