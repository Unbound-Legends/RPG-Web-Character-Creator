import React from 'react';
import {connect} from 'react-redux';
import {archetypeSkillRank, careerCheck, skillDice, skillRanks} from '../../selectors';
import {Description} from '../index';

class Component extends React.Component {

	shortCharacteristics = () => {
		const {skillKey, skills} = this.props;
		switch (skills[skillKey].characteristic) {
			case 'Agility':
				return 'AG';
			case 'Brawn':
				return 'BR';
			case 'Intellect':
				return 'INT';
			case 'Cunning':
				return 'CUN';
			case 'Willpower':
				return 'WILL';
			case 'Presence':
				return 'PR';
			default:
				return '';
		}
	};

	render() {
		const {masterSkills, skills, skillKey, careerSkillsRank, skillDice, skillRanks, archetypeSkillRank, careerCheck} = this.props;
		const skill = skills[skillKey];
		let ranks = [0, 1, 2, 3, 4, 5];
		if (careerSkillsRank.includes(skillKey)) ranks.shift();
		if (archetypeSkillRank[skillKey]) {
			for (let i = 0; archetypeSkillRank[skillKey].rank > i; i++) {
				ranks.shift();
			}
		}
		return (
			<tr className={masterSkills[skillKey] ? (masterSkills[skillKey].hide ? 'row-hide' : '') : ''}>
				<td className='table-name'>
					{`${skill.name} (${this.shortCharacteristics()})`}
				</td>
				<td className='table-career'>
					{!!careerCheck[skillKey] ? '✓' : ''}
				</td>
				<td className='table-rank'>
					{skillRanks[skillKey] ? skillRanks[skillKey] : ''}
				</td>
				<td className='table-dice '>
					<Description text={skillDice[skillKey]}/>
				</td>
			</tr>
		)
	}
}

const mapStateToProps = state => {
	return {
		masterSkills: state.masterSkills,
		skills: state.skills,
		careerSkillsRank: state.careerSkillsRank,
		career: state.career,
		careers: state.careers,
		skillDice: skillDice(state),
		skillRanks: skillRanks(state),
		archetypeSkillRank: archetypeSkillRank(state),
		careerCheck: careerCheck(state),
	};
};

export const SkillRow = connect(mapStateToProps)(Component);
