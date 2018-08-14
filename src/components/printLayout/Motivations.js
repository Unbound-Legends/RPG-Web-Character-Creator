import React from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, Row} from 'reactstrap';

class Component extends React.Component {

	render() {
		const {masterMotivations} = this.props;
		return (
			<div>
				<Row className='justify-content-end'><h5>MOTIVATIONS</h5></Row>
				<hr/>
				<Row className='justify-content-center'>
					{['Strength', 'Flaw', 'Desire', 'Fear'].map(type => {
							return (
								<Card className='m-2' key={type} style={{width: '45%', height: '300px'}}>
									<CardHeader>
										<b>{`${type}: ${masterMotivations[type] ? (masterMotivations[type].key ? masterMotivations[type].key : '') : ''}`}</b>
									</CardHeader>
									<CardBody>
										{masterMotivations[type] ? masterMotivations[type].description : ''}
									</CardBody>
								</Card>
							)
						}
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