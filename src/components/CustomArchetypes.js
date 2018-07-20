import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {omit} from 'lodash-es';
import {Button, ButtonGroup, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap';
import {changeCustomData, changeData} from '../actions';
import {ControlButtonSet, DeleteButton} from './';

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
		selectedSkill: '',
		description: '',
		setting: 'All',
		talents: [],
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
			selectedSkill: '',
			description: '',
			setting: 'All',
			talents: [],
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
		let talents = [...this.state.talents];
		talents.push(event.target.value);
		talents.sort();
		this.setState({talents});
		event.preventDefault();
	};

	handleSubmit = () => {
		const {name, Brawn, Agility, Intellect, Cunning, Willpower, Presence, woundThreshold, strainThreshold, XP, selectedSkill, description, talents, setting} = this.state;
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
			skills: {[selectedSkill]: 1},
			talents,
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
			selectedSkill: Object.keys(archetype.skills)[0],
			description: archetype.description,
			setting: archetype.setting,
			talents: archetype.talents,
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
		const {customArchetypes, modal, handleClose, skills, archetypeTalents} = this.props;
		const {name, woundThreshold, strainThreshold, selectedSkill, XP, description, talents, setting} = this.state;
		return (
			<Modal isOpen={modal} toggle={this.handleClose}>
				<ModalHeader toggle={handleClose}>Custom Archetypes</ModalHeader>
				<ModalBody className='m-3 text-left'>
					<Row className='mt-2'>
						<Col xs='4' className='my-auto'><b>Name:</b></Col>
						<Col>
							<Input className='my-auto' type='text' value={name} name='name' maxLength='25'
								   onChange={this.handleChange} disabled={this.state.mode === 'edit'}/>
						</Col>
					</Row>
					<Row className='mt-2'>
						<Col xs='4' className='my-auto'><b>Starting XP:</b></Col>
						<Col>
							<Input className='w-50 my-auto' type='number' value={XP} name='XP' maxLength='3'
								   onChange={this.handleChange}/>
						</Col>
					</Row>
					<Row className='mt-2'>
						<Col xs='4' className='my-auto'><b>Setting:</b></Col>
						<Col>
							<Input className='my-auto' type='text' value={setting} name='setting' maxLength='25'
								   onChange={this.handleChange}/>
						</Col>
					</Row>
					<Row className='mt-2'>
						<Col xs='4' className='my-auto'><b className='text-left'>Starting Characteristics:</b></Col>
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
						<Col xs='4' className='my-auto'><b className='text-left'>Starting Attributes:</b></Col>
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
					<Row className='mt-2'>
						<Col xs='5' className='my-auto'><b>One free rank in:</b></Col>
						<Col>
							<Input type='select' name='selectedSkill' value={selectedSkill}
								   onChange={this.handleChange}>
								<option value=''/>
								{Object.keys(skills).map(key =>
									<option value={key} key={key}>{skills[key].name}</option>
								)}

							</Input>
						</Col>
					</Row>
					<Row className='mt-2'>
						<Col xs='5' className='my-auto'><b>Archetype Talents:</b></Col>
						<Col>
							<Input type='select' name='talents' value=''
								   onChange={this.handleSelect}>
								<option value=''/>
								{Object.keys(archetypeTalents).map(key =>
									<option value={key} key={key}>{archetypeTalents[key].name}</option>
								)}
							</Input>
						</Col>
					</Row>
					<Row className='mt-2'>
						<Col className='my-auto'>
							{talents.map(key => archetypeTalents[key] ? archetypeTalents[key].name : key).join(', ')}
						</Col>
					</Row>
					<Row className='mt-2'>
						<Col xs='5' className='my-auto'>
							<span className='my-auto'>{talents.length} Talents&emsp;</span>
							<Button onClick={() => this.setState({talents: []})}>Clear</Button>
						</Col>
					</Row>

					<Row className='mt-2'>
						<Col xs='4'><b>Description:</b></Col>
						<Col>
                            <textarea onChange={this.handleChange}
									  name='description'
									  rows='8'
									  maxLength='1000'
									  className='w-100'
									  value={description}/>
						</Col>
					</Row>
					<Row className='my-4 justify-content-end'>
						<ControlButtonSet
							mode={this.state.mode}
							type={'Archetype'}
							handleSubmit={this.handleSubmit}
							onEditSubmit={this.handleSubmit}
							onEditCancel={this.initState}
							disabled={name === '' || selectedSkill === '' || XP === ''}/>
					</Row>
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
				</ModalBody>
				<ModalFooter>
					<Button onClick={handleClose}>Close</Button>
				</ModalFooter>
			</Modal>
		)
			;
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
