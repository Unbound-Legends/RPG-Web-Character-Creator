import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {talentCount} from '../selectors';
import {TalentBlock} from './';

class TalentsComponent extends React.Component {
	render() {
		const {masterTalents, theme} = this.props;
		return (
			<div>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>TALENTS</div>
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
		theme: state.theme
	};
};

export const Talents = connect(mapStateToProps)(TalentsComponent);
