import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Input, InputGroupAddon, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {addData} from '../actions';

class VehicleSelectComponent extends React.Component {
	state = {};

	componentWillReceiveProps(nextProps) {
		console.log(nextProps)
	}

	handleSelect = (event) => {
		const {changeCharacter, loadData} = this.props;
		changeCharacter(event.target.value);
		loadData();
		event.preventDefault();
	};

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
		event.preventDefault();
	};

	render() {
		const {vehicle, addData, vehicleList, theme} = this.props;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>VEHICLES</div>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Col className='my-2'>
						<Input type='select' value={vehicle} onChange={this.handleSelect}>
							{vehicleList && Object.keys(vehicleList).map(key =>
								<option value={key}
										key={key}>{vehicleList[key].name ? vehicleList[key].name : 'Unnamed Vehicle'}</option>
							)}
						</Input>
					</Col>
					<Col md='auto'>
						<InputGroupAddon addonType='append'>
							<ButtonGroup>
								<Button onClick={() => addData('vehicle')}>New</Button>
							</ButtonGroup>
						</InputGroupAddon>
					</Col>
				</Row>
				<hr/>
			</div>

		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		theme: state.theme,
		vehicle: state.vehicle,
		vehicles: state.vehicles,
		vehicleList: state.vehicleList,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({
	addData
}, dispatch);

export const VehicleSelect = connect(mapStateToProps, matchDispatchToProps)(VehicleSelectComponent);