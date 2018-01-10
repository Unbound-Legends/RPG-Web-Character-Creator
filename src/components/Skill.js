import React from 'react';
import SkillBlock from './SkillBlock';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeSkill} from '../actions/index';

class Skill extends React.Component {

  componentDidMount() {
    this.props.masterSkills === null && this.initMasterSkills();
  }
  
  render() {
    return (
      <div>
      <div className='skill-table skill-module module'>
        <div className='skill-cell'>
          <SkillBlock   type='General'
          />
        </div>
        <div className='skill-cell'>
          {['Combat', 'Magic', 'Social', 'Knowledge'].map((type)=>
            <SkillBlock   key={type}
                          type={type}
            />
          )}
        </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(Skill);
