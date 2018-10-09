import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {SkillBlock} from './index';

class Component extends React.Component {

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
		theme: state.theme,
	};
};

export const Skill = connect(mapStateToProps)(Component);