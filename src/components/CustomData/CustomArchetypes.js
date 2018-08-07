import {omit} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Row, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {changeCustomData, changeData} from '../../actions';
import {Fragment} from './';

const clone = require('clone');

const chars = ['Brawn', 'Agility', 'Intellect', 'Cunning', 'Willpower', 'Presence'];

class CustomArchetypesComponent extends React.Component {
	state = {
		name: '',
		Brawn: 2,
		Agility: 2,
		Intellect: 2,
		Cunning: 2,
		Willpower: 2,
		Presence: 2,
		woundThreshold: 10,
		strainThreshold: 10,
		XP: 100,
		freeSkillRanks: {},
		description: '',
		setting: [],
		archetypeTalents: [],
		mode: 'add',
	};

	initState = () => {
		this.setState({
			name: '',
			Brawn: 2,
			Agility: 2,
			Intellect: 2,
			Cunning: 2,
			Willpower: 2,
			Presence: 2,
			woundThreshold: 10,
			strainThreshold: 10,
			XP: 100,
			freeSkillRanks: {},
			description: '',
			setting: [],
			archetypeTalents: [],
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

	handleClick = (event) => {
		let value = this.state[event.target.name] + +event.target.value;
		if (chars.includes(event.target.name) && (value > 5)) {
			alert(`Cannot set ${event.target.name} to ${value}`);
			return;
		}
		if (0 >= value) {
			alert(`Cannot set ${event.target.name} to ${value}`);
			return;
		}
		this.setState({[event.target.name]: value})
	};

	handleSelect = (event) => {
		this.setState({archetypeTalents: [...this.state.archetypeTalents, event.target.value]});
		event.preventDefault();
	};

	handleSkillSelect = (event) => {
		const skill = event.target.value;
		const {freeSkillRanks} = this.state;
		let obj = {...freeSkillRanks};
		if (freeSkillRanks[skill]) obj[skill]++;
		else obj[skill] = 1;
		this.setState({freeSkillRanks: obj});
		event.preventDefault();
	};

	handleSubmit = () => {
		const {name, Brawn, Agility, Intellect, Cunning, Willpower, Presence, woundThreshold, strainThreshold, XP, freeSkillRanks, description, archetypeTalents, setting} = this.state;
		const {customArchetypes, changeCustomData} = this.props;
		let obj = clone(customArchetypes);
		obj[name.replace(/\s/g, '')] = {
			name,
			characteristics: {
				Brawn,
				Agility,
				Intellect,
				Cunning,
				Willpower,
				Presence
			},
			woundThreshold,
			strainThreshold,
			experience: XP,
			skills: freeSkillRanks,
			talents: archetypeTalents,
			setting,
			description,
		};
		changeCustomData(obj, 'customArchetypes');
		this.initState();
	};

	handleEdit = (event) => {
		const {customArchetypes} = this.props;
		const archetype = customArchetypes[event.target.name];
		this.setState({
			name: archetype.name,
			Brawn: archetype.characteristics.Brawn,
			Agility: archetype.characteristics.Agility,
			Intellect: archetype.characteristics.Intellect,
			Cunning: archetype.characteristics.Cunning,
			Willpower: archetype.characteristics.Willpower,
			Presence: archetype.characteristics.Presence,
			woundThreshold: archetype.woundThreshold,
			strainThreshold: archetype.strainThreshold,
			XP: archetype.experience,
			freeSkillRanks: archetype.skills,
			description: archetype.description,
			setting: typeof archetype.setting === 'string' ? archetype.setting.split(', ') : archetype.setting,
			archetypeTalents: archetype.talents,
			mode: 'edit',
		});
	};

	handleDelete = (event) => {
		const {customArchetypes, changeCustomData, archetype, changeData} = this.props;
		if (archetype === event.target.name) changeData('', 'archetype');
		changeCustomData(omit(customArchetypes, event.target.name), 'customArchetypes', false);
		event.preventDefault();
	};

	render() {
		const {customArchetypes, skills} = this.props;
		const {name, woundThreshold, strainThreshold, freeSkillRanks, XP, description, archetypeTalents, setting, mode} = this.state;
		return (
			<div>
				<Fragment type='name' value={name} mode={mode} handleChange={this.handleChange}/>

				<Fragment type='XP' value={XP} handleChange={this.handleChange}/>

				<Fragment type='setting' setting={setting} setState={(selected) => this.setState({setting: selected})}/>

				<Row className='mt-2'>
					<Col sm='2' className='my-auto'><b className='text-left'>Starting Characteristics:</b></Col>
				</Row>

				<Row className='justify-content-center'>
					{chars.map((stat) =>
						<div key={stat} className='m-2 text-center'>
							<div className='imageBox m-auto'>
								<img src={'/images/png/Characteristic.png'} alt='' className='png'/>
								<Row className='characteristicValue'>{this.state[stat]}</Row>
								<Row className='characteristicTitle'>{stat}</Row>
							</div>
							<ButtonGroup>
								<Button name={stat} value='+1' onClick={this.handleClick}>↑</Button>
								<Button name={stat} value='-1' onClick={this.handleClick}>↓</Button>
							</ButtonGroup>
						</div>
					)}
				</Row>

				<Row className='mt-2'>
					<Col sm='2' className='my-auto'><b className='text-left'>Starting Attributes:</b></Col>
				</Row>
				<Row className='justify-content-center'>
					<div className='justify-content-center text-center'>
						<div className='imageBox attribute'>
							<img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
							<Row className='attributeTitle'>WOUNDS</Row>
							<Row className='attributeValue'>{woundThreshold}</Row>
						</div>
						<ButtonGroup>
							<Button name='woundThreshold' value='+1' onClick={this.handleClick}>↑</Button>
							<Button name='woundThreshold' value='-1' onClick={this.handleClick}>↓</Button>
						</ButtonGroup>
					</div>
					<div className='justify-content-center text-center'>
						<div className='imageBox attribute'>
							<img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
							<Row className='attributeTitle'>STRAIN</Row>
							<Row className='attributeValue'>{strainThreshold}</Row>
						</div>
						<ButtonGroup>
							<Button name='strainThreshold' value='+1' onClick={this.handleClick}>↑</Button>
							<Button name='strainThreshold' value='-1' onClick={this.handleClick}>↓</Button>
						</ButtonGroup>
					</div>
				</Row>

				<Fragment type='freeSkillRanks' array={Object.keys(skills)} nameObj={skills}
						  handleChange={this.handleSkillSelect}/>

				<Fragment type='list' array={Object.keys(freeSkillRanks)} object={freeSkillRanks} nameObj={skills}
						  handleClear={() => this.setState({freeSkillRanks: {}})}/>

				<Fragment type='archetypeTalents'
						  array={Object.keys(this.props.archetypeTalents).filter(key => !archetypeTalents.includes(key)).sort()}
						  nameObj={this.props.archetypeTalents}
						  handleChange={this.handleSelect}/>

				<Fragment type='list' array={archetypeTalents.sort()} nameObj={this.props.archetypeTalents}
						  handleClear={() => this.setState({archetypeTalents: []})}/>

				<Fragment type='description' value={description} handleChange={this.handleChange}/>

				<ControlButtonSet
					mode={this.state.mode}
					type={'Archetype'}
					handleSubmit={this.handleSubmit}
					onEditSubmit={this.handleSubmit}
					onEditCancel={this.initState}
					disabled={name === '' || Object.keys(freeSkillRanks).length === 0 || XP === ''}/>

				<Table>
					<thead>
					<tr>
						<th>NAME</th>
						<th/>
						<th/>
					</tr>
					</thead>
					<tbody>
					{customArchetypes &&
					Object.keys(customArchetypes).map(slot =>
						<tr key={slot}>
							<td>{customArchetypes[slot].name}</td>
							<td className='text-right'>
								<Button name={slot} onClick={this.handleEdit}>Edit</Button>
							</td>
							<td className='text-right'>
								<DeleteButton name={slot} onClick={this.handleDelete}/>
							</td>
						</tr>
					)
					}
					</tbody>
				</Table>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		customArchetypes: state.customArchetypes,
		archetypes: state.archetypes,
		archetype: state.archetype,
		archetypeTalents: state.archetypeTalents,
		skills: state.skills,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({changeCustomData, changeData}, dispatch);
}

export const CustomArchetypes = connect(mapStateToProps, matchDispatchToProps)(CustomArchetypesComponent);
