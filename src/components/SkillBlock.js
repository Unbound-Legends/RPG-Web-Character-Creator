import React from 'react';
import {connect} from 'react-redux';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {SkillRow} from './index';

class SkillBlockComponent extends React.Component {

	state = {modal: false};

	handleChange = (event) => {
		const {masterSkills, changeData} = this.props;
		let newObj = {...masterSkills};
		if (!newObj[event.target.name]) newObj[event.target.name] = {};
		newObj[event.target.name].hide = !newObj[event.target.name].hide;
		changeData(newObj, 'masterSkills');
	};

	render() {
		const {type, skills, masterSkills} = this.props;
		const {modal} = this.state;
		return (
			<div>
				<Row>
					<b>{type.toUpperCase()}</b>
					<Button color='link' className='noUnderLine p-0'
							onClick={() => this.setState({modal: true})}>⚙</Button>
				</Row>
				<Table className='mx-auto bg-light'>
					<thead>
					<tr>
						<th className='table-name'>Skill</th>
						<th className='table-career'>Career</th>
						<th className='table-rank'>Rank</th>
						<th className='table-dice'>Dice Pool</th>
					</tr>
					</thead>
					<tbody>
					{Object.keys(skills).sort().map(skillKey =>
						skills[skillKey].type === type &&
						<SkillRow skillKey={skillKey} key={skillKey}/>
					)}
					</tbody>
				</Table>
				<Modal isOpen={modal} toggle={() => this.setState({modal: false})}>
					<ModalHeader toggle={() => this.setState({modal: false})}>{`${type} Skills`}</ModalHeader>
					<ModalBody className=''>
						<Table>
							<thead>
							<tr>
								<th>Show/Hide</th>
								<th>Skill</th>
							</tr>
							</thead>
							<tbody>
							{Object.keys(skills).sort().map((key) =>
								skills[key].type === type && (
									<tr key={key}>
										<td>
											<input type='checkbox'
												   name={key}
												   checked={masterSkills[key] ? (!masterSkills[key].hide) : true}
												   onChange={this.handleChange}/>
										</td>
										<td>
											{skills[key].name}
										</td>
									</tr>
								),
							)}
							</tbody>
						</Table>
					</ModalBody>
					<ModalFooter>
						<Button onClick={() => this.setState({modal: false})}>Close</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		skills: state.skills,
		masterSkills: state.masterSkills,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const SkillBlock = connect(mapStateToProps, matchDispatchToProps)(SkillBlockComponent);
