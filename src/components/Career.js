import React from 'react';
import Description from './Description';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeCareer, changeCareerSkills} from '../actions/index';
import {maxCareerSkills} from '../reducers/index';

class Career extends React.Component {

  handleChange = (event) => {
    this.props.changeCareer(event.target.value);
    this.props.changeCareerSkills([]);
    event.preventDefault();
  }

  handleCheck = (event) => {
    let careerSkills = [...this.props.careerSkills];
    if (careerSkills.includes(event.target.name)) {
      careerSkills.forEach((skill, index)=>{
        careerSkills[skill]===event.target.name && careerSkills.splice(index, 1);
      })
    } else careerSkills.push(event.target.name);
    if (this.props.maxCareerSkills>=careerSkills.length) this.props.changeCareerSkills(careerSkills);
    else event.preventDefault();
  }

  render(){
    const {career, careers, skills, careerSkills} = this.props;
    const masterCareer = careers[career];
    return (
      <div className='module'>
        <select defaultValue={masterCareer && masterCareer.name} onChange={this.handleChange}>
          <option></option>
          {Object.keys(careers).map((key)=>
            <option value={key} key={key}>{careers[key].name}</option>
          )}
        </select>
        {masterCareer &&
          <div>
            <h2>Career:&nbsp;<span className='title'>{masterCareer.name}</span></h2>
            <h3>Career Skills:</h3>
            {masterCareer.skills.map((skill)=>
              <div key={skill}><label><input type='checkbox' name={skill} checked={careerSkills.includes(skill)} onChange={this.handleCheck} />{skills[skill].name}</label></div>
            )}
            <p><b>Setting:</b>&nbsp;{masterCareer.setting}</p>
            <p><b>Description:</b>&nbsp;<Description text={masterCareer.description}/></p>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        career: state.career,
        careerSkills: state.careerSkills,
        careers: state.careers,
        skills: state.skills,
        maxCareerSkills: maxCareerSkills(state),
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeCareer: changeCareer, changeCareerSkills: changeCareerSkills}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Career);
