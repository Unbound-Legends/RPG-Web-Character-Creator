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
    this.props.changeData([], 'careerSkillsRank');
    event.preventDefault();
  };

  handleCheck = (event) => {
    let careerSkillsRank = [...this.props.careerSkillsRank];
    if (careerSkillsRank.includes(event.target.name)) {
      careerSkillsRank.forEach((skill, index)=>{
        careerSkillsRank[skill]===event.target.name && careerSkillsRank.splice(index, 1);
      })
    } else careerSkillsRank.push(event.target.name);
    if (this.props.maxCareerSkills>=careerSkillsRank.length) this.props.changeData(careerSkillsRank, 'careerSkillsRank');
    else event.preventDefault();
  };

  render(){
    const {career, careers, skills, careerSkillsRank} = this.props;
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
                  <div key={skill}><label><input type='checkbox' name={skill} checked={careerSkillsRank.includes(skill)} onChange={this.handleCheck} />{skills[skill].name}</label></div>
                )}
                <p><b>Setting:</b>&nbsp;{masterCareer.setting}</p>
                  <p><b>Description:</b></p>
                  <div style={{textIndent: '1em'}}><Description text={masterCareer.description}/></div>
              </div>
            }
          <input type='submit' value='Submit' onClick={popup.close}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        career: state.career,
        careerSkillsRank: state.careerSkillsRank,
        careers: state.careers,
        skills: state.skills,
        maxCareerSkills: maxCareerSkills(state),
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Career);
