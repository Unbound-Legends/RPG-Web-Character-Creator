import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Form, FormGroup, Input, InputGroupAddon, Label, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {addListData, changeDocData, changeListActive, changeName, removeListData} from '../actions';

class VehicleSelectComponent extends React.Component {
	state = {name: this.props.vehicleList[this.props.vehicle] ? this.props.vehicleList[this.props.vehicle].name : ''};

	componentWillReceiveProps(nextProps) {
		this.setState({name: nextProps.vehicleList[nextProps.vehicle] ? nextProps.vehicleList[nextProps.vehicle].name : ''});
	}

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
		event.preventDefault();
	};

	handleSelect = (event) => {
	};

	render() {
		const {vehicle, vehicles, addListData, vehicleList, theme, vehicleType, changeListActive, changeDocData, removeListData, vehicleWrite} = this.props;
		const {name} = this.state;
		return (
			<Form>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>VEHICLES</div>
				</Row>
				<hr/>
				<FormGroup row>
					<Label sm={2}><b>VEHICLE</b></Label>
					<Col md={4}>
						<Input type='select' bsSize='sm' disabled={0 >= Object.keys(vehicleList).length} value={vehicle}
							   onChange={event => changeListActive(event.target.value, 'vehicle')}>
							{Object.keys(vehicleList).map(key =>
								<option value={key}
										key={key}>{vehicleList[key].name ? vehicleList[key].name : 'Unnamed Vehicle'}</option>
							)}
						</Input>
					</Col>
					<Col md={2}>
						<InputGroupAddon addonType='append'>
							<ButtonGroup>
								<Button onClick={() => addListData('vehicle')}>New</Button>
								<Button disabled={!vehicle || !vehicleWrite} onClick={() => removeListData('vehicle', vehicle)}>Delete</Button>
							</ButtonGroup>
						</InputGroupAddon>
					</Col>
				</FormGroup>
				{!vehicleWrite && <FormGroup row><b>READ-ONLY</b></FormGroup>}
				<FormGroup row>
					<Label sm={2}><b>NAME</b></Label>
					<Col md={6}>
						<Input type='text' bsSize='sm' disabled={!vehicle || !vehicleWrite} value={name ? name : ''} maxLength='50' name='name'
							   onChange={(event) => this.setState({name: event.target.value})}
							   onBlur={() => changeName('vehicle', vehicle, name)}/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}><b>TYPE</b></Label>
					<Col md={6}>
						<Input type='select' bsSize='sm' disabled={!vehicle || !vehicleWrite} value={vehicleType}
							   onChange={(event) => changeDocData('vehicle', 'vehicleType', event.target.value)}>
							<option value=''/>
							{vehicles && Object.keys(vehicles).map(key =>
								<option value={key}
										key={key}>{vehicles[key].name ? vehicles[key].name : 'Unnamed Vehicle'}</option>
							)}
						</Input>
					</Col>
				</FormGroup>
				<hr/>
			</Form>

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
		vehicleType: state.vehicleType,
		vehicleWrite: state.vehicleWrite,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({
	addListData, changeListActive, removeListData, changeName, changeDocData
}, dispatch);

export const VehicleSelect = connect(mapStateToProps, matchDispatchToProps)(VehicleSelectComponent);