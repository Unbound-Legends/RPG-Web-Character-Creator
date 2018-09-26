import firebase from '@firebase/app';
import '@firebase/auth';
import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Row} from 'reactstrap';
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
			<Row className='m-1 justify-content-end align-items-center d-print-none'>
				<ButtonGroup>
					<Button size='sm' onClick={() => this.props.changePrintContent(<PrintLayout/>)}>Print</Button>
					<Button size='sm' onClick={() => window.open('https://paypal.me/SkyJedi')}>Donate</Button>
					<Button size='sm' onClick={() => window.open("https://patreon.com/SkyJedi")}>Patreon</Button>
					<Button size='sm' onClick={this.handleClick}>Sign Out</Button>
				</ButtonGroup>
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
