import {upperFirst} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Row, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {addDataSet, modifyDataSet, removeDataSet} from '../../actions';
import {chars} from '../../data/lists';
import * as images from '../../images';
import {Fragment} from './';

const attributes = {Wounds: 'woundThreshold', Strain: 'strainThreshold'};
const type = 'customArchetypes';

class CustomArchetypesComponent extends React.Component {
	state = {};

	componentWillMount = () => this.initState();

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
			experience: 100,
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

	handleClick = (event) => {
		let value = +this.state[event.target.name] + +event.target.value;
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

	handleSkillSelect = (event) => {
		const skill = event.target.value;
		let obj = {...this.state.freeSkillRanks};
		obj[skill] ? obj[skill]++ : obj[skill] = 1;
		this.setState({freeSkillRanks: obj});
		event.preventDefault();
	};

	handleDuplicate = (event) => {
		const {customArchetypes} = this.props;
		// noinspection JSUnusedLocalSymbols
		const {id, ...data} = {...customArchetypes[event.target.name]};
		this.props.addDataSet(type, {...data, name: `${data.name} (copy)`});
		event.preventDefault();
	};

	handleSubmit = () => {
		const {freeSkillRanks, archetypeTalents, mode, ...rest} = this.state;
		const data = {
			...rest,
			skills: {...freeSkillRanks},
			talents: [...archetypeTalents],
		};
		if (mode === 'add') this.props.addDataSet(type, data);
		else if (mode === 'edit') this.props.modifyDataSet(type, data);
		this.initState();
	};

	handleEdit = (event) => {
		const {customArchetypes} = this.props;
		const archetype = customArchetypes[event.target.name];
		this.setState({
			freeSkillRanks: archetype.skills ? archetype.skills : {},
			archetypeTalents: archetype.talents ? archetype.talents : [],
			setting: typeof archetype.setting === 'string' ? archetype.setting.split(', ') : archetype.setting,
			...archetype,
			mode: 'edit',
		});
	};

	handleDelete = (event) => {
		this.props.removeDataSet(type, this.props[type][event.target.name].id);
		event.preventDefault();
	};

	render() {
		const {customArchetypes, skills, theme} = this.props;
		const {name, freeSkillRanks, experience, description, archetypeTalents, setting, mode} = this.state;
		return (
			<div>
				<Fragment type='text' title='name' value={name} mode={mode} handleChange={(event) => this.setState({name: event.target.value})}/>

				<Fragment type='number' title='experience' value={experience}
						  handleChange={(event) => this.setState({experience: event.target.value})}/>

				<Fragment type='setting' setting={setting} setState={(selected) => this.setState({setting: selected})}/>

				<Row className='mt-2'>
					<Col sm='2' className='my-auto'><b className='text-left'>Starting Characteristics</b></Col>
					<Col>
						{chars.map(stat =>
							<div key={stat} className='m-2 text-center d-inline-block'>
								<div className='imageBox m-auto'>
									<img src={images[theme][stat]} alt='' className='svg'/>
									<Row className={`characteristicValue characteristicValue-${theme}`}>{this.state[stat]}</Row>
								</div>
								<ButtonGroup>
									<Button name={stat} value={1} onClick={this.handleClick}>↑</Button>
									<Button name={stat} value={-1} onClick={this.handleClick}>↓</Button>
								</ButtonGroup>
							</div>
						)}
					</Col>
				</Row>
				<Row className='mt-2'>
					<Col sm='2' className='my-auto'><b className='text-left'>Starting Attributes</b></Col>
					<Col>
						{['Wounds', 'Strain'].map(type =>
							<div className='m-2 text-center d-inline-block' key={type}>
								<div className='imageBox attribute'>
									<img src={images[theme][`${upperFirst(type)}Threshold`]} alt='' className='svg'/>
									<Row
										className={`attributeValue attributeValue-${theme}-${upperFirst(type)}Threshold`}>{this.state[attributes[type]]}</Row>
								</div>
								<ButtonGroup>
									<Button name={attributes[type]} value={1} onClick={this.handleClick}>↑</Button>
									<Button name={attributes[type]} value={-1} onClick={this.handleClick}>↓</Button>
								</ButtonGroup>
							</div>
						)}
					</Col>
				</Row>

				<Fragment name='freeSkillRanks' type='inputSelect'
						  array={[...Object.keys(skills), ...Object.keys(freeSkillRanks).includes('choice') ? ['any', 'choice'] : ['choice']]}
						  nameObj={skills}
						  handleChange={this.handleSkillSelect}/>

				<Fragment type='list' array={Object.keys(freeSkillRanks)} object={freeSkillRanks} nameObj={skills}
						  handleClear={() => this.setState({freeSkillRanks: {}})}/>

				<Fragment name='archetypeTalents' type='inputSelect'
						  array={Object.keys(this.props.archetypeTalents).filter(key => !archetypeTalents.includes(key)).sort()}
						  nameObj={this.props.archetypeTalents}
						  handleChange={(event) => this.setState({archetypeTalents: [...this.state.archetypeTalents, event.target.value]})}/>

				<Fragment type='list' array={archetypeTalents.sort()} nameObj={this.props.archetypeTalents}
						  handleClear={() => this.setState({archetypeTalents: []})}/>

				<Fragment type='description' value={description}
						  handleChange={(event) => this.setState({description: event.target.value})}/>

				<ControlButtonSet mode={this.state.mode} type={'Archetype'} handleSubmit={this.handleSubmit} onEditSubmit={this.handleSubmit}
								  onEditCancel={this.initState}
								  disabled={name === ''}/>

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
					Object.keys(customArchetypes)
						.sort((a, b) => customArchetypes[a].name > customArchetypes[b].name ? 1 : -1)
						.map(key =>
							<tr key={key}>
								<td>{customArchetypes[key].name}</td>
								<td className='text-right'>
									<ButtonGroup>
										<Button name={key} onClick={this.handleEdit}>Edit</Button>
										<Button name={key} onClick={this.handleDuplicate}>Duplicate</Button>
										<DeleteButton name={key} onClick={this.handleDelete}/>
									</ButtonGroup>
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

const mapStateToProps = state => {
	return {
		customArchetypes: state.customArchetypes,
		archetypes: state.archetypes,
		archetype: state.archetype,
		archetypeTalents: state.archetypeTalents,
		skills: state.skills,
		theme: state.theme,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({removeDataSet, addDataSet, modifyDataSet}, dispatch);

export const CustomArchetypes = connect(mapStateToProps, matchDispatchToProps)(CustomArchetypesComponent);
