import {camelCase, omit, upperFirst} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {changeCustomData} from '../../actions';
import {chars} from '../../data/lists'
import {Fragment} from './';

const clone = require('clone');

class CustomSkillsComponent extends React.Component {
	state = {name: '', type: '', characteristic: '', setting: [], mode: 'add'};

	initState = () => {
		this.setState({name: '', type: '', characteristic: '', setting: [], mode: 'add'});
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleSubmit = (event) => {
		const {customSkills, changeCustomData} = this.props;
		const {name, type, characteristic, setting} = this.state;
		let obj = clone(customSkills);
		obj[upperFirst(camelCase((name)))] = {name, type, characteristic, setting};
		changeCustomData(obj, 'customSkills');
		this.initState();
		event.preventDefault();
	};

	handleDelete = (event) => {
		const {customSkills, changeCustomData} = this.props;
		changeCustomData(omit(customSkills, event.target.name), 'customSkills', false);
		event.preventDefault();
	};

	handleEdit = (event) => {
		const {customSkills} = this.props;
		const skill = customSkills[event.target.name];
		this.setState({
			name: skill.name,
			type: skill.type,
			characteristic: skill.characteristic,
			mode: 'edit',
			setting: typeof skill.setting === 'string' ? skill.setting.split(', ') : skill.setting,
		});
	};

	render() {
		const {customSkills} = this.props;
		const {name, type, characteristic, setting, mode} = this.state;
		return (
			<div>
				<Fragment type='name' value={name} mode={mode} handleChange={(event) => this.setState({name: event.target.value})}/>

				<Fragment type='inputSelect' name='type' value={type} array={['General', 'Combat', 'Social', 'Magic', 'Knowledge']}
						  handleChange={(event) => this.setState({type: event.target.value})}/>

				<Fragment type='inputSelect' name='characteristic' value={characteristic} array={chars}
						  handleChange={(event) => this.setState({characteristic: event.target.value})}/>

				<Fragment type='setting' setting={setting} setState={(selected) => this.setState({setting: selected})}/>

				<ControlButtonSet mode={this.state.mode} type={'Skill'} handleSubmit={this.handleSubmit} onEditSubmit={this.handleSubmit}
								  onEditCancel={this.initState} disabled={name === '' || type === '' || characteristic === ''}/>

				<Table>
					<thead>
					<tr>
						<th>NAME</th>
						<th>TYPE</th>
						<th>CHAR</th>
						<th/>
						<th/>
					</tr>
					</thead>
					<tbody>
					{Object.keys(customSkills).map((key) =>
						<tr key={key}>
							<td>
								{customSkills[key].name}
							</td>
							<td>
								{customSkills[key].type}
							</td>
							<td>
								{customSkills[key].characteristic}
							</td>
							<td>
								<Button name={key} onClick={this.handleEdit}>Edit</Button>
							</td>
							<td>
								<DeleteButton name={key} onClick={this.handleDelete}/>
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
		customSkills: state.customSkills,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeCustomData}, dispatch);

export const CustomSkills = connect(mapStateToProps, matchDispatchToProps)(CustomSkillsComponent);
