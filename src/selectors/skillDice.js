import {createSelector} from 'reselect';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const archetypeTalents = state => state.archetypeTalents;
const skills = state => state.skills;
const talents = state => state.talents;

export const skillDice = (state) => calcSkillDice(state);

const calcSkillDice = createSelector(
	selectors.characteristics, selectors.skillRanks, skills, talents, selectors.talentCount, archetype, archetypes, archetypeTalents, selectors.equipmentStats,
	(characteristics, skillRanks, skills, talents, talentCount, archetype, archetypes, archetypeTalents, equipmentStats) => {
		if (!characteristics) return '';
		let skillDice = {};
		Object.keys(skills).forEach(key => {
			let characteristic = characteristics[skills[key].characteristic];
			let rank = skillRanks[key];
			let dice, upgrade = 0;
			let text = '';
			if (characteristic >= rank) {
				dice = characteristic;
				upgrade = characteristic - rank;
			} else {
				dice = rank;
				upgrade = rank - characteristic;
			}
			for (let i = dice; i > 0; i--) {
				if (i > upgrade) text += '[yellow] ';
				else text += '[green] ';
			}

			//get any dice from talents
			Object.keys(talentCount).forEach(talent => {
				if (talents[talent]) {
					if (talents[talent].modifier) {
						if (talents[talent].modifier[key]) {
							talents[talent].modifier[key].forEach(die => text += `${die} `);
						}
					}
				}
			});

			//get dice from archetype talents
			if (archetypes[archetype]) {
				if (archetypes[archetype].talents) {
					archetypes[archetype].talents.forEach(key2 => {
						if (archetypeTalents[key2].modifier) {
							if (archetypeTalents[key2].modifier[key] && !Number.isInteger(archetypeTalents[key2].modifier[key])) text += archetypeTalents[key2].modifier[key] + ' ';
						}
					});
				}
			}

			//get dice from equipment
			Object.keys(equipmentStats).forEach(key2 => {
				let item = equipmentStats[key2];
				if (item.equipped) {
					let list = item.modifier;
					if (list) {
						Object.keys(list).forEach(modifier => {
							if (modifier === key) text += list[modifier] + ' ';
						});
					}
				}
			});

			skillDice[key] = text;
		});
		return skillDice;
	}
);