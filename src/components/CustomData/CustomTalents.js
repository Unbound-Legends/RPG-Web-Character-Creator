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

class CustomTalentsComponent extends React.Component {
	state = {
		name: '',
		tier: '',
		activation: '',
		turn: '',
		ranked: '',
		description: '',
		setting: [],
		modifier: false,
		modifierValue: '',
		prerequisite: '',
		antirequisite: '',
		mode: 'add'
	};

	initState = () => {
		this.setState({
			name: '',
			tier: '',
			activation: '',
			turn: '',
			ranked: '',
			description: '',
			setting: [],
			modifier: false,
			modifierValue: '',
			prerequisite: '',
			antirequisite: '',
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
		const {customTalents, changeCustomData} = this.props;
		let Obj = clone(customTalents);
		let key = upperFirst(camelCase((name)));
		Obj[key] = {};
		['name', 'tier', 'activation', 'turn', 'ranked', 'description', 'setting', 'prerequisite', 'antirequisite'].forEach(stat => {
			if (this.state[stat] !== '') Obj[key][stat] = this.state[stat];
		});
		if (modifier) Obj[key].modifier = {[modifier]: modifierValue};
		changeCustomData(Obj, 'customTalents', false);
		this.initState();
	};

	handleDelete = (event) => {
		const {customTalents, changeCustomData} = this.props;
		changeCustomData(omit(customTalents, event.target.name), 'customTalents', false);
		event.preventDefault();
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleEdit = (event) => {
		const {customTalents} = this.props;
		const talent = customTalents[event.target.name];
		this.setState({
			name: talent.name ? talent.name : '',
			tier: talent.tier ? talent.tier : '',
			activation: talent.activation ? talent.activation : '',
			turn: talent.turn ? talent.turn : '',
			ranked: talent.ranked ? talent.ranked : '',
			description: talent.description ? talent.description : '',
			setting: typeof talent.setting === 'string' ? talent.setting.split(', ') : talent.setting,
			prerequisite: talent.prerequisite ? talent.prerequisite : '',
			antirequisite: talent.antirequisite ? talent.antirequisite : '',
			modifier: talent.modifier ? Object.keys(talent.modifier)[0] : false,
			modifierValue: talent.modifier ? Object.values(talent.modifier)[0] : '',
			mode: 'edit'
		});
	};

	render() {
		const {customTalents, skills, talents} = this.props;
		const {name, tier, ranked, activation, turn, description, setting, modifier, modifierValue, prerequisite, antirequisite, mode} = this.state;
		return <div>
			<Fragment type='name' value={name} mode={mode}
					  handleChange={(event) => this.setState({name: event.target.value})}/>

			<Fragment type='setting' setting={setting} setState={(selected) => this.setState({setting: selected})}/>

			<Fragment type='inputSelect' title='tier' array={[1, 2, 3, 4, 5]}
					  value={tier} handleChange={(event) => this.setState({tier: +event.target.value})}/>

			<Fragment type='inputSelect' title='activation'
					  array={[true, false]} nameObj={{true: {name: 'Active'}, false: {name: 'Passive'}}} value={activation}
					  handleChange={(event) => this.setState({activation: JSON.parse(event.target.value)})}/>


			{activation && <Fragment type='text' title='turn' value={turn} handleChange={(event) => this.setState({turn: event.target.value})}/>}

			<Fragment type='inputSelect' title='ranked' array={[true, false]} nameObj={{true: {name: 'Yes'}, false: {name: 'No'}}} value={ranked}
					  handleChange={(event) => this.setState({ranked: JSON.parse(event.target.value)})}/>

			<Fragment type='description' value={description} handleChange={(event) => this.setState({description: event.target.value})}/>

			<Fragment type='inputSelect' title='prerequisite' value={prerequisite} array={Object.keys(talents)}
					  nameObj={talents} blankText={'None'} handleChange={(event) => this.setState({prerequisite: event.target.value})}/>

			<Fragment type='inputSelect' title='antirequisite' value={antirequisite} array={Object.keys(talents)}
					  nameObj={talents} blankText={'None'} handleChange={(event) => this.setState({antirequisite: event.target.value})}/>

			<Fragment type='inputSelect' title='modifier' array={[true, false]} nameObj={{true: {name: 'Yes'}, false: {name: 'No'}}}
					  value={Boolean(modifier)}
					  blankOption={false} handleChange={(event) => this.setState({modifier: JSON.parse(event.target.value), modifierValue: ''})}/>

			{modifier && <Fragment type='inputSelect' title='Attribute' value={modifier}
								   array={(modifiableAttributes.concat(Object.keys(skills))).sort()}
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

			{Object.keys(skills).includes(modifier) &&
			<Fragment type='inputSelect' title='modifierValue' value='' nameObj={diceNames}
					  array={['[blue]', '[black]', '[rmblack]', '[success]', '[advantage]', '[failure]', '[threat]']}
					  handleChange={this.handleList}/>}

			{Array.isArray(modifierValue) &&
			<Fragment type='list' title='modifierList' array={modifierValue} nameObj={{...skills, diceNames}}
					  handleClear={() => this.setState({modifierValue: []})}/>}
			<hr/>
			<ControlButtonSet mode={this.state.mode} type={'Talent'} handleSubmit={this.handleSubmit} onEditSubmit={this.handleSubmit}
							  onEditCancel={this.initState} disabled={name === '' || tier === '' || ranked === '' || activation === ''}/>

			<Table>
				<thead>
				<tr>
					<th>NAME</th>
					<th>TIER</th>
					<th/>
					<th/>
				</tr>
				</thead>
				<tbody>
				{customTalents &&
				Object.keys(customTalents).map(key =>
					<tr key={key}>
						<td>{customTalents[key].name}</td>
						<td>{customTalents[key].tier}</td>
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
		customTalents: state.customTalents,
		talents: state.talents,
		skills: state.skills,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeCustomData}, dispatch);

export const CustomTalents = connect(mapStateToProps, matchDispatchToProps)(CustomTalentsComponent);
