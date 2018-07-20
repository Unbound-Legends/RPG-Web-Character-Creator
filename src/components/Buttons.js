import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCharacter, changePrintContent, changeUser} from '../actions';
import firebase from '@firebase/app';
import '@firebase/auth';
import {Button, Col, Row} from 'reactstrap';
import {PrintLayout} from './printLayout/index';

class ButtonsComponent extends React.Component {

	handleClick = () => {
		firebase.auth().signOut()
			.then(() => {
				this.props.changeUser(null);
			});
	};

	handleDonate = () => {
		window.open('https://paypal.me/SkyJedi');
	};

	handlePrint = () => {
		this.props.changePrintContent(<PrintLayout/>)
	};

	render() {
		return (
			<Row className='justify-content-end align-items-center d-print-none'>
				<Col sm='auto'>
					<Button size='sm' onClick={this.handlePrint}>Print</Button>
					{' '}
					<Button size='sm' onClick={this.handleDonate}>Donate</Button>
					{' '}
					<Button size='sm' onClick={this.handleClick}>Sign Out</Button>
				</Col>
			</Row>

		);
	}
}

function mapStateToProps(state) {
	return {
		channel: state.channel,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({changeUser, addCharacter, changePrintContent}, dispatch);
}

export const Buttons = connect(mapStateToProps, matchDispatchToProps)(ButtonsComponent);
