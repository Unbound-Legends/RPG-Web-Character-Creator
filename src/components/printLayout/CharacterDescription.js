import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';

class Component extends React.Component {

	render() {
		const {description, theme} = this.props;
		return (
			<div>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>CHARACTER DESCRIPTION</div>
				</Row>
				<hr/>
				{['gender', 'age', 'height', 'build', 'hair', 'eyes'].map(aspect =>
					<Row key={aspect} className='my-2'>
						<Col sm='3'>
							<b>{aspect.toLocaleUpperCase()}:</b>
						</Col>
						<Col>
							{description[aspect]}
						</Col>
						<hr/>
					</Row>
				)}
				<Row className='my-2'>
					<Col sm='3'>
						<b>NOTABLE FEATURES:</b>
					</Col>
					<Col>
						{description.features ? description.features : ''}
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		description: state.description,
		theme: state.theme,
	};
};

export const CharacterDescription = connect(mapStateToProps)(Component);