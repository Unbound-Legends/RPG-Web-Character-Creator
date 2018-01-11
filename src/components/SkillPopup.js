import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeMasterSkills} from '../actions/index';

class SkillPopup extends React.Component {

  handleChange = () => {
    const {masterSkills, skillName} = this.props;
    let newObj = {...masterSkills};
    newObj[skillName].show = !masterSkills[skillName].show;
    this.props.changeState(newObj);
  }

  render() {
    const {skillName, skills, masterSkills} = this.props;
    return (
      <div className='skill-row'>
        <div className='skill-cell'>
          <form>
            <input type='checkbox' checked={masterSkills[skillName].show} onChange={this.handleChange}/>
          </form>
        </div>
        <div className='skill-cell'>
          {skills[skillName].name}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        masterSkills: state.masterSkills,
        skills: state.skills,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeState: changeMasterSkills}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SkillPopup);
