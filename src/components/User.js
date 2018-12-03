import {firebase} from '@firebase/app'
import '@firebase/auth'
import firebaseui from 'firebaseui'
import React, {Component} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {Container, Row} from 'reactstrap';
import * as images from '../images';
import {About} from './index';

export class User extends Component {

	uiConfig = {
		signInFlow: 'popup',
		autoUpgradeAnonymousUsers: true,
		callbacks: {
			signInFailure: console.error,
			onAuthStateChanged: console.log,
		},
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			{
				provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
				// Invisible reCAPTCHA with image challenge and bottom left badge.
				recaptchaParameters: {
					type: 'image',
					size: 'invisible',
					badge: 'bottomleft'
				}
			}, firebase.auth.EmailAuthProvider.PROVIDER_ID,
			firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
		],
	};

	render() {
		return (
			<div>
				<Container className='container-fluid my-4'>
					<div className={`bg bg-CRB d-print-none`}/>
					<Row className='justify-content-center'>
						<h1>Genesys Emporium</h1>
					</Row>
					<Row className='justify-content-center'>
						<h2>Genesys Character Creator</h2>
					</Row>
					<Row className='justify-content-center my-4'>
						<img src={images.CRB.Logo} alt='' style={{maxHeight: '150px'}}/>
					</Row>
					<Row className='justify-content-center my-2'>
						<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
					</Row>
					<Row className='justify-content-center'>
						<About/>
					</Row>
				</Container>
			</div>
		);
	}
}

