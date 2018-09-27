import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';

class Component extends React.Component {

	render() {
		const {masterMotivations} = this.props;
		return (
			<div>
				<Row className='justify-content-end'><h5>MOTIVATIONS</h5></Row>
				<hr/>
				<Row className='justify-content-center'>
					{['Strength', 'Flaw', 'Desire', 'Fear'].map(type =>
						<Row key={type}>
							<h4>{type}:</h4>
							{masterMotivations[type] ?
								<p>
									<strong>{masterMotivations[type].key} - </strong>
									<a>{masterMotivations[type].description}</a>
								</p>
								: ''}
						</Row>
					)}
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		masterMotivations: state.masterMotivations,
		motivations: state.motivations,
	};
};

export const Motivations = connect(mapStateToProps)(Component);