import clone from 'clone';
import {camelCase, omit, upperFirst} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {changeCustomData} from '../../actions';
import {diceNames, modifiableAttributes} from '../../data/lists'
import {Fragment} from './';

class CustomArchetypeTalentsComponent extends React.Component {
	state = {
		name: '',
		activation: '',
		turn: '',
		description: '',
		setting: [],
		modifier: false,
		modifierValue: '',
		mode: 'add'
	};

	initState = () => {
		this.setState({
			name: '',
			activation: '',
			turn: '',
			description: '',
			setting: [],
			modifier: false,
			modifierValue: '',
			mode: 'add'
		});
	};

	handleList = (event) => {
		const {modifierValue} = this.state;
		let arr = [];
		if (Array.isArray(modifierValue)) arr = [...modifierValue];
		arr.push(event.target.value);
		this.setState({modifierValue: arr});
		event.preventDefault();

	};

	handleSubmit = () => {
		const {name, modifier, modifierValue} = this.state;
		const {customArchetypeTalents, changeCustomData} = this.props;
		let Obj = clone(customArchetypeTalents);
		let key = upperFirst(camelCase((name)));
		Obj[key] = {};
		['name', 'activation', 'turn', 'description', 'setting'].forEach(stat => {
			if (this.state[stat] !== '') Obj[key][stat] = this.state[stat];
		});
		if (modifier) Obj[key].modifier = {[modifier]: modifierValue};
		changeCustomData(Obj, 'customArchetypeTalents', false);
		this.initState();
	};

	handleDelete = (event) => {
		const {customArchetypeTalents, changeCustomData} = this.props;
		changeCustomData(omit(customArchetypeTalents, event.target.name), 'customArchetypeTalents', false);
		event.preventDefault();
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleEdit = (event) => {
		const {customArchetypeTalents} = this.props;
		const talent = customArchetypeTalents[event.target.name];
		this.setState({
			name: talent.name ? talent.name : '',
			activation: talent.activation ? talent.activation : '',
			turn: talent.turn ? talent.turn : '',
			description: talent.description ? talent.description : '',
			setting: typeof talent.setting === 'string' ? talent.setting.split(', ') : talent.setting,
			modifier: talent.modifier ? Object.keys(talent.modifier)[0] : false,
			modifierValue: talent.modifier ? Object.values(talent.modifier)[0] : '',
			mode: 'edit'
		});
	};

	render() {
		const {customArchetypeTalents, skills} = this.props;
		const {name, tier, ranked, activation, turn, description, setting, modifier, modifierValue, mode} = this.state;
		return <div>
			<Fragment type='name' value={name} mode={mode}
					  handleChange={(event) => this.setState({name: event.target.value})}/>

			<Fragment type='setting' setting={setting} setState={(selected) => this.setState({setting: selected})}/>

			<Fragment type='inputSelect' title='activation'
					  array={[true, false]} nameObj={{true: {name: 'Active'}, false: {name: 'Passive'}}} value={activation}
					  handleChange={(event) => this.setState({activation: JSON.parse(event.target.value)})}/>

			{activation && <Fragment type='text' title='turn' value={turn} handleChange={(event) => this.setState({turn: event.target.value})}/>}

			<Fragment type='description' value={description} handleChange={(event) => this.setState({description: event.target.value})}/>

			<Fragment type='inputSelect' title='modifier' array={[true, false]} nameObj={{true: {name: 'Yes'}, false: {name: 'No'}}} value={modifier}
					  blankOption={false} handleChange={(event) => this.setState({modifier: JSON.parse(event.target.value), modifierValue: ''})}/>

			{modifier && <Fragment type='inputSelect' title='Attribute' value={modifier}
								   array={['careerSkills', 'defense', 'meleeDefense', 'strainThreshold', 'soak', 'rangedDefense', 'woundThreshold'].concat(Object.keys(skills))}
								   nameObj={skills}
								   handleChange={(event) => this.setState({
									   modifier: event.target.value,
									   modifierValue: ''
								   })}/>}

			{(modifiableAttributes.includes(modifier) || Object.keys(skills).includes(modifier)) &&
			(modifier === 'careerSkills' ?
				<Fragment type='inputSelect' title='modifierValue' value=''
						  array={Object.keys(skills).filter(skill => !modifierValue.includes(skill))} nameObj={skills}
						  handleChange={this.handleList}/>

				: (modifiableAttributes.includes(modifier) ?

					<Fragment type='number' value={modifierValue} title='modifierValue'
							  handleChange={(event) => this.setState({modifierValue: +event.target.value})}/>

					: <Fragment type='inputSelect' title='modifierValue' value='' nameObj={diceNames}
								array={['[blue]', '[black]', '[rmblack]', '[success]', '[advantage]', '[failure]', '[threat]']}
								handleChange={this.handleList}/>))}

			{Array.isArray(modifierValue) &&
			<Fragment type='list' title='modifierList' array={modifierValue} nameObj={{...skills, diceNames}}
					  handleClear={() => this.setState({modifierValue: []})}/>}
			<hr/>
			<ControlButtonSet mode={this.state.mode} type={'Archetype Talents'} handleSubmit={this.handleSubmit} onEditSubmit={this.handleSubmit}
							  onEditCancel={this.initState} disabled={name === '' || tier === '' || ranked === '' || activation === ''}/>

			<Table>
				<thead>
				<tr>
					<th>NAME</th>
					<th/>
					<th/>
				</tr>
				</thead>
				<tbody>
				{customArchetypeTalents &&
				Object.keys(customArchetypeTalents).map(key =>
					<tr key={key}>
						<td>{customArchetypeTalents[key].name}</td>
						<td><Button name={key} onClick={this.handleEdit}>Edit</Button></td>
						<td><DeleteButton name={key} onClick={this.handleDelete}/></td>
					</tr>
				)
				}
				</tbody>
			</Table>
		</div>
			;
	}
}

const mapStateToProps = state => {
	return {
		customArchetypeTalents: state.customArchetypeTalents,
		archetypeTalents: state.archetypeTalents,
		skills: state.skills,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeCustomData}, dispatch);

export const CustomArchetypeTalents = connect(mapStateToProps, matchDispatchToProps)(CustomArchetypeTalentsComponent);
