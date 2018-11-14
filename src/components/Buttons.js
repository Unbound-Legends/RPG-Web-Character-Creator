import firebase from '@firebase/app';
import '@firebase/auth';
import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Input, Label, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData, changePrintContent, changeUser} from '../actions';
import {PrintLayout} from './printLayout/index';

class ButtonsComponent extends React.Component {

	handleClick = () => {
		firebase.auth().signOut()
			.then(() => {
				this.props.changeUser(null);
			});
	};

	render() {
		const {changePrintContent, theme, themes, changeData} = this.props;
		return (
			<Row className='m-1 justify-content-between d-print-none'>
				<Col className='d-inline-flex' sm={4} style={{fontSize: '0.7rem'}}>
					<Label for='theme' className='mr-1 my-auto'><b>THEME</b></Label>
					<Input id='theme' type='select' value={theme} bsSize='sm'
						   onChange={(event) => changeData(event.target.value, 'theme')}>
						{Object.keys(themes).sort().map(key =>
							<option value={key} key={key}>{themes[key]}</option>
						)}
					</Input>
				</Col>
				<Col sm='4' className='text-right'>
					<ButtonGroup>
						<Button size='sm' onClick={() => changePrintContent(<PrintLayout/>)}>Print</Button>
						<Button size='sm' onClick={() => window.open('https://paypal.me/SkyJedi')}>Donate</Button>
						<Button size='sm' onClick={() => window.open("https://patreon.com/SkyJedi")}>Patreon</Button>
						<Button size='sm' onClick={this.handleClick}>Sign Out</Button>
					</ButtonGroup>
				</Col>
			</Row>
		);
	}
}

const mapStateToProps = state => {
	return {
		theme: state.theme,
		themes: state.themes,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changePrintContent, changeUser, changeData}, dispatch);

export const Buttons = connect(mapStateToProps, matchDispatchToProps)(ButtonsComponent);
