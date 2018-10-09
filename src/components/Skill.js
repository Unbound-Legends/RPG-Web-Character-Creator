import React from 'react';
import {connect} from "react-redux";
import {Col, Row} from 'reactstrap';
import {SkillBlock} from './';

class SkillComponent extends React.Component {

	render() {
		const {theme} = this.props;
		return (
			<div>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>SKILLS</div>
				</Row>
				<hr/>
				<Row>
					<Col>
						{['General', 'Magic'].map(type =>
							<SkillBlock key={type}
										type={type}/>
						)}
					</Col>
					<Col>
						{['Combat', 'Social', 'Knowledge'].map(type =>
							<SkillBlock key={type}
										type={type}/>
						)}
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		theme: state.theme,
	};
};

export const Skill = connect(mapStateToProps)(SkillComponent);