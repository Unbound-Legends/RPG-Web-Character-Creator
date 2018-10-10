import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {maxCareerSkills} from '../selectors';
import {Description} from './index';

class CareerComponent extends React.Component {

	handleChange = (event) => {
		let value = event.target.value === '' ? null : event.target.value;
		this.props.changeData(value, 'career');
		this.props.changeData([], 'careerSkillsRank');
		event.preventDefault();
	};

	handleCheck = (event) => {
		let arr = [...this.props.careerSkillsRank];
		if (arr.includes(event.target.name)) {
			arr.forEach((skill, index) => {
				if (arr[index] === event.target.name) arr.splice(index, 1);
			})
		} else arr.push(event.target.name);
		if (this.props.maxCareerSkills >= arr.length) this.props.changeData(arr, 'careerSkillsRank');
		else event.preventDefault();
	};

	render() {
		const {career, careers, skills, careerSkillsRank, modal, handleClose, theme} = this.props;
		const masterCareer = careers[career];
		return (

			<Modal className={`body-${theme}`} isOpen={modal} toggle={handleClose}>
				<ModalHeader toggle={handleClose}>Select Career</ModalHeader>
				<ModalBody>
					<Input type='select' defaultValue={masterCareer && masterCareer.name} onChange={this.handleChange}>
						<option value=''/>
						{Object.keys(careers).sort().map((key) =>
							<option value={key} key={key}>{careers[key].name}</option>
						)}
					</Input>
					<hr/>

					{masterCareer &&
					<div className='mt-2 px-2'>
						<Row><h3>Career Skills:</h3></Row>
						<div className='px-3'>
							<Row>Select {this.props.maxCareerSkills} skills to start with 1 free rank</Row>
							{masterCareer.skills.sort().map(skill =>
								<Row key={skill} className='ml-3 align-items-center'>
									<Label className='my-1'>
										<Input type='checkbox' name={skill}
											   className='my-2'
											   checked={careerSkillsRank.includes(skill)}
											   onChange={this.handleCheck}/>{skills[skill] ? skills[skill].name : ''}
									</Label>
								</Row>
							)}
						</div>

						<Row>
							<Col xs='4'>
								<b>Setting:</b>
							</Col>
							<Col sm='6'>
								{Array.isArray(masterCareer.setting) ? masterCareer.setting.sort().join(', ') : masterCareer.setting}
							</Col>
						</Row>
						{masterCareer.book &&
						<Row className='my-2'>
							<Col xs='4'>
								<b>Book:</b>
							</Col>
							<Col>
								<Description text={`${masterCareer.book}: ${masterCareer.page}`}/>
							</Col>
						</Row>
						}
						<Row>
							<Col xs='4'>
								<b>Description:</b>
							</Col>
							<Col sm='6'>
								<Description text={masterCareer.description}/>
							</Col>
						</Row>
					</div>
					}
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={handleClose}>Close</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		career: state.career,
		careerSkillsRank: state.careerSkillsRank,
		careers: state.careers,
		skills: state.skills,
		maxCareerSkills: maxCareerSkills(state),
		theme: state.theme,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const Career = connect(mapStateToProps, matchDispatchToProps)(CareerComponent);
