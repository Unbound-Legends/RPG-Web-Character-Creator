import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import * as images from '../../images';

class Component extends React.Component {

	render() {
		const {archetype, archetypes, careers, career, characterList, character, description, setting} = this.props;
		return (
			<div>
				<Row>
					<Col md='8'>
						<Row className='justify-content-end align-items-center'><h5>CHARACTER</h5></Row>
						<hr/>
						<Row className='align-items-center'>
							<Col>
								<b className='mx-2'>CHARACTER:</b>{characterList[character]}
							</Col>
						</Row>
						<hr/>
						<Row className='align-items-start'>
							<Col>
								<b className='mx-2'>ARCHETYPE:</b>{archetype === null ? '' : archetypes[archetype] ? archetypes[archetype].name : 'Missing Archetype Data'}
							</Col>
							<Col>
								<b className='mx-2'>CAREER:</b>{career === null ? '' : careers[career] ? careers[career].name : 'Missing Career Data'}
							</Col>
						</Row>
						<hr/>
						<Row className='align-items-start'>
							<Col>
								<b className='mx-2'>SETTING:</b>{setting.join(', ')}
							</Col>
							<Col>
								<b className='mx-2'>PLAYER:</b>{description.playerName}
							</Col>
						</Row>
					</Col>
					<Col className='text-right'>
						<img className='img-fluid text-right w-60' src={images.GenesysLogo} alt=''/>
					</Col>
				</Row>
			</div>

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