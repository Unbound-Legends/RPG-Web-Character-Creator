import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeChannel} from '../actions/index'
import About from './About';

class Channel extends Component {
  handleSubmit = (event) => {
    window.location = `/${this.props.channel}`;
    event.preventDefault();
  }

  handleChange = (event) => {
    this.props.changeState(event.target.value)
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
          <input type="text" value={this.props.channel} onChange={this.handleChange}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
        <About/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        channel: state.channel,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeState: changeChannel}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Channel);
