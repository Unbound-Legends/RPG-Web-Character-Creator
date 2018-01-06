import React from 'react';
import '../styles/index.css';
import Description from '../blocks/Description';
import careers from '../data/careers';

export default class Career extends React.Component {
  state = {masterCareer: this.props.career ? this.props.career : undefined};

  componentWillReceiveProps(nextProps) {
    this.setState({masterCareer:nextProps.career})
  }

  handleChange = (event) => {
    let career = careers[event.target.value];
    career.skills.sort();
    this.props.handleChange('career', career)
  }

  render(){
    const {masterCareer} = this.state;
    return (
      <div className='module'>
        <select defaultValue={masterCareer && masterCareer.name} onChange={this.handleChange}>
          <option></option>
          {Object.keys(careers).map((key)=>
            <option value={key} key={key}>{careers[key].name}</option>
          )}
        </select>
        <h2>Career:&nbsp;<span className='title'>{masterCareer && masterCareer.name}</span></h2>
        <h3>Career Skills:</h3>
        {masterCareer && masterCareer.skills.map((skill)=>
          <div key={skill}><label><input type='checkbox' />{skill}</label></div>
        )}
        <p><b>Setting:</b>&nbsp;{masterCareer && masterCareer.setting}</p>
        <p><b>Description:</b>&nbsp;<Description text={masterCareer ? masterCareer.description : ''}/></p>
      </div>
    );
  }
}
