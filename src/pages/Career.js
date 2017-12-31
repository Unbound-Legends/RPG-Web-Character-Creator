import React from 'react';
import '../style/index.css';
import careers from '../data/careers';

export default class Career extends React.Component {
  state = {selected: careers[Object.keys(careers)[0]]};

  select = (event) => {
    let career = careers[event.target.value];
    career.skills.sort();
    this.setState({selected: career});
  }

  render(){
    const {selected} = this.state;
    return (
      <div className='module'>
        <select ref='career' onChange={this.select}>
          {Object.keys(careers).map((key)=>
            <option value={key} key={key}>{careers[key].name}</option>
          )}
        </select>
        <h2>Career:&nbsp;<span className='title'>{selected.name}</span></h2>
        <h3>Career Skills:</h3>
        <ul>{selected.skills.map((skill)=>
          <li key={skill}>{skill}</li>
      )}</ul>
        <p><b>Setting:</b>&nbsp;{selected.setting}</p>
        <p><b>Description:</b>&nbsp;{selected.description}</p>
      </div>
    );
  }
}
