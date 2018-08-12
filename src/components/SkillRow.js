import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {archetypeSkillRank, careerCheck, skillDice, skillRanks} from '../selectors';
import {Description} from './index';

class SkillRowComponent extends React.Component {

	handleRankChange = (event) => {
		const {masterSkills, skillKey, changeData, careerSkillsRank, archetypeSkillRank, careerCheck} = this.props;
		let newObj = {...masterSkills};
		let rankType = careerCheck[skillKey] ? 'careerRank' : 'rank';
		if (!newObj[skillKey]) newObj[skillKey] = {};
		newObj[skillKey][rankType] = +event.target.value - (careerSkillsRank.includes(skillKey) ? 1 : 0) - (archetypeSkillRank[skillKey] ? archetypeSkillRank[skillKey].rank : 0) - (careerCheck[skillKey] && (masterSkills[skillKey] ? masterSkills[skillKey].rank > 0 : false) ? careerCheck[skillKey] : 0);
		changeData(newObj, 'masterSkills');
	};

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
		const {archetype, career, masterSkills, skills, skillKey, careerSkillsRank, skillDice, skillRanks, archetypeSkillRank, careerCheck} = this.props;
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
					<input type='checkbox' checked={!!careerCheck[skillKey]}
						   readOnly/>
				</td>
				<td>
					<select disabled={!archetype || !career} value={skillRanks[skillKey]}
							onChange={this.handleRankChange} style={{margin: '0'}}>
						{ranks.map((key) => <option key={key} value={key}>{key}</option>)}
					</select>
				</td>
				<td className='table-dice'>
					<Description text={skillDice[skillKey]}/>
				</td>
			</tr>
		)
	}
}

const mapStateToProps = state => {
	return {
		archetype: state.archetype,
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

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const SkillRow = connect(mapStateToProps, matchDispatchToProps)(SkillRowComponent);
