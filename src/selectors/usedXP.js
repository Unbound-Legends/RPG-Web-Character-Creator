import {get} from 'lodash-es';
import {createSelector} from 'reselect';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const career = state => state.career;
const careers = state => state.careers;
const careerSkillsRank = state => state.careerSkillsRank;
const creationCharacteristics = state => state.creationCharacteristics;
const masterSkills = state => state.masterSkills;
const masterTalents = state => state.masterTalents;

export const usedXP = (state) => calcUsedXP(state);

const calcUsedXP = createSelector(
	masterTalents, creationCharacteristics, archetype, archetypes, masterSkills, career, careers, careerSkillsRank, selectors.archetypeSkillRank, selectors.skillRanks,
	(masterTalents, creationCharacteristics, archetype, archetypes, masterSkills, career, careers, careerSkillsRank, archetypeSkillRank, skillRanks) => {
		//talent XP
		let talentXP = 0;
		Object.keys(masterTalents).forEach(row => {
			Object.keys(masterTalents[row]).forEach(tier => {
				if (masterTalents[row][tier] !== '') talentXP = talentXP + (5 * tier);
			})
		});

		//skillXP
		let skillXP = 0;
		Object.keys(masterSkills).forEach(skill => {
			const rank = skillRanks[skill],
				archSkillRank = get(archetypeSkillRank, `${skill}.rank`, 0);

			for (let i = (careerSkillsRank.includes(skill) ? 1 : 0) + archSkillRank; rank > i; i++) skillXP += (i + 1) * 5;

			skillXP += get(masterSkills, `${skill}.rank`, 0) * 5;
		});

		//characteristicXP
		let characteristicXP = 0;
		Object.keys(creationCharacteristics).forEach(characteristic => {
			const points = get(creationCharacteristics, characteristic, 0),
				archCharacteristic = get(archetypes, `${archetype}.${characteristic}`);

			[...Array(points)].forEach((_, i) => {
				characteristicXP += (archCharacteristic + i + 1) * 10;
			});
		});

		return talentXP + skillXP + characteristicXP;
	}
);