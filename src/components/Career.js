import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {maxCareerSkills} from '../reducers';
import {Description} from './index';
import popup from 'react-popup';

class Career extends React.Component {

  handleChange = (event) => {
    let value = event.target.value==='' ? null : event.target.value;
    this.props.changeData(value, 'career');
    this.props.changeData([], 'careerSkills');
    event.preventDefault();
  };

  handleCheck = (event) => {
    let careerSkills = [...this.props.careerSkills];
    if (careerSkills.includes(event.target.name)) {
      careerSkills.forEach((skill, index)=>{
        careerSkills[skill]===event.target.name && careerSkills.splice(index, 1);
      })
    } else careerSkills.push(event.target.name);
    if (this.props.maxCareerSkills>=careerSkills.length) this.props.changeData(careerSkills, 'careerSkills');
    else event.preventDefault();
  };

  render(){
    const {career, careers, skills, careerSkills} = this.props;
    const masterCareer = careers[career];
    return (
      <div className='module'>
            <select defaultValue={masterCareer && masterCareer.name} onChange={this.handleChange}>
              <option value=''/>
              {Object.keys(careers).map((key)=>
                <option value={key} key={key}>{careers[key].name}</option>
              )}
            </select>
            {masterCareer &&
              <div>
                <h2>Career:&nbsp;<span className='title'>{masterCareer.name}</span></h2>
                <h3>Career Skills:</h3>
                  <p>Select {this.props.maxCareerSkills} skills to start with 1 free rank</p>
                {masterCareer.skills.map((skill)=>
                  <div key={skill}><label><input type='checkbox' name={skill} checked={careerSkills.includes(skill)} onChange={this.handleCheck} />{skills[skill].name}</label></div>
                )}
                <p><b>Setting:</b>&nbsp;{masterCareer.setting}</p>
                  <p><b>Description:</b></p>
                  <div style={{textIndent: '1em'}}><Description text={masterCareer.description}/></div>
              </div>
            }
            <button onClick={popup.close}>Close</button>
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
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Career);
