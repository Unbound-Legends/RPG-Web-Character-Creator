import React, {Component} from 'react';
import About from './About';

export default class Channel extends Component {
  state = {text: ''};

  handleSubmit = (event) => {
    window.location = `/${this.state.text}`;
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({text: event.target.value});
  }

  render() {
    return (
      <div className='login-box'>
        <div>
        <h1>The Emporium</h1>
        <h2>Genesys Character Creator</h2>
        <br />
        <img src={`/images/favicon.png`} alt='' style={{maxWidth:'350px'}} />
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.text} onChange={this.handleChange}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
        <About/>
        </div>
      </div>
    );
  }
}
