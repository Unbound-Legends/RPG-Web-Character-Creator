import {uniq} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {addDataSet, modifyDataSet, removeDataSet} from '../../actions';
import {Fragment} from './';

const type = 'customCareers';

class CustomCareersComponent extends React.Component {
	state = {};

	componentWillMount = () => this.initState();

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

	handleSubmit = () => {
		const {selectedSkills, mode, ...rest} = this.state;
		const data = {...rest, skills: selectedSkills};
		if (mode === 'add') this.props.addDataSet(type, data);
		else if (mode === 'edit') this.props.modifyDataSet(type, data);
		this.initState();
	};

	handleDuplicate = (event) => {
		const {customCareers} = this.props;
		// noinspection JSUnusedLocalSymbols
		const {id, ...data} = {...customCareers[event.target.name]};
		this.props.addDataSet(type, {...data, name: `${data.name} (copy)`});
		event.preventDefault();
	};

	handleDelete = (event) => {
		this.props.removeDataSet(type, this.props[type][event.target.name].id);
		event.preventDefault();
	};

	handleEdit = (event) => {
		const {customCareers} = this.props;
		const career = customCareers[event.target.name];
		this.setState({
			...career,
			selectedSkills: career.skills ? uniq(career.skills) : [],
			setting: typeof career.setting === 'string' ? career.setting.split(', ') : career.setting,
			mode: 'edit'
		});
	};

	render() {
		const {skills, customCareers} = this.props;
		const {name, selectedSkills, description, setting, mode} = this.state;
		return (
			<div>
				<Fragment type='text' title='name' value={name} mode={mode}
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
					</tr>
					</thead>
					<tbody>
					{Object.keys(customCareers)
						.sort((a, b) => customCareers[a].name > customCareers[b].name ? 1 : -1)
						.map(key =>
						<tr key={key} style={{textAlign: 'left'}}>
							<td>{customCareers[key].name}</td>
							<td>{customCareers[key].skills && customCareers[key].skills.map((skill) => skills[skill] ? skills[skill].name : skill).join(', ')}</td>
							<td>
								<ButtonGroup>
									<Button name={key} onClick={this.handleEdit}>Edit</Button>
									<Button name={key} onClick={this.handleDuplicate}>Duplicate</Button>
									<DeleteButton name={key} onClick={this.handleDelete}/>
								</ButtonGroup>
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
		customCareers: state.customCareers,
		skills: state.skills,
		career: state.career,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({addDataSet, modifyDataSet, removeDataSet}, dispatch);

export const CustomCareers = connect(mapStateToProps, matchDispatchToProps)(CustomCareersComponent);
