import React, { Component } from 'react';
import '../index.css';
import careers from '../data/careers';

class Career extends Component {

  constructor() {
      super();
      this.state = {
        selected: careers[Object.keys(careers)[0]],
      };
    }

  select() {
    let career = careers[this.refs.career.options[this.refs.career.selectedIndex].id];
    career.skills.sort();
    this.setState({selected: career});
  }


  render(){
    return (
      <div className='module'>
        <select ref='career' onChange={this.select.bind(this)}>
          {Object.keys(careers).map((key)=>
            <option id={key} key={key}>{careers[key].name}</option>
          )}
        </select>
        <h2>Career:&nbsp;<span className='title'>{this.state.selected.name}</span></h2>
        <h3>Career Skills:</h3>
        <ul>{this.state.selected.skills.map((skill)=>
          <li key={skill}>{skill}</li>
      )}</ul>
        <p><b>Setting:</b>&nbsp;{this.state.selected.setting}</p>
        <p><b>Description:</b>&nbsp;{this.state.selected.description}</p>
      </div>

    );
  }

}

export default Career;
