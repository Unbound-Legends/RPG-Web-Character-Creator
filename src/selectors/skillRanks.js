import {createSelector} from 'reselect';
import * as selectors from './';

const careerSkillsRank = state => state.careerSkillsRank;
const masterSkills = state => state.masterSkills;
const skills = state => state.skills;

export const skillRanks = (state) => calcSkillRanks(state);

const calcSkillRanks = createSelector(
	masterSkills, skills, careerSkillsRank, selectors.archetypeSkillRank,
	(masterSkills, skills, careerSkillsRank, archetypeSkillRank) => {
		let skillRanks = {};
		Object.keys(skills).forEach(key => {
			skillRanks[key] = (
					masterSkills[key] ? ((masterSkills[key].rank ? masterSkills[key].rank : 0) +
						(masterSkills[key].careerRank ? masterSkills[key].careerRank : 0)) : 0) +
				(careerSkillsRank.includes(key) ? 1 : 0) +
				(Object.keys(archetypeSkillRank).includes(key) ? archetypeSkillRank[key].rank : 0);
		});
		return skillRanks;
	}
);