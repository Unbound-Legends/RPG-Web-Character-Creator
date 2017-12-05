import React, { Component } from 'react';
import './index.css';

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
      <h2>RPG Character Creator</h2> <br />
      </div>
      <img src={`/favicon.png`} alt='' style={{maxWidth:'350px'}} />
      <form onSubmit={this.setChannel.bind(this)}>
        <input className='textinput' style={{textAlign: 'center'}} ref="channel" name="channel" placeholder="Channel Name" /> <br /> <br />
        <div>
        <button style={{display: 'inline-block'}}>Enter</button>
        </div>
      </form>
        <div style={{paddingTop: '2em'}}>
          <span>Created by SkyJedi</span> <br/><br/>
          <span>Questions? Comments? <a href="mailto:skyjedi@gmail.com?subject=D1-C3%20Feedback">Contact Me</a></span> <div />
          <h6>A Character Creator for Fantasy Flight Games, Genesys</h6>
        </div>
      </div>
    );
  }
}
export default Channel;
