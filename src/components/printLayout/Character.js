import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';

class Component extends React.Component {

	render() {
		const {archetype, archetypes, careers, career, characterList, character, description, setting} = this.props;
		return (
			<Row>
				<Col sm='6'>
					<Row className='justify-content-end align-items-center'><h5>CHARACTER</h5></Row>
					<hr/>
					<Row className='align-items-center'>
						<Col sm='4'>
							<b>CHARACTER NAME:</b>
						</Col>
						<Col>{characterList[character]}</Col>
					</Row>
					<hr/>
					<Row className='align-items-center'>
						<Col sm='4'>
							<b>ARCHETYPE:</b>
						</Col>
						<Col>
							{archetype === null ? '' : archetypes[archetype] ? archetypes[archetype].name : 'Missing Archetype Data'}
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
					</Row>
					<hr/>
					<Row className='align-items-center'>
						<Col sm='4'>
							<b>SETTING:</b>
						</Col>
						<Col>
							{setting.join(', ')}
						</Col>
					</Row>
					<hr/>
					<Row className='align-items-center'>
						<Col sm='4'>
							<b>PLAYER NAME:</b>
						</Col>
						<Col>
							{description.playerName}
						</Col>
					</Row>
				</Col>
				<Col className='text-center'>
					<img className='img-fluid text-center w-60' src={'images/favicon.png'} alt=''/>
				</Col>
			</Row>

		);
	}
}

const mapStateToProps = state => {
	return {
		archetype: state.archetype,
		archetypes: state.archetypes,
		career: state.career,
		careers: state.careers,
		description: state.description,
		user: state.user,
		characterList: state.characterList,
		character: state.character,
		setting: state.setting,
	};
};

export const Character = connect(mapStateToProps)(Component);