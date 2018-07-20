import React from 'react';
import {CustomSkills, SkillBlock} from './index';
import {connect} from "react-redux";
import {Button, Col, Row} from 'reactstrap';

class SkillComponent extends React.Component {
	state = {modal: false};

	render() {
		return (
			<Col xl='12'>
				<Row className='justify-content-end'><h5>SKILLS</h5> <Button color='link'
																			 className='noUnderLine p-0 mt-1'
																			 onClick={() => this.setState({modal: true})}>⚙</Button></Row>
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

				<CustomSkills modal={this.state.modal} handleClose={() => this.setState({modal: false})}/>

			</Col>
		)
	}
}

function mapStateToProps(state) {
	return {
		customSkills: state.customSkills,
	};
}

export const Skill = connect(mapStateToProps)(SkillComponent);