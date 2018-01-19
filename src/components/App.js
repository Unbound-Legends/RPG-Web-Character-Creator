import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeChannel} from '../actions';
import {MainPage, Channel} from './index';

class App extends React.Component {

  render() {
    return (
      <div>
        {window.location.pathname==='/' ? <Channel /> : <MainPage />}
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
    return bindActionCreators({changeChannel: changeChannel}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
