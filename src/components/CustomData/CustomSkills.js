import {omit} from 'lodash-es';
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

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
		event.preventDefault();
	};

	handleSubmit = (event) => {
		const {customSkills, changeCustomData} = this.props;
		const {name, type, characteristic, setting} = this.state;
		let obj = clone(customSkills);
		obj[name.replace(/\s/g, '')] = {name, type, characteristic, setting};
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
				<Fragment type='name' value={name} mode={mode} handleChange={this.handleChange}/>
				<Fragment type='type' value={type} array={['General', 'Combat', 'Social', 'Magic', 'Knowledge']}
						  handleChange={this.handleChange}/>
				<Fragment type='characteristic' value={characteristic} array={chars} handleChange={this.handleChange}/>
				<Fragment type='setting' setting={setting} setState={(selected) => this.setState({setting: selected})}/>
				<ControlButtonSet
					mode={this.state.mode}
					type={'Skill'}
					handleSubmit={this.handleSubmit}
					onEditSubmit={this.handleSubmit}
					onEditCancel={this.initState}
					disabled={name === '' || type === '' || characteristic === ''}/>

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

function mapStateToProps(state) {
	return {
		customSkills: state.customSkills,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({changeCustomData}, dispatch);
}

export const CustomSkills = connect(mapStateToProps, matchDispatchToProps)(CustomSkillsComponent);
