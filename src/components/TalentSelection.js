import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {talentCount} from '../selectors';
import {Description, TalentDedication} from './index';

const clone = require('clone');

const modifiableAttributes = {
	woundThreshold: 'Wound Threshold',
	strainThreshold: 'Stain Threshold',
	Soak: 'Soak',
	meleeDefense: 'Melee Defense',
	rangedDefense: 'Ranged Defense',
	defense: 'Defense'
};

class TalentSelectionComponent extends React.Component {
	state = {
		talentSelection: this.props.talentKey,
		selection: this.props.talentModifiers.Dedication[this.props.row] ? this.props.talentModifiers.Dedication[this.props.row] : '',
	};

	makeOptions = () => {
		const {tier, talentCount, talentKey, talents} = this.props;
		let options = [];
		Object.keys(talents).forEach((key) => {
			//check for antirequisite
			if (!talents[key].antirequisite) {
				//prerequisite check
				if (talents[key].prerequisite) {
					if (+tier === +talents[key].tier && talentCount[talents[key].prerequisite]) options.push(key);
				}
				//talent from this tier and has not been selected already
				else if (+tier === +talents[key].tier && !talentCount[key]) options.push(key);
				//talent is ranked and has been selected enough for this tier
				else if (talents[key].ranked && ((+talents[key].tier + talentCount[key]) === tier)) options.push(key);
			} else {
				if (+tier === talents[key].tier && !talentCount[talents[key].antirequisite] && !talentCount[key]) options.push(key);
			}
			if (key === talentKey) options.push(key);

		});

		if (tier === 5 && !options.includes('Dedication')) options.push('Dedication');
		options.sort();
		return options;
	};

	handleSubmit = () => {
		const {row, tier, masterTalents, talentModifiers, changeData, handleClose} = this.props;
		const {talentSelection, selection} = this.state;
		let obj = clone(masterTalents);
		obj[row][tier] = talentSelection;
		//if the new talents isn't blank make a new empty block
		if (talentSelection !== '') {
			//select tier 1 talent, add the next tier 1 row
			if (tier === 1 && !obj[row + 1]) obj[row + 1] = {1: ''};
			//if the row allows, add the next tier
			if (row > tier && 5 > tier) {
				if (masterTalents[row - 1][tier + 1] !== '' && !obj[row][tier + 1]) obj[row][tier + 1] = '';
			}
			//add the same tier in the next row if it wasn't allowed in a previous select
			if (masterTalents[row + 1]) {
				if (!masterTalents[row + 1][tier]) {
					if (masterTalents[row + 1][tier - 1] && masterTalents[row + 1][tier - 1] !== '') obj[row + 1][tier] = '';
				}
			}
		}

		changeData(obj, 'masterTalents');
		//add dedication info to talentModifiers
		if (selection !== '') {
			let obj2 = clone(talentModifiers);
			obj2.Dedication[row] = selection;
			changeData(obj2, 'talentModifiers');
		}
		handleClose();
	};

	handleChange = (event) => {
		this.setState({talentSelection: event.target.value});
		event.preventDefault();
	};

	handleDedicationChange = (name) => {
		this.setState({selection: name})
	};

	render() {
		const {talents, talentKey, row, handleClose, modal, skills} = this.props;
		const {talentSelection, selection} = this.state;
		const talent = talents[talentSelection];
		return (
			<Modal isOpen={modal} toggle={handleClose}>
				<ModalHeader toggle={handleClose}>Select a Talent</ModalHeader>
				<ModalBody className='m-4'>
					<Row>
						<Input type='select' defaultValue={talentKey} onChange={this.handleChange}>
							<option value=''/>
							{this.makeOptions().sort().map((key) =>
								<option value={key} key={key}>{talents[key].name}</option>
							)}
						</Input>
					</Row>
					{talent &&
					<div>
						<Row>
							<Col sm='4'><b>Name:</b></Col>
							<Col>{talent.name}</Col>
						</Row>
						<Row>
							<Col sm='4'><b>Tier:</b></Col>
							<Col>{talent.tier}</Col>
						</Row>
						<Row>
							<Col sm='4'><b>Activation:</b></Col>
							<Col>{talent.activation ? 'Active' : 'Passive'}</Col>
						</Row>
						{talent.turn && <Row><Col sm='4'/><Col>{talent.turn}</Col></Row>}
						{talent.ranked ? <Row><Col sm='6'><b>Ranked</b></Col></Row> :
							<Row><Col sm='6'><b>Not Ranked</b></Col></Row>}
						{talent.setting &&
						<Row>
							<Col sm='4'><b>Setting:</b></Col>
							<Col>{talent.setting}</Col>
						</Row>}
						{talent.book &&
						<Row className='my-2'>
							<Col sm='4'> <b>Book:</b></Col>
							<Col><Description text={`${talent.book}: ${talent.page}`}/></Col>
						</Row>
						}
						{talent.prerequisite &&
						<Row className='my-2'>
							<Col sm='4'> <b>Prerequisite Talent:</b></Col>
							<Col className='m-auto'>{talent.prerequisite}</Col>
						</Row>
						}
						{talent.antirequisite &&
						<Row className='my-2'>
							<Col sm='4'> <b>Antirequisite Talent:</b></Col>
							<Col className='m-auto'>{talent.antirequisite}</Col>
						</Row>
						}
						{talent.modifier &&
						<Row className='my-2'>
							<Col sm='4'> <b>Modifier:</b></Col>
							{Object.keys(talent.modifier)[0] === 'careerSkills' &&
							<Col>Adds {talent.modifier.careerSkills.map(skill => skills[skill] ? skills[skill].name : skill).sort().join(', ')} as
								Career Skill(s)</Col>
							}
							{Object.keys(skills).includes(Object.keys(talent.modifier)[0]) &&
							<Col><Description
								text={`Adds ${Object.values(talent.modifier)[0]}  to ${skills[Object.keys(talent.modifier)[0]].name} checks.`}/></Col>
							}
							{Object.keys(modifiableAttributes).includes(Object.keys(talent.modifier)[0]) &&
							<Col>Adds {Object.values(talent.modifier)[0]} to {modifiableAttributes[Object.keys(talent.modifier)[0]]}</Col>
							}
						</Row>
						}
						{talent.description &&
						<Row>
							<Col sm='4'><b>Description:</b></Col>
							<Col><Description text={talent.description ? talent.description : ''}/></Col>
						</Row>
						}
						{talentSelection === 'Dedication' && <TalentDedication row={row} selection={selection}
																			   handleDedicationChange={this.handleDedicationChange}/>}
					</div>
					}
				</ModalBody>

				<ModalFooter>
					<Button disabled={talentSelection === 'Dedication' && selection === ''}
							onClick={this.handleSubmit}>Enter</Button>
					<Button onClick={handleClose}>Cancel</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

const mapStateToProps = state => {
	return {
		masterTalents: state.masterTalents,
		talentCount: talentCount(state),
		talents: state.talents,
		talentModifiers: state.talentModifiers,
		skills: state.skills,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const TalentSelection = connect(mapStateToProps, matchDispatchToProps)(TalentSelectionComponent);
