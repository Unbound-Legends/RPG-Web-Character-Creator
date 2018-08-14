import {camelCase, omit} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Row, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {changeCustomData} from '../../actions';
import {chars, diceNames, modifiableAttributes} from '../../data/lists';
import {Fragment} from './';

const clone = require('clone');

class CustomEquipmentComponent extends React.Component {
	state = {
		name: '',
		damage: '',
		range: '',
		skill: '',
		critical: '',
		encumbrance: '',
		price: '',
		soak: '',
		defense: '',
		setting: [],
		meleeDefense: '',
		rangedDefense: '',
		qualitiesList: '',
		qualityRank: '',
		description: '',
		amount: '',
		specialQualities: '',
		qualityList: {},
		modifier: false,
		modifierValue: '',
		mode: 'add'
	};

	initState = () => {
		this.setState({
			name: '',
			damage: '',
			range: '',
			skill: 'All',
			critical: '',
			encumbrance: '',
			price: '',
			soak: '',
			defense: '',
			setting: [],
			meleeDefense: '',
			rangedDefense: '',
			qualityRank: '',
			description: '',
			specialQualities: '',
			qualityList: {},
			modifier: false,
			modifierValue: '',
			mode: 'add',
		});
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
		event.preventDefault();
	};

	handleAddQuality = () => {
		let obj = clone(this.state.qualityList);
		obj[this.state.specialQualities] = this.state.qualityRank ? +this.state.qualityRank : '';
		this.setState({qualityList: obj, specialQualities: '', qualityRank: ''});

	};

	handleSubmit = (event) => {
		const {type, changeCustomData} = this.props;
		const {name, range, damage, skill, critical, encumbrance, price, soak, defense, meleeDefense, rangedDefense, description, qualityList, setting, modifier, modifierValue} = this.state;
		let obj = clone(this.props[type]);
		let key = camelCase(name);
		if (type === 'customWeapons') obj[key] = {
			name,
			damage,
			range,
			skill,
			critical,
			setting,
			encumbrance,
			price,
			description,
			qualities: qualityList
		};
		if (type === 'customArmor') obj[key] = {
			name,
			soak,
			defense,
			meleeDefense,
			rangedDefense,
			encumbrance,
			price,
			setting,
			description,
			qualities: qualityList
		};
		if (type === 'customGear') obj[key] = {name, encumbrance, price, description, setting, qualities: qualityList};
		if (modifier) obj[key].modifier = {[modifier]: modifierValue};
		changeCustomData(obj, type);
		this.initState();
		event.preventDefault();
	};

	handleDelete = (event) => {
		const {type, changeCustomData} = this.props;
		changeCustomData(omit(this.props[type], event.target.name), type, false);
		event.preventDefault();
	};

	handleEdit = (event) => {
		event.preventDefault();
		let equipment = this.props[event.target.getAttribute('type')][event.target.name];
		this.setState({
			...equipment,
			setting: typeof equipment.setting === 'string' ? equipment.setting.split(', ') : equipment.setting,
			qualityList: equipment.qualities ? equipment.qualities : {},
			specialQualities: '',
			qualityRank: '',
			mode: 'edit',
			modifier: equipment.modifier ? Object.keys(equipment.modifier)[0] : false,
			modifierValue: equipment.modifier ? Object.values(equipment.modifier)[0] : '',
		})
	};

	handleList = (event) => {
		const {modifierValue} = this.state;
		let arr = [];
		if (Array.isArray(modifierValue)) arr = [...modifierValue];
		arr.push(event.target.value);
		this.setState({modifierValue: arr});
		event.preventDefault();
	};

	buildField = (field) => {
		const {type, skills, qualities} = this.props;
		const {modifier, modifierValue, specialQualities, qualityList, qualityRank} = this.state;

		switch (field) {
			case 'name':
				return <Fragment key={field} type='name' value={this.state[field]} mode={this.state.mode}
								 handleChange={(event) => this.setState({name: event.target.value})}/>;
			case 'damage':
				return <Fragment key={field} type='text' value={this.state[field]} title={field}
								 handleChange={(event) => this.setState({[field]: event.target.value})}/>;
			case 'setting':
				return <Fragment key={field} type='setting' setting={this.state.setting}
								 setState={(selected) => this.setState({setting: selected})}/>;
			case 'critical':
			case 'encumbrance':
			case 'price':
			case 'soak':
			case 'defense':
			case 'rangedDefense':
			case 'meleeDefense':
				return <Fragment key={field} type='number' value={this.state[field]} title={field}
								 handleChange={(event) => this.setState({[field]: event.target.value})}/>;
			case 'range':
				return <Fragment key={field} type='inputSelect' name={field} value={this.state[field]}
								 array={['Engaged', 'Short', 'Medium', 'Long', 'Extreme']}
								 handleChange={(event) => this.setState({[field]: event.target.value})}/>;
			case 'skill':
				return <Fragment key={field} type='inputSelect' name={field} value={this.state[field]}
								 array={Object.keys(skills).filter(skill => skills[skill].type === 'Combat')} nameObj={skills}
								 handleChange={(event) => this.setState({[field]: event.target.value})}/>;
			case 'specialQualities':
				return (<div key={field}>
						<Fragment type='inputSelect' title='specialQualities' value={specialQualities}
								  array={Object.keys(qualities).filter(quality => qualities[quality].type.includes(type.toLowerCase().slice(6)))}
								  nameObj={qualities}
								  handleChange={(event) => this.setState({
									  specialQualities: event.target.value,
									  qualityRank: ''
								  })}/>

						{specialQualities &&
						<div>
							{qualities[specialQualities] && qualities[specialQualities].ranked &&
							<Fragment type='number' value={qualityRank} title={'qualityRank'}
									  handleChange={(event) => this.setState({qualityRank: event.target.value})}/>}

							<Row>
								<Col sm='2' className='my-auto'/>
								<Col className='text-left'>
									<Button onClick={this.handleAddQuality}>Add Quality</Button>
								</Col>
							</Row>
						</div>
						}

						{Object.keys(qualityList).length > 0 &&
						<Fragment type='list' title='Qualities List' array={Object.keys(qualityList)} object={qualityList} nameObj={qualities}
								  handleClear={() => this.setState({qualityList: {}})}/>}
					</div>
				);
			case 'description':
				return <Fragment key={field} type='description' value={this.state.description}
								 handleChange={(event) => this.setState({description: event.target.value})}/>;
			case 'modifier':
				return (<div key={field}>
					<Fragment type='inputSelect' title='modifier' array={[true, false]} nameObj={{true: {name: 'Yes'}, false: {name: 'No'}}}
							  value={Boolean(modifier)}
							  blankOption={false}
							  handleChange={(event) => this.setState({modifier: JSON.parse(event.target.value), modifierValue: ''})}/>

					{modifier && <Fragment type='inputSelect' title='Attribute' value={modifier}
										   array={Object.keys(skills).concat(modifiableAttributes).concat(chars).sort()}
										   nameObj={skills}
										   handleChange={(event) => this.setState({
											   modifier: event.target.value,
											   modifierValue: ''
										   })}/>}

					{modifier === 'careerSkills' &&
					<Fragment type='inputSelect' title='modifierValue' value=''
							  array={Object.keys(skills).filter(skill => !modifierValue.includes(skill))} nameObj={skills}
							  handleChange={this.handleList}/>}

					{(modifiableAttributes.includes(modifier) && modifier !== 'careerSkills') &&
					<Fragment type='number' value={modifierValue} title='modifierValue'
							  handleChange={(event) => this.setState({modifierValue: +event.target.value})}/>}

					{chars.includes(modifier) &&
					<Fragment type='inputSelect' title='Reduce Strain' array={[true, false]} nameObj={{true: {name: 'Yes'}, false: {name: 'No'}}}
							  value={modifierValue}
							  blankOption={false}
							  handleChange={(event) => this.setState({modifierValue: JSON.parse(event.target.value)})}/>
					}

					{Object.keys(skills).includes(modifier) &&
					<Fragment type='inputSelect' title='modifierValue' value='' nameObj={diceNames}
							  array={['[blue]', '[black]', '[rmblack]', '[success]', '[advantage]', '[failure]', '[threat]', '1 Free Rank', '2 Free Ranks', '3 Free Ranks', '4 Free Ranks', '5 Free Ranks',]}
							  handleChange={this.handleList}/>}

					{Array.isArray(modifierValue) &&
					<Fragment type='list' title='modifierList' array={modifierValue} nameObj={{...skills, diceNames}}
							  handleClear={() => this.setState({modifierValue: []})}/>}
				</div>);
			default:
				return <div/>;
		}
	};

	render() {
		const {type} = this.props;
		let fields = [];
		if (type === 'customWeapons') fields = ['name', 'damage', 'critical', 'range', 'skill', 'encumbrance', 'price', 'description', 'setting', 'modifier'];
		if (type === 'customArmor') fields = ['name', 'soak', 'defense', 'rangedDefense', 'meleeDefense', 'encumbrance', 'price', 'description', 'setting', 'modifier'];
		if (type === 'customGear') fields = ['name', 'encumbrance', 'price', 'description', 'setting', 'modifier'];

		if (!type) return <div/>;
		return (
			<div>
				{fields.map(field => this.buildField(field))}
				{this.buildField('specialQualities')}
				<ControlButtonSet mode={this.state.mode} type={type.toString().slice(6)} handleSubmit={this.handleSubmit}
								  onEditSubmit={this.handleSubmit} onEditCancel={this.initState}/>
				<Table>
					<thead>
					<tr>
						<th>NAME</th>
						<th/>
						<th/>
					</tr>
					</thead>
					<tbody>
					{type &&
					Object.keys(this.props[type]).map(key =>
						<tr key={key}>
							<td>{this.props[type][key].name}</td>
							<td className='text-right'>
								<Button name={key}
										type={type}
										onClick={this.handleEdit}>Edit</Button>
							</td>
							<td className='text-right'>
								<DeleteButton name={key} onClick={this.handleDelete}/>
							</td>
						</tr>
					)
					}
					</tbody>
				</Table>
			</div>
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
		customWeapons: state.customWeapons,
		customGear: state.customGear,
		customArmor: state.customArmor,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeCustomData}, dispatch);

export const CustomEquipment = connect(mapStateToProps, matchDispatchToProps)(CustomEquipmentComponent);