import React from 'react';
import {connect} from 'react-redux';
import {Row, Table} from 'reactstrap';
import {talentCount} from '../selectors';
import {Description} from './index'

class TalentListComponent extends React.Component {

	activation = (value) => {
		if (value) return 'var(--orangeFade)';
		else return 'var(--lightblueFade)';
	};

	render() {
		const {archetype, archetypes, archetypeTalents, talents, talentCount, misc, theme} = this.props;
		return (
			<div className='no-break'>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>TALENT LIST</div>
				</Row>
				<hr/>
				<Table className='fontSizeSmall bg-light'>
					<thead>
					<tr className='text-center'>
						{['Talent', 'Ranks', 'Activation', 'Type', 'Description'].map(heading =>
							<th key={heading} className='px-2'>{heading}</th>
						)}
					</tr>
					</thead>
					<tbody>
					{(archetypes[archetype] && archetypes[archetype].talents) &&
					archetypes[archetype].talents.sort().map(key =>
						archetypeTalents[key] &&
						<tr key={key}>
							<td>{archetypeTalents[key].name}</td>
							<td/>
							<td className='text-center'
								style={{backgroundColor: this.activation(archetypeTalents[key].activation)}}>{archetypeTalents[key].activation ? 'Active' : 'Passive'}</td>
							<td className='text-center'>{archetypeTalents[key].turn}</td>
							<td><Description text={archetypeTalents[key].description ? archetypeTalents[key].description : ''}/></td>
						</tr>
					)}
					{misc &&
					misc.archetypeTalents &&
					archetypeTalents[misc.archetypeTalents] &&
					<tr>
						<td>{archetypeTalents[misc.archetypeTalents].name}</td>
						<td/>
						<td className='text-center'
							style={{backgroundColor: this.activation(archetypeTalents[misc.archetypeTalents].activation)}}>{archetypeTalents[misc.archetypeTalents].activation ? 'Active' : 'Passive'}</td>
						<td className='text-center'>{archetypeTalents[misc.archetypeTalents].turn}</td>
						<td><Description text={archetypeTalents[misc.archetypeTalents].description}/></td>
					</tr>
					}
					{Object.keys(talentCount).sort().map(key =>
						talents[key] &&
						<tr key={key}>
							<td>{talents[key].name}</td>
							<td className='text-center'>{talentCount[key]}</td>
							<td className='text-center'
								style={{backgroundColor: this.activation(talents[key].activation)}}>{talents[key].activation ? 'Active' : 'Passive'}</td>
							<td className='text-center'>{talents[key].turn}</td>
							<td><Description text={talents[key].description ? talents[key].description : ''}/></td>
						</tr>
					)}
					</tbody>
				</Table>
			</div>
		)
	};
}

const mapStateToProps = state => {
	return {
		talents: state.talents,
		archetype: state.archetype,
		archetypes: state.archetypes,
		archetypeTalents: state.archetypeTalents,
		misc: state.misc,
		talentCount: talentCount(state),
		theme: state.theme,
	};
};

export const TalentList = connect(mapStateToProps)(TalentListComponent);
