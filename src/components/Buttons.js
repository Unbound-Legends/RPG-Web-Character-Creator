import firebase from '@firebase/app';
import '@firebase/auth';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {addCharacter, changePrintContent, changeUser} from '../actions';
import {PrintLayout} from './printLayout/index';

class ButtonsComponent extends React.Component {

	handleClick = () => {
		firebase.auth().signOut()
			.then(() => {
				this.props.changeUser(null);
			});
	};

	render() {
		return (
			<Row className='justify-content-end align-items-center d-print-none'>
				<Col sm='auto'>
					<Button size='sm' className='mx-2' onClick={() => this.props.changePrintContent(<PrintLayout/>)}>Print</Button>
					<Button size='sm' className='mx-2' onClick={() => window.open('https://paypal.me/SkyJedi')}>Donate</Button>
					<Button size='sm' className='mx-2' onClick={() => window.open("https://patreon.com/SkyJedi")}>Patreon</Button>
					<Button size='sm' className='mx-2' onClick={this.handleClick}>Sign Out</Button>
				</Col>
			</Row>

		);
	}
}

const mapStateToProps = state => {
	return {
		channel: state.channel,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeUser, addCharacter, changePrintContent}, dispatch);

export const Buttons = connect(mapStateToProps, matchDispatchToProps)(ButtonsComponent);
