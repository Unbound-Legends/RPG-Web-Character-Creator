import React, {Component} from 'react';
import firebase from 'firebase';
import About from './About';



export default class User extends Component {

    handleClick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
     };

    render() {
        return (
          <div className='login-box'>
            <div>
            <h1>The Emporium</h1>
            <h2>Genesys Character Creator</h2>
            <img src={`/images/favicon.png`} alt='' style={{maxWidth:'350px'}} />
            <div>
                <input type="button" className='signin-google' onClick={this.handleClick}/>
            </div>
            <About/>
            </div>
          </div>
        );
    }
}

