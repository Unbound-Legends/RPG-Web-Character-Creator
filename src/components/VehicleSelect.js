import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Input, InputGroupAddon, Row} from 'reactstrap';
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
		const {vehicle, vehicles, addListData, vehicleList, theme, vehicleType, changeListActive, changeDocData, removeListData} = this.props;
		const {name} = this.state;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>VEHICLES</div>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Col className='my-2'>
						<Input type='select' disabled={0 >= Object.keys(vehicleList).length} value={vehicle}
							   onChange={(event) => changeListActive(event.target.value, 'vehicle')}>
							{Object.keys(vehicleList).map(key =>
								<option value={key}
										key={key}>{vehicleList[key].name ? vehicleList[key].name : 'Unnamed Vehicle'}</option>
							)}
						</Input>
					</Col>
					<Col md='auto'>
						<InputGroupAddon addonType='append'>
							<ButtonGroup>
								<Button onClick={() => addListData('vehicle')}>New</Button>
								<Button onClick={() => removeListData('vehicle', vehicle)}>Delete</Button>
							</ButtonGroup>
						</InputGroupAddon>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Col sm='4' className='m-auto'>
						<b>NAME:</b>
					</Col>
					<Col className='m-auto'>
						<Input type='text' value={name ? name : ''} maxLength='50' name='name'
							   onChange={(event) => this.setState({name: event.target.value})}
							   onBlur={() => changeName('vehicle', vehicle, name)}/>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Col sm='4' className='m-auto'>
						<b>TYPE:</b>
					</Col>
					<Col>
						<Input type='select' value={vehicleType} onChange={(event) => changeDocData('vehicle', 'vehicleType', event.target.value)}>
							<option value=''/>
							{vehicles && Object.keys(vehicles).map(key =>
								<option value={key}
										key={key}>{vehicles[key].name ? vehicles[key].name : 'Unnamed Vehicle'}</option>
							)}
						</Input>
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
		vehicleType: state.vehicleType,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({
	addListData, changeListActive, removeListData, changeName, changeDocData
}, dispatch);

export const VehicleSelect = connect(mapStateToProps, matchDispatchToProps)(VehicleSelectComponent);