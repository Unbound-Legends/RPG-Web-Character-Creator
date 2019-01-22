import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {addDataSet, modifyDataSet, removeDataSet} from '../../actions';
import {Fragment} from './';

const type = 'customVehicles';

class CustomVehiclesComponent extends React.Component {
	state = {
		name: '',
		silhouette: 0,
		maxSpeed: 0,
		handling: 0,
		defense: 0,
		armor: 0,
		hullTraumaThreshold: 0,
		systemStrainThreshold: 0,
		skill: '',
		complement: '',
		passengerCapacity: 0,
		price: 0,
		rarity: 0,
		consumables: '',
		encumbranceCapacity: 0,
		weapons: '',
		setting: [],
		mode: 'add',
	};

	initState = () => {
		this.setState({
			name: '',
			silhouette: 0,
			maxSpeed: 0,
			handling: 0,
			defense: 0,
			armor: 0,
			hullTraumaThreshold: 0,
			systemStrainThreshold: 0,
			skill: '',
			complement: '',
			passengerCapacity: 0,
			price: 0,
			rarity: 0,
			consumables: '',
			encumbranceCapacity: 0,
			weapons: '',
			setting: [],
			mode: 'add',
		});
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleDuplicate = (event) => {
		const {customVehicles} = this.props;
		// noinspection JSUnusedLocalSymbols
		const {id, ...data} = {...customVehicles[event.target.name]};
		this.props.addDataSet(type, {...data, name: `${data.name} (copy)`});
		event.preventDefault();
	};

	handleSubmit = (event) => {
		const {mode, ...data} = this.state;
		if (mode === 'add') this.props.addDataSet(type, data);
		else if (mode === 'edit') this.props.modifyDataSet(type, data);
		this.initState();
		event.preventDefault();
	};

	handleDelete = (event) => {
		this.props.removeDataSet(type, this.props[type][event.target.name].id);
		event.preventDefault();
	};

	handleEdit = (event) => {
		const {customVehicles} = this.props;
		this.setState({mode: 'edit', ...customVehicles[event.target.name]});
	};

	buildField = (field) => {
		const {skills} = this.props;
		switch (field) {
			case 'name':
			case 'consumables':
			case 'complement':
				return <Fragment key={field} type='text' value={this.state[field]} title={field}
								 handleChange={(event) => this.setState({[field]: event.target.value})}/>;
			case 'silhouette':
			case 'maxSpeed':
			case 'handling':
			case 'defense':
			case 'armor':
			case 'hullTraumaThreshold':
			case 'systemStrainThreshold':
			case 'passengerCapacity':
			case 'price':
			case 'encumbranceCapacity':
				return <Fragment key={field} type='number' value={this.state[field]} title={field}
								 handleChange={(event) => this.setState({[field]: event.target.value})}/>;
			case 'skill':
				return <Fragment key={field} type='inputSelect' name='skill' value={this.state[field]}
								 array={Object.keys(skills).filter(skill => skills[skill].type === 'General')} nameObj={skills}
								 handleChange={(event) => this.setState({skill: event.target.value})}/>;
			case 'rarity':
				return <Fragment key={field} type='inputSelect' name='rarity' value={this.state[field]}
								 array={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} handleChange={(event) => this.setState({rarity: event.target.value})}/>;
			case 'weapons':
				return <Fragment key={field} type='weapons' value={this.state[field]}
								 handleChange={(event) => this.setState({[field]: event.target.value})}/>;

			default:
				return <div/>;
		}
	};

	render() {
		const {customVehicles} = this.props;
		const {mode, setting} = this.state;
		return (
			<div>
				{['name', 'silhouette', 'maxSpeed', 'handling', 'defense', 'armor', 'hullTraumaThreshold', 'systemStrainThreshold', 'skill',
					'complement', 'passengerCapacity', 'price', 'rarity', 'consumables', 'encumbranceCapacity', 'weapons'].map(field => this.buildField(field))}

				<Fragment type='setting' setting={setting} setState={(selected) => this.setState({setting: selected})}/>

				<ControlButtonSet mode={mode} type={'Vehicle'} handleSubmit={this.handleSubmit} onEditSubmit={this.handleSubmit}
								  onEditCancel={this.initState} disabled={this.state.name === ''}/>
				.
				<Table>
					<thead>
					<tr>
						<th>NAME</th>
						<th/>
					</tr>
					</thead>
					<tbody>
					{Object.keys(customVehicles)
						.sort((a, b) => customVehicles[a].name > customVehicles[b].name ? 1 : -1)
						.map(key =>
						<tr key={key}>
							<td>
								{customVehicles[key].name}
							</td>
							<td>
								<ButtonGroup>
									<Button name={key} onClick={this.handleEdit}>Edit</Button>
									<Button name={key} onClick={this.handleDuplicate}>Duplicate</Button>
									<DeleteButton name={key} onClick={this.handleDelete}/>
								</ButtonGroup>
							</td>
						</tr>
					)}
					</tbody>
				</Table>
			</div>
		)
			;
	}
}

const mapStateToProps = state => {
	return {
		customVehicles: state.customVehicles,
		skills: state.skills,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({removeDataSet, addDataSet, modifyDataSet}, dispatch);

export const CustomVehicles = connect(mapStateToProps, matchDispatchToProps)(CustomVehiclesComponent);
