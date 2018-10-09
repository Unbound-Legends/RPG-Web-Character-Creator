import React from 'react';
import DynamicFont from 'react-dynamic-font';
import {connect} from 'react-redux';
import {Card, CardBody, Row} from 'reactstrap';
import {talentCount} from '../../selectors';

class Component extends React.Component {

	activation = (talentKey) => {
		const {talents} = this.props;
		if (talentKey === '') return 'var(--light)';
		if (!talents[talentKey]) return 'var(--red)';
		if (talents[talentKey].activation) return 'var(--orange)';
		else return 'var(--lightblue)';
	};

	render() {
		const {masterTalents, talents, theme} = this.props;
		return (
			<div className='break-before'>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>TALENTS</div>
				</Row>
				<hr/>
				{Object.keys(masterTalents).map(row =>
					<Row key={row}>
						{Object.keys(masterTalents[row]).map(tier => {
							let talent = talents[masterTalents[row][tier]];
								return (
									<Card key={row + tier} className='m-2 my-3 talentCard'>
										<CardBody className='p-1 text-center'
													style={{backgroundColor: this.activation(masterTalents[row][tier])}}>
											<DynamicFont
												content={masterTalents[row][tier] === '' ? 'inactive' : talent ? talent.name : 'Missing Talent'}/>
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
		theme: state.theme,
	};
};

export const TalentPyramid = connect(mapStateToProps)(Component);