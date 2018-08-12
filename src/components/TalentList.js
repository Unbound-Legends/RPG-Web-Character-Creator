import React from 'react';
import {connect} from 'react-redux';
import {Row, Table} from 'reactstrap';
import {talentCount} from '../selectors';
import {Description} from './index'

class TalentListComponent extends React.Component {

	render() {
		const {archetype, archetypes, archetypeTalents, talents, talentCount, misc} = this.props;
		return (
			<div className='w-100 no-break'>
				<Row className='justify-content-end'><h5>TALENT LIST</h5></Row>
				<hr/>
				<Table>
					<thead>
					<tr className='text-center'>
						{['Talent', 'Rank', 'Activation', 'Type', 'Description'].map((heading) =>
							<th key={heading}>{heading}</th>
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
							<td className='text-center'>{archetypeTalents[key].activation ? 'Active' : 'Passive'}</td>
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
						<td className='text-center'>{archetypeTalents[misc.archetypeTalents].activation ? 'Active' : 'Passive'}</td>
						<td className='text-center'>{archetypeTalents[misc.archetypeTalents].turn}</td>
						<td><Description text={archetypeTalents[misc.archetypeTalents].description}/></td>
					</tr>
					}
					{Object.keys(talentCount).sort().map(key =>
						talents[key] &&
						<tr key={key}>
							<td>{talents[key].name}</td>
							<td className='text-center'>{talentCount[key]}</td>
							<td className='text-center'>{talents[key].activation ? 'Active' : 'Passive'}</td>
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
	};
};

export const TalentList = connect(mapStateToProps)(TalentListComponent);
