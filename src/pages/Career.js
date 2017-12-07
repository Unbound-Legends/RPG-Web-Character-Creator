import React, { Component } from 'react';
import '../index.css';
import careers from '../data/careers';

class Career extends Component {

  constructor() {
      super();
      this.state = {
        selected: careers.Entertainer,
      };
    }

  select() {
    this.setState({selected: careers[this.refs.career.options[this.refs.career.selectedIndex].id]});
  }


  render(){
    return (
      <div className='module'>
        <h2>Career:&nbsp;
          <select ref='career' onChange={this.select.bind(this)}>
            {Object.keys(careers).map((key)=>
              <option id={key} key={key}>{careers[key].name}</option>
            )}
          </select>
        </h2>
        <li>
        <lh>Career Skills:</lh>
          {this.state.selected.skills.map((skill)=>
        <ul key={skill}>{skill}</ul>
      )}</li>
        <p><b>Setting:</b>&nbsp;{this.state.selected.setting}</p>
        <p><b>Description:</b>&nbsp;{this.state.selected.description}</p>
      </div>

    );
  }

}

export default Career;
