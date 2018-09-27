import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {SkillBlock} from './index';

class Component extends React.Component {

	render() {
		return (
			<div>
				<Row className='justify-content-end'><h5>SKILLS</h5></Row>
				<hr/>
				<Row>
					<Col>
						{['General', 'Magic'].map((type, index) =>
							<SkillBlock key={type}
										type={type}
										index={index}/>
						)}
					</Col>
					<Col>
						{['Combat', 'Social', 'Knowledge'].map((type, index) =>
							<SkillBlock key={type}
										type={type}
										index={index}/>
						)}
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		customSkills: state.customSkills,
	};
};

export const Skill = connect(mapStateToProps)(Component);