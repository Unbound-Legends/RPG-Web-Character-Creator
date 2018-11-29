import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';

class Component extends React.Component {

	render() {
		const {masterMotivations, theme} = this.props;
		return (
			<div>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>MOTIVATIONS</div>
				</Row>
				<hr/>
				{['Strength', 'Flaw', 'Desire', 'Fear'].map(type =>
					<Row className='justify-content-left' key={type}>
						<b>{type.toUpperCase()}</b>
						{masterMotivations[type] &&
						<p>
							<i>{masterMotivations[type].key}</i>: {masterMotivations[type].description}
						</p>
						}
					</Row>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		masterMotivations: state.masterMotivations,
		motivations: state.motivations,
		theme: state.theme,
	};
};

export const Motivations = connect(mapStateToProps)(Component);