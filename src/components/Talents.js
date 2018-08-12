import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {talentCount} from '../selectors';
import {TalentBlock} from './';

class TalentsComponent extends React.Component {
	render() {
		const {masterTalents} = this.props;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'>
					<h5>TALENTS</h5>
				</Row>
				<hr/>
				{Object.keys(masterTalents).map(row =>
					<Row key={row} className=''>
						{Object.keys(masterTalents[row]).map(tier =>
							<TalentBlock key={row + tier}
										 row={+row}
										 tier={+tier}
										 talentKey={masterTalents[row][tier]}/>
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

export const Talents = connect(mapStateToProps)(TalentsComponent);
