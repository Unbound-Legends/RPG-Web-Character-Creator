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
		key: ''
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
			key: ''
		});
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleSubmit = (event) => {
		const {mode, key, ...data} = this.state;
		this.props.addDataSet(type, data, key, mode);
		this.initState();
		event.preventDefault();
	};

	handleDuplicate = (event) => {
		const {customVehicles} = this.props;
		let data = {...customVehicles[event.target.name]};
		this.props.addDataSet(type, {...data, name: `${data.name} (copy)`});
		event.preventDefault();
	};

	handleEditSubmit = (event) => {
		const {mode, key, ...data} = this.state;
		this.props.modifyDataSet(type, data, key, mode);
		this.initState();
		event.preventDefault();
	};

	handleDelete = (event) => {
		this.props.removeDataSet(type, event.target.name);
		event.preventDefault();
	};

	handleEdit = (event) => {
		const {customVehicles} = this.props;
		this.setState({mode: 'edit', key: event.target.name, ...customVehicles[event.target.name]});
	};

	buildField = (field) => {
		const {skills} = this.props;
		switch (field) {
			case 'name':
			case 'consumables':
			case 'weapons':
				return <Fragment key={field} type='text' value={this.state[field]} title={field}
								 handleChange={(event) => this.setState({[field]: event.target.value})}/>;
			case 'silhouette':
			case 'maxSpeed':
			case 'handling':
			case 'defense':
			case 'armor':
			case 'hullTraumaThreshold':
			case 'systemStrainThreshold':
			case 'complement':
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

				<ControlButtonSet mode={mode} type={'Vehicle'} handleSubmit={this.handleSubmit} onEditSubmit={this.handleEditSubmit}
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
					{Object.keys(customVehicles).sort((a, b) => customVehicles[a].name < customVehicles[b].name ? -1 : (customVehicles[a].name > customVehicles[b].name ? 1 : 0)).map(key =>
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
