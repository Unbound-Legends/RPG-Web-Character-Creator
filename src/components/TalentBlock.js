import React from 'react';
import DynamicFont from 'react-dynamic-font';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, CardText} from 'reactstrap';
import {talentCount} from '../selectors';
import {TalentSelection} from './index';

class TalentBlockComponent extends React.Component {
	state = {modal: false};

	activation = () => {
		const {talents, talentKey} = this.props;
		if (talentKey === '') return 'var(--light)';
		if (!talents[talentKey]) return 'var(--red)';
		if (talents[talentKey].activation) return 'var(--orange)';
		else return 'var(--lightblue)';
	};

	render() {
		const {talents, talentKey, row, tier} = this.props;
		const talent = talents[talentKey];
		const color = this.activation();
		return (
			<div>
				<TalentSelection modal={this.state.modal}
								 handleClose={() => this.setState({modal: false})}
								 row={row}
								 tier={tier}
								 talentKey={talentKey}/>
				<Card onClick={() => this.setState({modal: true})} className='m-1 talentCard'>
					<CardHeader className='p-1 text-center' style={{backgroundColor: color}}>
						<DynamicFont content={talentKey === '' ? 'inactive' : talent ? talent.name : 'Missing Talent'}/>
					</CardHeader>
					<CardBody className='p-1 talentDesc'>
						<CardText>
							{(talent ? (talent.description ? talent.description : '') + '\n\n' + (talent.activation ? talent.turn : '') : '')}
						</CardText>
					</CardBody>
				</Card>
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

export const TalentBlock = connect(mapStateToProps)(TalentBlockComponent);
