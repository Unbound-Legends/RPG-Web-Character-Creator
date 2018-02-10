import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeUser, addCharacter} from '../actions';
import firebase from 'firebase';
import {ImportExport} from './index';

class Buttons extends React.Component {



    handleClick = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.changeUser(null);
            });
    };

    handleDonate = () => {
        window.open('https://paypal.me/SkyJedi');
    };

    render() {
        return (
          <div className='hidePrint' style={{textAlign: 'right'}}>
              <ImportExport />
              <input type='button' onClick={this.handleDonate} value="Donate" />
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
    return bindActionCreators({changeUser, addCharacter}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Buttons);
