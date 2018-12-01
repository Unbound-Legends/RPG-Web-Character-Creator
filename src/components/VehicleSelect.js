import {upperCase} from 'lodash-es'
import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Input, InputGroupAddon, Label, Row} from 'reactstrap';
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
		event.preventDefault();
		if (event.target.id === 'number') event.target.value = +event.target.value;
		this.setState({[event.target.name]: event.target.value});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		if (event.target.id === 'number') event.target.value = +event.target.value;
		this.props.changeDocData('vehicle', event.target.name, event.target.value);
	};

	handleNameChange = (event) => {
		event.preventDefault();
		this.props.changeListActive(event.target.value, 'vehicle');
	};

	confirmedDelete = (event) => {
		this.props.removeListData('vehicle', this.props.vehicle);
		this.setState({deleteModal: false});
		event.preventDefault();
	};

	render() {
		const {vehicle, vehicles, addListData, vehicleList, theme, vehicleType, vehicleWrite,} = this.props;
		const {name, vehicleNotes, deleteModal} = this.state;
		return <div>
			<Row className='justify-content-end'>
				<div className={`header header-${theme}`}>VEHICLES</div>
			</Row>
			<hr/>
			<Row className='align-items-center'>
				<Label sm={2}><b>VEHICLE</b></Label>
				<Col sm={4}>
					<Input type='select'
						   bsSize='sm'
						   disabled={0 >= Object.keys(vehicleList).length} value={vehicle}
						   onChange={this.handleNameChange}>
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
			</Row>
			<hr/>
			{!vehicleWrite && <Row><b>READ-ONLY</b></Row>}
			<Row>
				<Label sm={2}><b>NAME</b></Label>
				<Col sm={6}>
					<Input type='text'
						   name='name'
						   bsSize='sm'
						   disabled={!vehicle || !vehicleWrite}
						   value={name ? name : ''}
						   maxLength='50'
						   onChange={this.handleChange}
						   onBlur={() => changeName('vehicle', vehicle, name)}/>
				</Col>
			</Row>
			<hr/>
			<Row className='align-items-center'>
				<Label sm={2}><b>TYPE</b></Label>
				<Col sm={6}>
					<Input type='select'
						   bsSize='sm'
						   disabled={!vehicle || !vehicleWrite}
						   name='vehicleType'
						   value={vehicleType}
						   onChange={this.handleSubmit}>
						<option value=''/>
						{vehicles && Object.keys(vehicles).map(key =>
							<option value={key}
									key={key}>{vehicles[key].name ? vehicles[key].name : 'Unnamed Vehicle'}</option>
						)}
					</Input>
				</Col>
			</Row>
			<hr/>
			<div className='VehicleStatBlock justify-content-center'>
				<img src={images[theme].VehicleStatBlock} alt='' className='svg'/>
				{['silhouette', 'maxSpeed', 'handling', 'defense', 'armor', 'hullTraumaThreshold', 'systemStrainThreshold'].map(type =>
					<div key={type} className={`vehicleStat vehicleStat-${type}`}>{vehicles[vehicleType] && vehicles[vehicleType][type]}</div>
				)}
				{['currentHullTrauma', 'currentSystemStrain'].map(type =>
					<Input key={type}
						   type='number'
						   bsSize='sm'
						   name={type}
						   id='number'
						   maxLength='2'
						   disabled={!vehicle || !vehicleWrite}
						   className={`vehicleStat vehicleStat-${type} px-1 pt-1`}
						   onChange={this.handleChange}
						   onBlur={this.handleSubmit}
						   value={this.state[type] > 0 ? this.state[type] : ''}/>
				)}
			</div>
			{['skill', 'complement', 'passengerCapacity', 'price', 'rarity', 'consumables', 'encumbranceCapacity'].map(type =>
				<Row key={type} className='align-items-center mb-1'>
					<Label for={type} sm='auto'><b>{`${upperCase(type)}:`}</b></Label>
					<Col id={type}>
						{vehicles[vehicleType] && vehicles[vehicleType][type]}
					</Col>
				</Row>
			)}
			<Row className='align-items-top mb-1'>
				<Label for={'weapons'} sm='auto'><b>{`WEAPONS:`}</b></Label>
				<Col id={'weapons'} className='text-pre'>
					{vehicles[vehicleType] && vehicles[vehicleType].weapons}
				</Col>
			</Row>
			<Row className='align-items-top mb-1'>
				<Label sm='auto' for='features'><b>NOTES</b></Label>
				<Col>
					<Input onChange={this.handleChange}
						   onBlur={this.handleSubmit}
						   type='textarea'
						   rows='12'
						   className='w-100 my-auto'
						   maxLength='1000'
						   name='vehicleNotes'
						   id='text'
						   value={vehicleNotes}/>
				</Col>
			</Row>
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