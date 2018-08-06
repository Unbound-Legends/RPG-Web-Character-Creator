import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Typeahead} from 'react-bootstrap-typeahead';
import {Button, Col, Input, Row, Table} from 'reactstrap';
import {changeCustomData, changeData} from '../../actions';
import {ControlButtonSet, DeleteButton} from '../';
import {omit} from 'lodash-es';

class CustomCareersComponent extends React.Component {
	state = {name: '', selectedSkills: [], description: '', setting: [], mode: 'add'};

	initState = () => {
		this.setState({name: '', selectedSkills: [], description: '', setting: [], mode: 'add'});
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
		event.preventDefault();
	};

	handleSelect = (event) => {
		let newArr = [...this.state.selectedSkills];
		newArr.push(event.target.value);
		newArr.sort();
		this.setState({selectedSkills: newArr});
		event.preventDefault();
	};

	handleSubmit = (event) => {
		const {customCareers, changeCustomData} = this.props;
		const {name, selectedSkills, description, setting} = this.state;
		let obj = {...customCareers};
		obj[name.replace(/\s/g, '')] = {name, skills: selectedSkills, description, setting};
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

	createOptions = () => {
		const {skills} = this.props;
		const {selectedSkills} = this.state;
		return Object.keys(skills).filter(skill => !selectedSkills.includes(skill)).sort();
	};

	render() {
		const {skills, customCareers, settings} = this.props;
		const {name, selectedSkills, description, setting} = this.state;
		return (
			<div>
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'><b>Name:</b></Col>
					<Col>
						<Input type='text' value={name} name='name' maxLength='25' onChange={this.handleChange}
							   disabled={this.state.mode === 'edit'}/>
					</Col>
				</Row>
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'><b>Setting:</b></Col>
					<Col>
						<Typeahead
							multiple={true}
							options={Object.values(settings)}
							name='setting'
							selected={setting}
							placeholder='Choose a Setting...'
							clearButton={true}
							onChange={(selected) => this.setState({setting: selected.includes('All') ? ['All'] : selected})}/>
					</Col>
				</Row>
				<Row className='mt-2'>
					<Col xs='4' className='my-auto'><b>Career Skills:</b></Col>
					<Col>
						<Input type='select' value='' name='selectedSkills' onChange={this.handleSelect}>
							<option value=''/>
							{this.createOptions().map((key) =>
								<option value={key} key={key}>{skills[key].name}</option>
							)}
						</Input>
					</Col>
				</Row>
				<Row className='mt-2 mx-2'>
					<span className='my-auto'>{selectedSkills.length} skills&emsp;</span>
					<Button onClick={() => this.setState({selectedSkills: []})}>Clear</Button>
				</Row>
				<Row className='mt-2'>
					{selectedSkills.map((skill) => skills[skill] ? skills[skill].name : skill).join(', ')}
				</Row>
				<Row className='mt-2'>
					<Col xs='4'><b>Description:</b></Col>
					<Col>
                            <textarea onChange={this.handleChange}
									  name='description'
									  rows='8'
									  maxLength='200'
									  className='w-100'
									  value={description}/>
					</Col>
				</Row>
				<Row className='my-4 justify-content-end'>
					<ControlButtonSet
						mode={this.state.mode}
						type={'Career'}
						handleSubmit={this.handleSubmit}
						onEditSubmit={this.handleSubmit}
						onEditCancel={this.initState}
						disabled={name === '' || 0 >= selectedSkills.length}/>
				</Row>
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

function mapStateToProps(state) {
	return {
		customCareers: state.customCareers,
		skills: state.skills,
		career: state.career,
		settings: state.settings,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({changeCustomData, changeData}, dispatch);
}

export const CustomCareers = connect(mapStateToProps, matchDispatchToProps)(CustomCareersComponent);
