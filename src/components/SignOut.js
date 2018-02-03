import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeUser} from '../actions';
import firebase from 'firebase';

class SignOut extends React.Component {

    handleClick = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.changeUser(null);
            });
    };


    render() {
        return (
          <div style={{textAlign: 'right'}}>
              <button onClick={this.handleClick}>Sign Out</button>
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
    return bindActionCreators({changeUser}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(SignOut);
