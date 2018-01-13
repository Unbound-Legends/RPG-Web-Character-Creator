import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeArchetype, changeArchetypeSpecialSkills} from '../actions/index';

class ArchetypeSkills extends React.Component {

  handleCheck = (event) => {
    const {archetype, changeArchetypeSpecialSkills, archetypeSpecialSkills, archetypes} = this.props;
    const masterArchetypeSkills = archetypes[archetype].skills;

    let newObj = {};
    if (masterArchetypeSkills.choice>Object.keys(archetypeSpecialSkills).length) {
      newObj = {...archetypeSpecialSkills};
    }
    newObj[event.target.name]={rank: Object.keys(masterArchetypeSkills).includes('any') ? masterArchetypeSkills.any : masterArchetypeSkills[event.target.name]};
    changeArchetypeSpecialSkills(newObj);
  }

  render() {
    const {archetype, archetypes, archetypeSpecialSkills, skills} = this.props;
    const masterArchetype = archetypes[archetype];
    let list = Object.keys(masterArchetype.skills).includes('any') ? Object.keys(skills) : Object.keys(masterArchetype.skills);
    if (archetype===null) return <div></div>;
    if (Object.keys(masterArchetype.skills).includes('choice')) {
      return (
        <div>
          <p>Select {masterArchetype.skills.choice} option:</p>
          {list.map((skill)=>
            skill==='choice' ? <div key={skill}></div> : <div key={skill}><label><input type='checkbox' name={skill} checked={Object.keys(archetypeSpecialSkills).includes(skill)} onChange={this.handleCheck} /> {Object.keys(masterArchetype.skills).includes('any') ? masterArchetype.skills.any : masterArchetype.skills[skill]} Rank: {skill}</label></div>
          )}
        </div>

      )
    }
    return (
      <div>
        {list.map((key) =>
          <p key={key} style={{textIndent: '1em'}}>{masterArchetype.skills[key]} rank in {key}</p>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        archetypeSpecialSkills: state.archetypeSpecialSkills,
        skills: state.skills,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeState: changeArchetype, changeArchetypeSpecialSkills: changeArchetypeSpecialSkills}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ArchetypeSkills);
