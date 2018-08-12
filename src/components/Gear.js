import React from 'react';
import {connect} from 'react-redux';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';

const clone = require('clone');

class GearComponent extends React.Component {

	handleAdd = (event) => {
		const {type, changeData} = this.props;
		let obj = {...this.props[type]};
		let key = Math.random().toString(36).substr(2, 16);
		obj[key] = {id: event.target.name, carried: true, equipped: false};
		changeData(obj, `${type}`);
		this.handleClose();
		event.preventDefault();
	};

	handleSelect = (event) => {
		this.setState({selected: event.target.value});
		event.preventDefault();
	};

	handleClose = () => {
		this.props.handleClose();
	};

	generateEquipmentTableHeader = () => {
		const {type} = this.props;

		switch (type) {
			case 'equipmentWeapons':
				return (
					<tr className='text-center'>
						<th>Add</th>
						<th className='text-left'>Name</th>
						<th className='text-left'>Skill</th>
						<th>DAM</th>
						<th>CRIT</th>
					</tr>
				);
			case 'equipmentArmor':
				return (
					<tr className='text-center'>
						<th>Add</th>
						<th className='text-left'>Name</th>
						<th>Soak</th>
						<th>Defense</th>
					</tr>
				);
			case 'equipmentGear':
				return (
					<tr className='text-center'>
						<th>Add</th>
						<th className='text-left'>Name</th>
						<th>Price</th>
					</tr>
				);
			default:
				break;
		}
	};

	generateEquipmentTableBody = (item) => {
		const {weapons, armor, gear, skills, type} = this.props;
		switch (type) {
			case 'equipmentWeapons':
				return (
					<tr key={item}>
						<td>
							<Button color='secondary' name={item} onClick={this.handleAdd}>+</Button>
						</td>
						<td>{weapons[item].name}</td>
						<td>{skills[weapons[item].skill] && skills[weapons[item].skill].name}</td>
						<td className='text-center'>{weapons[item].damage}</td>
						<td className='text-center'>{weapons[item].critical}</td>
					</tr>
				);

			case 'equipmentArmor':
				return (
					<tr key={item}>
						<td>
							<Button color='secondary' name={item} onClick={this.handleAdd}>+</Button>
						</td>
						<td>{armor[item].name}</td>
						<td className='text-center'>{armor[item].soak}</td>
						<td className='text-center'>{armor[item].defense}</td>
					</tr>
				);
			case 'equipmentGear':
				return (
					<tr key={item}>
						<td>
							<Button color='secondary' name={item} onClick={this.handleAdd}>+</Button>
						</td>
						<td>{gear[item].name}</td>
						<td className='text-center'>{gear[item].price}</td>
					</tr>
				);
			default:
				break;
		}
	};

	render() {
		const {type, modal, weapons, armor, gear} = this.props;
		let data;
		switch (type) {
			case 'equipmentWeapons':
				data = clone(weapons);
				break;
			case 'equipmentArmor':
				data = clone(armor);
				break;
			case 'equipmentGear':
				data = clone(gear);
				break;
			default:
				break;
		}
		return (
			<Modal isOpen={!!modal} toggle={this.handleClose}>
				<ModalHeader toggle={this.handleClose}>Select your {type.toString().slice(9)}</ModalHeader>
				<ModalBody className='m-1'>
					<Row>
						<Table>
							<thead>
							{this.generateEquipmentTableHeader()}
							</thead>
							<tbody>
							{data &&
							Object.keys(data).sort().map(item =>
								this.generateEquipmentTableBody(item)
							)}
							</tbody>

						</Table>
					</Row>
				</ModalBody>
				<ModalFooter>
					<Button onClick={this.handleClose}>Close</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		armor: state.armor,
		weapons: state.weapons,
		gear: state.gear,
		qualities: state.qualities,
		skills: state.skills,
		equipmentArmor: state.equipmentArmor,
		equipmentGear: state.equipmentGear,
		equipmentWeapons: state.equipmentWeapons,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const Gear = connect(mapStateToProps, matchDispatchToProps)(GearComponent);