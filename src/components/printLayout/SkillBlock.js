import React from 'react';
import {connect} from 'react-redux';
import {Row, Table} from 'reactstrap';
import {SkillRow} from './index';

class Component extends React.Component {

	render() {
		const {type, skills, index} = this.props;
		return (
			<div>
				<Row><strong>{type}</strong></Row>
				<Table className='table-skills'>
					{0 >= index &&
					<thead>
					<tr>
						<th className='table-name'>Skill</th>
						<th className='table-career'>Career</th>
						<th className='table-rank'>Rank</th>
						<th className='table-dice'>Dice Pool</th>
					</tr>
					</thead>
					}
					<tbody>
					{Object.keys(skills).sort().map(skillKey =>
						skills[skillKey].type === type &&
						<SkillRow skillKey={skillKey} key={skillKey}/>
					)}
					</tbody>
				</Table>
			</div>
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
