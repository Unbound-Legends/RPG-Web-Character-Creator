import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';

class SkillPopup extends React.Component {

  handleChange = () => {
    const {masterSkills, skillKey, changeData} = this.props;
    let newObj = {...masterSkills};
    newObj[skillKey].show = !masterSkills[skillKey].show;
    changeData(newObj, 'masterSkills');
  }

  render() {
    const {skillKey, skills, masterSkills} = this.props;
    return (
      <div className='table-row'>
        <div className='table-cell'>
          <form>
            <input type='checkbox' checked={masterSkills[skillKey].show} onChange={this.handleChange}/>
          </form>
        </div>
        <div className='table-cell'>
          {skills[skillKey].name}
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
    return bindActionCreators({changeData: changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SkillPopup);
