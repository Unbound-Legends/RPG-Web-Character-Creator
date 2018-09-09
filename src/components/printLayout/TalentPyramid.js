import React from 'react';
import DynamicFont from 'react-dynamic-font';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, CardText, Row} from 'reactstrap';
import {talentCount} from '../../selectors';
import {Description} from '../index';

class Component extends React.Component {

	activation = (talentKey) => {
		const {talents} = this.props;
		if (talentKey === '') return 'var(--light)';
		if (!talents[talentKey]) return 'var(--red)';
		if (talents[talentKey].activation) return 'var(--orange)';
		else return 'var(--lightblue)';
	};

	render() {
		const {masterTalents, talents} = this.props;
		return (
			<div className='break-before'>
				<Row className='justify-content-end'><h5>TALENTS</h5></Row>
				<hr/>
				{Object.keys(masterTalents).map(row =>
					<Row key={row} className=''>
						{Object.keys(masterTalents[row]).map(tier => {
							let talent = talents[masterTalents[row][tier]];
								return (
									<Card key={row + tier} className='m-1 talentCard'>
										<CardHeader className='p-1 text-center'
													style={{backgroundColor: this.activation(masterTalents[row][tier])}}>
											<DynamicFont
												content={masterTalents[row][tier] === '' ? 'inactive' : talent ? talent.name : 'Missing Talent'}/>
										</CardHeader>
										<CardBody className='p-1 talentDesc'>
											<CardText>
												<Description
													text={talent ? talent.description ? `${talent.description}\n\n ${talent.activation ? talent.turn : ''}` : '' : ''}/>
											</CardText>
										</CardBody>
									</Card>
								)
							}
						)}
					</Row>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		masterTalents: state.masterTalents,
		talents: state.talents,
		talentCount: talentCount(state),
	};
};

export const TalentPyramid = connect(mapStateToProps)(Component);