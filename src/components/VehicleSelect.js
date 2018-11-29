import {upperCase} from 'lodash-es'
import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Form, FormGroup, Input, InputGroupAddon, Label, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {addListData, changeDocData, changeListActive, changeName, removeListData} from '../actions';
import * as images from '../images';
import {ModalDeleteConfirm} from './';

class VehicleSelectComponent extends React.Component {
	state = {
		name: this.props.vehicleList[this.props.vehicle] ? this.props.vehicleList[this.props.vehicle].name : '',
		currentSystemStrain: this.props.currentSystemStrain,
		currentHullTrauma: this.props.currentHullTrauma,
		vehicleNotes: this.props.vehicleNotes,
		deleteModal: false,
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.vehicle !== this.props.vehicle) this.setState({name: nextProps.vehicleList[nextProps.vehicle] ? nextProps.vehicleList[nextProps.vehicle].name : ''});
		if (nextProps.currentHullTrauma !== this.props.currentHullTrauma) this.setState({currentHullTrauma: nextProps.currentHullTrauma});
		if (nextProps.currentSystemStrain !== this.props.currentSystemStrain) this.setState({currentSystemStrain: nextProps.currentSystemStrain});
		if (nextProps.vehicleNotes !== this.props.vehicleNotes) this.setState({vehicleNotes: nextProps.vehicleNotes});
	}

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
		event.preventDefault();
	};

	confirmedDelete = (event) => {
		this.props.removeListData('vehicle', this.props.vehicle);
		this.setState({deleteModal: false});
		event.preventDefault();
	};

	render() {
		const {vehicle, vehicles, addListData, vehicleList, theme, vehicleType, changeListActive, changeDocData, vehicleWrite,} = this.props;
		const {name, vehicleNotes, deleteModal} = this.state;
		return <div>
			<Form>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>VEHICLES</div>
				</Row>
				<hr/>
				<FormGroup row className='align-items-center'>
					<Label sm={2}><b>VEHICLE</b></Label>
					<Col sm={4}>
						<Input type='select' bsSize='sm' disabled={0 >= Object.keys(vehicleList).length} value={vehicle}
							   onChange={event => changeListActive(event.target.value, 'vehicle')}>
							{Object.keys(vehicleList).map(key =>
								<option value={key}
										key={key}>{vehicleList[key].name ? vehicleList[key].name : 'Unnamed Vehicle'}</option>
							)}
						</Input>
					</Col>
					<Col sm={2}>
						<InputGroupAddon addonType='append'>
							<ButtonGroup>
								<Button onClick={() => addListData('vehicle')}>New</Button>
								<Button disabled={!vehicle || !vehicleWrite} onClick={() => this.setState({deleteModal: true})}>Delete</Button>
							</ButtonGroup>
						</InputGroupAddon>
					</Col>
				</FormGroup>
				{!vehicleWrite && <FormGroup row><b>READ-ONLY</b></FormGroup>}
				<FormGroup row>
					<Label sm={2}><b>NAME</b></Label>
					<Col sm={6}>
						<Input type='text' bsSize='sm' disabled={!vehicle || !vehicleWrite} value={name ? name : ''} maxLength='50' name='name'
							   onChange={(event) => this.setState({name: event.target.value})}
							   onBlur={() => changeName('vehicle', vehicle, name)}/>
					</Col>
				</FormGroup>
				<FormGroup row className='align-items-center'>
					<Label sm={2}><b>TYPE</b></Label>
					<Col sm={6}>
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
			</Form>
			<hr/>
			<div className='VehicleStatBlock'>
				<img src={images[theme].VehicleStatBlock} alt='' className='svg'/>
				{['silhouette', 'maxSpeed', 'handling', 'defense', 'armor', 'hullTraumaThreshold', 'systemStrainThreshold'].map(type =>
					<div key={type} className={`vehicleStat vehicleStat-${type}`}>{vehicles[vehicleType] && vehicles[vehicleType][type]}</div>
				)}
				{['currentHullTrauma', 'currentSystemStrain'].map(type =>
					<Input key={type}
						   type='number'
						   bsSize='sm'
						   name={type}
						   maxLength='2'
						   disabled={!vehicle || !vehicleWrite}
						   className={`vehicleStat vehicleStat-${type} px-1 pt-1`}
						   onChange={(event) => this.setState({[type]: +event.target.value})}
						   onBlur={(event) => changeDocData('vehicle', type, +event.target.value)}
						   value={this.state[type] > 0 ? this.state[type] : ''}/>
				)}
			</div>
			{['skill', 'complement', 'passengerCapacity', 'price', 'rarity', 'consumables', 'encumbranceCapacity'].map(type =>
				<FormGroup row key={type} className='align-items-center mb-1'>
					<Label for={type} sm='auto'><b>{`${upperCase(type)}:`}</b></Label>
					<Col id={type}>
						{vehicles[vehicleType] && vehicles[vehicleType][type]}
					</Col>
				</FormGroup>
			)}
			<FormGroup row className='align-items-top mb-1'>
				<Label for={'weapons'} sm='auto'><b>{`WEAPONS:`}</b></Label>
				<Col id={'weapons'} className='text-pre'>
					{vehicles[vehicleType] && vehicles[vehicleType].weapons}
				</Col>
			</FormGroup>
			<FormGroup row className='align-items-top mb-1'>
				<Label sm='auto' for='features'><b>NOTES</b></Label>
				<Col>
					<Input onChange={(event) => this.setState({vehicleNotes: event.target.value})}
						   onBlur={() => changeDocData('vehicle', 'vehicleNotes', vehicleNotes)}
						   type='textarea'
						   rows='12'
						   className='w-100 my-auto'
						   maxLength='1000'
						   name='features'
						   id='features'
						   value={vehicleNotes}/>
				</Col>
			</FormGroup>
			<ModalDeleteConfirm deleteModal={deleteModal}
								confirmedDelete={this.confirmedDelete}
								handleClose={() => this.setState({deleteModal: false})}
								type='Vehicle'/>
		</div>;
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
		currentHullTrauma: state.currentHullTrauma,
		currentSystemStrain: state.currentSystemStrain,
		vehicleNotes: state.vehicleNotes
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({
	addListData, changeListActive, removeListData, changeName, changeDocData
}, dispatch);

export const VehicleSelect = connect(mapStateToProps, matchDispatchToProps)(VehicleSelectComponent);