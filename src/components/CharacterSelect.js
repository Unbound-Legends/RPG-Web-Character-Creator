import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Input, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {addCharacter, changeCharacter, changeCharacterName, changeData, deleteCharacter, loadData} from '../actions';
import {Archetype, Career, CustomArchetypes, CustomCareers, ModalDeleteConfirm} from './';

class CharacterSelectComponent extends React.Component {
	state = {
		name: this.props.characterList ? this.props.characterList[this.props.character] : '',
		playerName: this.props.description.playerName,
		setting: this.props.setting,
		archetypeModal: false,
		careerModal: false,
		customCareersModal: false,
		customArchetypeModal: false,
		deleteModal: false,
	};

	componentWillReceiveProps(nextProps) {
		this.setState({playerName: nextProps.description.playerName});
		this.setState({setting: nextProps.setting});
		if (this.props.characterList) this.setState({name: this.props.characterList[nextProps.character]});
		if (nextProps.characterList) this.setState({name: nextProps.characterList[nextProps.character]});
	}

	handleSelect = (event) => {
		const {changeCharacter, loadData} = this.props;
		changeCharacter(event.target.value);
		loadData();
		event.preventDefault();
	};

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
		event.preventDefault();
	};

	handleBlur = (event) => {
		const {changeData, description} = this.props;
		let type = event.target.name;
		let newObj = {...description};
		newObj[type] = this.state[type];
		changeData(newObj, 'description');
		event.preventDefault();
	};

	confirmedDelete = (event) => {
		this.props.deleteCharacter();
		this.setState({deleteModal: false});
		event.preventDefault();
	};

	render() {
		const {archetype, archetypes, careers, career, characterList, character, changeData, settings} = this.props;
		const {name, playerName, archetypeModal, careerModal, customCareersModal, customArchetypeModal, deleteModal, setting} = this.state;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'><h5>CHARACTER</h5></Row>
				<hr/>
				<Row className='align-items-center'>
					<Col className='my-2'>
						<Input className='p-0' type='select' value={character} onChange={this.handleSelect}>
							{characterList && Object.keys(characterList).map((key) =>
								<option value={key}
										key={key}>{characterList[key]}</option>
							)}
						</Input>
					</Col>
					<Col md='auto'>
						<ButtonGroup>
							<Button onClick={() => this.props.addCharacter()}>New</Button>
							<Button onClick={() => this.setState({deleteModal: true})} color='danger'>Delete</Button>
						</ButtonGroup>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Col sm='4' className='m-auto'>
						<b>CHARACTER NAME:</b>
					</Col>
					<Col className='m-auto'>
						<Input type='text' value={name ? name : ''} maxLength='50' name='name'
							   onChange={this.handleChange}
							   onBlur={() => this.props.changeCharacterName(name)}/>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Col sm='4' className='m-auto'>
						<b>ARCHETYPE:</b>
					</Col>
					<Col>
						{archetype === null ? '' : archetypes[archetype] ? archetypes[archetype].name : 'Missing Archetype Data'}
					</Col>
					<Col>
						<ButtonGroup>
							<Button name='archetype'
									onClick={() => this.setState({archetypeModal: true})}>Select</Button>
							<Button name='customArchetype'
									onClick={() => this.setState({customArchetypeModal: true})}>Custom</Button>
						</ButtonGroup>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Col sm='4'>
						<b>CAREER:</b>
					</Col>
					<Col>
						{career === null ? '' : careers[career] ? careers[career].name : 'Missing Career Data'}
					</Col>
					<Col>
						<ButtonGroup>
							<Button name='career'
									onClick={() => this.setState({careerModal: true})}>Select</Button>
							<Button name='customCareer'
									onClick={() => this.setState({customCareersModal: true})}>Custom</Button>
						</ButtonGroup>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Col sm='4'>
						<b>SETTING:</b>
					</Col>
					<Col>
						<Typeahead
							multiple
							options={settings}
							name='setting'
							selected={setting}
							placeholder="Choose a Setting..."
							onChange={(selected) => this.setState({setting: selected})}
							onBlur={() => changeData(setting, 'setting', false)}
						/>
					</Col>
				</Row>
				<hr/>
				<Row className='align-items-center'>
					<Col sm='4'>
						<b>PLAYER NAME:</b>
					</Col>
					<Col className='m-auto'>
						<Input type='text' value={playerName} maxLength='25' name='playerName'
							   onChange={this.handleChange}
							   onBlur={this.handleBlur}/>
					</Col>
				</Row>
				<hr/>
				<Archetype modal={archetypeModal} handleClose={() => this.setState({archetypeModal: false})}/>
				<Career modal={careerModal} handleClose={() => this.setState({careerModal: false})}/>
				<CustomCareers modal={customCareersModal}
							   handleClose={() => this.setState({customCareersModal: false})}/>
				<CustomArchetypes modal={customArchetypeModal}
								  handleClose={() => this.setState({customArchetypeModal: false})}/>

				<ModalDeleteConfirm deleteModal={deleteModal}
									confirmedDelete={this.confirmedDelete}
									handleClose={() => this.setState({deleteModal: false})}
									type='Character'/>
			</div>

		);
	}
}

function mapStateToProps(state) {
	return {
		archetype: state.archetype,
		archetypes: state.archetypes,
		career: state.career,
		careers: state.careers,
		character: state.character,
		characterList: state.characterList,
		description: state.description,
		setting: state.setting,
		user: state.user,
		settings: state.settings,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		changeData,
		addCharacter,
		changeCharacter,
		deleteCharacter,
		changeCharacterName,
		loadData
	}, dispatch);
}

export const CharacterSelect = connect(mapStateToProps, matchDispatchToProps)(CharacterSelectComponent);