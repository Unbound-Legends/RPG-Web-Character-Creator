import React from 'react';
import {connect} from 'react-redux';
import {Table} from 'reactstrap';
import {SkillRow} from './index';

class Component extends React.Component {

	render() {
		const {type, skills, index} = this.props;
		return (
			<Table className='m-0'>
				<thead>
				<tr>
					<th className='p-0'>{type}</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>
						<Table>
							{0 >= index &&
							<thead>
							<tr className='py-0'>
								<th className='table-name'>Skill</th>
								<th className='table-career'>Career</th>
								<th>Rank</th>
								<th className='table-dice'>Dice Pool</th>
							</tr>
							</thead>
							}
							<tbody>
							{Object.keys(skills).sort().map((skillKey) =>
								skills[skillKey].type === type &&
								<SkillRow skillKey={skillKey} key={skillKey}/>
							)}
							</tbody>
						</Table>
					</td>
				</tr>
				</tbody>
			</Table>
		)
	}
}

const mapStateToProps = state => {
	return {
		skills: state.skills,
		masterSkills: state.masterSkills,
	};
};

export const SkillBlock = connect(mapStateToProps)(Component);
