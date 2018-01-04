import React from 'react';
import '../styles/index.css';
import About from '../blocks/About';

export default class Channel extends React.Component {
  state = {value : ''};

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    console.log(this.state.value);
    window.location = `/${this.state.value}`;
    event.preventDefault();
  }

  render() {
    return (
      <div className='login-box'>
        <div>
        <h1>A Cool Name</h1>
        <h2>RPG Character Creator</h2>
        <br />
        <img src={`/images/favicon.png`} alt='' style={{maxWidth:'350px'}} />
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <br/>
          <input type="submit" value="Submit" />
        </form>
        <About/>
        </div>
      </div>
    );
  }
}
