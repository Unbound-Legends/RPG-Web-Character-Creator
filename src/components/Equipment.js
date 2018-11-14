import clone from 'clone';
import {omit, range} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {Button, Col, Input, Row, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {encumbranceLimit, equipmentStats, gearDice, skillDice, totalDefense, totalEncumbrance, totalSoak,} from '../selectors';
import {DeleteButton, Description, Gear} from './index';

class EquipmentComponent extends React.Component {
	state = {
		money: this.props.money,
		equipModal: false,
	};

	componentWillReceiveProps(nextProps) {
		this.setState({money: nextProps.money});
	}

	handleChangeMoney = (event) => {
		let number = +event.target.value.replace(/\D+/g, '');
		if (!(number > 9999999999)) this.setState({money: number});
		event.preventDefault();
	};

	handleStatus = (type, key, status) => {
		const {changeData, equipmentStats} = this.props;
		let obj = clone(this.props[type]);
		if (status === 'carried' && obj[key].equipped) {
			alert(`${equipmentStats[key].name} is equipped and cannot be dropped!`);
			return;
		}
		if (status === 'equipped' && !obj[key][status]) {
			if (Object.keys(obj).some(key => obj[key].equipped)) {
				alert(`${equipmentStats[key].name} cannot be equipped.  Another piece of armor is already equipped`);
				return;
			}
		}
		obj[key][status] = !obj[key][status];
		changeData(obj, type);
	};

	handleSelect = (event) => {
		const {changeData} = this.props;
		let equipmentType = event.target.getAttribute('equipmenttype'), key = event.target.getAttribute('equipmentkey');
		let obj = clone(this.props[equipmentType]);
		obj[key][event.target.name] = event.target.name === 'quantity' ? +event.target.value : event.target.value;
		changeData(obj, equipmentType);
	};

	handleDelete = (event) => {
		const type = event.target.value;
		const key = event.target.name;
		this.props.changeData(omit(this.props[type], key), type, false);
	};

	buttons = (type) => {
		return <Button onClick={() => this.setState({equipModal: type})}>Add {type.toString().slice(9)}</Button>
	};

	getLabel = (type, block, key) => {
		const {skills, qualities, gearDice, equipmentStats, craftsmanship} = this.props;
		let item = equipmentStats[key];
		if (!item && block !== 'deleteButton') return <td key={key + block}>MissingData</td>;
		switch (block) {
			case 'carried':
			case 'equipped':
				return (
					<td key={key + block}>
						<input type='checkbox'
							   className='text-center'
							   checked={equipmentStats[key][block]}
							   onChange={this.handleStatus.bind(this, type, key, block)}/>
					</td>
				);
			case 'name':
			case 'range':
				return (
					<td key={key + block}>
						{item[block]}
					</td>
				);
			case 'damage':
			case 'critical':
			case 'encumbrance':
			case 'soak':
			case 'defense':
			case 'rangedDefense':
			case 'meleeDefense':
				return (
					<td key={key + block}>
						{item[block] ? item[block] : 0}
					</td>
				);
			case 'skill':
				return (
					<td key={key + block}>
						{item.skill ? (skills[item.skill] ? skills[item.skill].name : '') : ''}
					</td>
				);
			case 'qualities':
				return (
					<td key={key + block}>
						{item[block] && Object.keys(item[block]).map(quality => `${qualities[quality] ? qualities[quality].name : 'Quality not found'} ${item[block][quality]}`).sort().join(', ')}
					</td>
				);
			case 'gearDice':
				return (
					<td key={key + block}>
						<Description text={gearDice.weapons[key]}/>
					</td>
				);
			case 'deleteButton':
				return (
					<td key={key + block}>
						<DeleteButton name={key} value={type} onClick={this.handleDelete}/>
					</td>
				);
			case 'craftsmanship':
				return (
					<td key={key + block} style={{width: '7em'}} className='p-1'>
						<Input bsSize='sm' type='select' name='craftsmanship' value={equipmentStats[key].craftsmanship}
							   equipmenttype={type} equipmentkey={key}
							   onChange={this.handleSelect}>
							<option value=''/>
							{Object.keys(craftsmanship).map(craft =>
								<option value={craft} key={craft}>{craft}</option>
							)}

						</Input>
					</td>
				);
			case 'quantity':
				return (
					<td key={key + block}>
						<Input type='select' value={equipmentStats[key].quantity}
							   equipmenttype={type} equipmentkey={key} name='quantity'
							   onChange={this.handleSelect}>
							{range(1, 10).map(number =>
								<option value={+number} key={number}>{number}</option>
							)}
						</Input>
					</td>
				);
			default:
				return <td key={key}/>;
		}
	};

	render() {
		const {equipmentWeapons, equipmentArmor, equipmentGear, totalEncumbrance, encumbranceLimit, totalSoak, totalDefense, changeData, theme} = this.props;
		const {money, equipModal} = this.state;
		return (
			<div>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>EQUIPMENT</div>
				</Row>
				<hr/>
				<Row className='my-2'>
					<b className='my-auto'>MONEY:&nbsp;</b>
					<Input type='number' value={money > 0 ? money : ''}
						   onBlur={() => changeData(money, 'money')}
						   onChange={this.handleChangeMoney}
						   className='w-25'/>
				</Row>
				<Row className='m-1'>
					<Col>
						Encumbrance: <b
						className={`text-${totalEncumbrance > encumbranceLimit ? 'danger' : 'dark'}`}>{totalEncumbrance}/{encumbranceLimit}</b>
					</Col>
					<Col>
						Soak: <b>{totalSoak}</b>
					</Col>
					<Col>
						Melee: <b>{totalDefense.melee}</b> Ranged: <b>{totalDefense.ranged}</b>
					</Col>
				</Row>
				<Row>
					<Tabs defaultIndex={0} className='d-print-none  overflowX' style={{width: '90vw'}}>
						<TabList>
							<Tab>WEAPONS</Tab>
							<Tab>ARMOR</Tab>
							<Tab>GEAR</Tab>
						</TabList>
						<TabPanel>
							{Object.keys(equipmentWeapons).length > 0 &&
							<Table className='text-center bg-light'>
								<thead>
								<tr>
									<th>NAME</th>
									<th>CARRY</th>
									<th>DAM</th>
									<th>CRIT</th>
									<th>RANGE</th>
									<th>SKILL</th>
									<th>ENCUM</th>
									<th>QUAL</th>
									<th>CRAFT</th>
									<th>DICE</th>
									<th/>
								</tr>
								</thead>
								<tbody>
								{Object.keys(equipmentWeapons).map(key =>
									<tr key={key}>
										{['name', 'carried', 'damage', 'critical', 'range', 'skill', 'encumbrance', 'qualities', 'craftsmanship', 'gearDice', 'deleteButton'].map(block =>
											this.getLabel('equipmentWeapons', block, key)
										)}
									</tr>
								)}
								</tbody>
							</Table>
							}
							{this.buttons('equipmentWeapons')}
						</TabPanel>
						<TabPanel>
							{Object.keys(equipmentArmor).length > 0 &&
							<Table className='text-center'>
								<thead>
								<tr>
									<th>NAME</th>
									<th>EQUIP</th>
									<th>CARRY</th>
									<th>SOAK</th>
									<th>DEFENSE</th>
									<th>RANGED</th>
									<th>MELEE</th>
									<th>ENCUM</th>
									<th>QUAL</th>
									<th>CRAFT</th>

									<th/>
								</tr>
								</thead>
								<tbody>
								{Object.keys(equipmentArmor).map(key =>
									<tr key={key}>
										{['name', 'equipped', 'carried', 'soak', 'defense', 'rangedDefense', 'meleeDefense', 'encumbrance', 'qualities', 'craftsmanship', 'deleteButton'].map(block =>
											this.getLabel('equipmentArmor', block, key)
										)}
									</tr>
								)}
								</tbody>
							</Table>
							}
							{this.buttons('equipmentArmor')}
						</TabPanel>
						<TabPanel>
							{Object.keys(equipmentGear).length > 0 &&
							<Table className='text-center'>
								<thead>
								<tr>
									<th>NAME</th>
									<th>CARRY</th>
									<th>QUANTITY</th>
									<th>ENCUM</th>
									<th>QUAL</th>
									<th/>
								</tr>
								</thead>
								<tbody>
								{Object.keys(equipmentGear).map(key =>
									<tr key={key}>
										{['name', 'carried', 'quantity', 'encumbrance', 'qualities', 'deleteButton'].map(block =>
											this.getLabel('equipmentGear', block, key)
										)}
									</tr>
								)}
								</tbody>
							</Table>
							}
							{this.buttons('equipmentGear')}
						</TabPanel>
					</Tabs>
				</Row>
				<Gear modal={equipModal} type={equipModal}
					  handleClose={() => this.setState({equipModal: false})}/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		armor: state.armor,
		craftsmanship: state.craftsmanship,
		encumbranceLimit: encumbranceLimit(state),
		equipmentArmor: state.equipmentArmor,
		equipmentGear: state.equipmentGear,
		equipmentStats: equipmentStats(state),
		equipmentWeapons: state.equipmentWeapons,
		gear: state.gear,
		gearDice: gearDice(state),
		money: state.money,
		qualities: state.qualities,
		skillDice: skillDice(state),
		skills: state.skills,
		totalDefense: totalDefense(state),
		totalEncumbrance: totalEncumbrance(state),
		totalSoak: totalSoak(state),
		weapons: state.weapons,
		theme: state.theme,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const Equipment = connect(mapStateToProps, matchDispatchToProps)(EquipmentComponent);