import React, { Component } from 'react';
import './style/index.css';
import About from './blocks/About';

class Channel extends Component {

  setChannel(stop) {
    stop.preventDefault();
    var channel = this.refs.channel.value.replace(/\W/g, '').toLowerCase();
    this.props.setFormChan(channel);
  }

  render() {
    return (
      <div className='login-box'>
        <div>
        <h1>A Cool Name</h1>
        <h2>RPG Character Creator</h2>
        <br />
        <img src={`/favicon.png`} alt='' style={{maxWidth:'350px'}} />
        <form onSubmit={this.setChannel.bind(this)}>
          <input className='textinput' style={{textAlign: 'center'}} ref="channel" name="channel" placeholder="Channel Name" />
          <br/>
          <button>Enter</button>
        </form>
        <About/>
        </div>
      </div>
    );
  }
}
export default Channel;
