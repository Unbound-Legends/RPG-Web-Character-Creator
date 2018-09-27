import React from 'react';
import {connect} from 'react-redux';
import {Col, Row, Table} from 'reactstrap';
import {equipmentStats, gearDice, skillDice} from '../../selectors';
import {Description} from "../index";

class Component extends React.Component {

	getLabel = (block, key) => {
		const {skills, qualities, gearDice, equipmentStats} = this.props;
		let item = equipmentStats[key];
		if (!item && block !== 'deleteButton') return <td key={key + block}>MissingData</td>;
		switch (block) {
			case 'carried':
			case 'equipped':
				return (
					<td key={key + block}>
						{equipmentStats[key][block] ? '✓' : ''}
					</td>
				);
			case 'name':
			case 'damage':
			case 'critical':
			case 'range':
			case 'encumbrance':
			case 'soak':
			case 'defense':
			case 'rangedDefense':
			case 'meleeDefense':
			case 'quantity':
				return (
					<td key={key + block}>
						{item[block]}
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
			case 'craftsmanship':
				return (
					<td key={key + block}>
						{item[block]}
					</td>
				);
			default:
				return <td key={key}/>;
		}
	};

	render() {
		const {money, equipmentArmor, equipmentGear, equipmentWeapons} = this.props;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'><h5>GEAR</h5></Row>
				<hr/>
				<Row className='my-2'>
					<Col xs='1'><b className='my-auto'>MONEY:</b></Col>
					<Col>{money > 0 ? money : ''}</Col>
				</Row>
				{Object.keys(equipmentWeapons).length > 0 &&
				<Row>
					<h5 style={{textAlign: 'left'}}>Weapons:</h5>
					<Table className='text-center'>
						<thead>
						<tr>
							<th>CARRIED</th>
							<th>CRAFT</th>
							<th>NAME</th>
							<th>DAM</th>
							<th>CRIT</th>
							<th>RANGE</th>
							<th>SKILL</th>
							<th>ENCUM</th>
							<th>QUAL</th>
							<th>DICE</th>
						</tr>
						</thead>
						<tbody>
						{Object.keys(equipmentWeapons).map(key =>
							<tr key={key}>
								{['carried', 'craftsmanship', 'name', 'damage', 'critical', 'range', 'skill', 'encumbrance', 'qualities', 'gearDice'].map(block =>
									this.getLabel(block, key)
								)}
							</tr>
						)}
						</tbody>
					</Table>
				</Row>
				}
				{Object.keys(equipmentArmor).length > 0 &&
				<Row>
					<h5 style={{textAlign: 'left'}}>Armor:</h5>
					<Table className='text-center'>
						<thead>
						<tr>
							<th>EQUIPPED</th>
							<th>CARRIED</th>
							<th>CRAFT</th>
							<th>NAME</th>
							<th>SOAK</th>
							<th>DEF</th>
							<th>RANGED DEF</th>
							<th>MELEE DEF</th>
							<th>ENCUM</th>
							<th>QUAL</th>
						</tr>
						</thead>
						<tbody>
						{Object.keys(equipmentArmor).map(key =>
							<tr key={key}>
								{['equipped', 'carried', 'craftsmanship', 'name', 'soak', 'defense', 'rangedDefense', 'meleeDefense', 'encumbrance', 'qualities'].map(block =>
									this.getLabel(block, key)
								)}
							</tr>
						)}
						</tbody>
					</Table>
				</Row>
				}
				{Object.keys(equipmentGear).length > 0 &&
				<Row>
					<h5 style={{textAlign: 'left'}}>Gear:</h5>
					<Table className='text-center'>
						<thead>
						<tr>
							<th>CARRRIED</th>
							<th>NAME</th>
							<th>AMOUNT</th>
							<th>ENCUM</th>
							<th>QUAL</th>
						</tr>
						</thead>
						<tbody>
						{Object.keys(equipmentGear).map(key =>
							<tr key={key}>
								{['carried', 'name', 'quantity', 'encumbrance', 'qualities'].map(block =>
									this.getLabel(block, key)
								)}
							</tr>
						)}
						</tbody>
					</Table>
				</Row>
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		armor: state.armor,
		gear: state.gear,
		equipmentArmor: state.equipmentArmor,
		equipmentGear: state.equipmentGear,
		equipmentStats: equipmentStats(state),
		equipmentWeapons: state.equipmentWeapons,
		gearDice: gearDice(state),
		qualities: state.qualities,
		skillDice: skillDice(state),
		skills: state.skills,
		weapons: state.weapons,
		money: state.money,
	};
};

export const Equipment = connect(mapStateToProps)(Component);