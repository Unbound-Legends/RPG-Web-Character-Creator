import {camelCase, omit, upperFirst} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {changeCustomData, changeData} from '../../actions';
import {Fragment} from './';

class CustomCareersComponent extends React.Component {
	state = {name: '', selectedSkills: [], description: '', setting: [], mode: 'add'};

	initState = () => {
		this.setState({name: '', selectedSkills: [], description: '', setting: [], mode: 'add'});
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleSelect = (event) => {
		this.setState({selectedSkills: [...this.state.selectedSkills, event.target.value]});
		event.preventDefault();
	};

	handleSubmit = (event) => {
		const {customCareers, changeCustomData} = this.props;
		const {name, selectedSkills, description, setting} = this.state;
		let obj = {...customCareers};
		obj[upperFirst(camelCase((name)))] = {name, skills: selectedSkills, description, setting};
		changeCustomData(obj, 'customCareers');
		this.initState();
		event.preventDefault();
	};

	handleDelete = (event) => {
		const {customCareers, changeCustomData, career, changeData} = this.props;
		if (career === event.target.name) changeData('', 'career');
		changeCustomData(omit(customCareers, event.target.name), 'customCareers', false);
		event.preventDefault();
	};

	handleEdit = (event) => {
		const {customCareers} = this.props;
		const career = customCareers[event.target.name];
		this.setState({
			name: career.name,
			selectedSkills: career.skills,
			description: career.description,
			setting: typeof career.setting === 'string' ? career.setting.split(', ') : career.setting,
			mode: 'edit'
		});
	};

	render() {
		const {skills, customCareers} = this.props;
		const {name, selectedSkills, description, setting, mode} = this.state;
		return (
			<div>
				<Fragment type='name' value={name} mode={mode}
						  handleChange={(event) => this.setState({name: event.target.value})}/>

				<Fragment type='setting' setting={setting} setState={(selected) => this.setState({setting: selected})}/>

				<Fragment name='selectedSkills' type='inputSelect'
						  array={Object.keys(skills).filter(skill => !selectedSkills.includes(skill)).sort()}
						  nameObj={skills} handleChange={this.handleSelect}/>

				<Fragment type='list' array={selectedSkills} nameObj={skills}
						  handleClear={() => this.setState({selectedSkills: []})}/>

				<Fragment type='description' value={description}
						  handleChange={(event) => this.setState({description: event.target.value})}/>

				<ControlButtonSet mode={this.state.mode} type={'Career'} handleSubmit={this.handleSubmit} onEditSubmit={this.handleSubmit}
								  onEditCancel={this.initState} disabled={name === '' || 0 >= selectedSkills.length}/>

				<Table>
					<thead>
					<tr>
						<th>NAME</th>
						<th>SKILLS</th>
						<th/>
						<th/>
					</tr>
					</thead>
					<tbody>
					{Object.keys(customCareers).map((key) =>
						<tr key={key} style={{textAlign: 'left'}}>
							<td>{customCareers[key].name}</td>
							<td>{customCareers[key].skills.map((skill) => skills[skill] ? skills[skill].name : skill).join(', ')}</td>
							<td><Button name={key} onClick={this.handleEdit}>Edit</Button></td>
							<td><DeleteButton name={key} onClick={this.handleDelete}/></td>
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
		customCareers: state.customCareers,
		skills: state.skills,
		career: state.career,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeCustomData, changeData}, dispatch);

export const CustomCareers = connect(mapStateToProps, matchDispatchToProps)(CustomCareersComponent);
