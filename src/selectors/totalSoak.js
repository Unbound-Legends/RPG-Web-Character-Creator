import {createSelector} from 'reselect';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const archetypeTalents = state => state.archetypeTalents;
const talents = state => state.talents;
const armor = state => state.armor;

export const totalSoak = (state) => calcTotalSoak(state);

const calcTotalSoak = createSelector(
	archetype, archetypes, talents, armor, archetypeTalents, selectors.equipmentStats, selectors.characteristics, selectors.talentCount,
	(archetype, archetypes, talents, armor, archetypeTalents, equipmentStats, characteristics, talentCount) => {
		if (!archetype || !archetypes[archetype]) return 0;
		//get calcBrawn
		let Brawn = characteristics.Brawn;
		//get soak from armor and gear
		let Armor = 0;
		Object.keys(equipmentStats).forEach(key => {
			let item = equipmentStats[key];
			if (item.type === 'armor') if (item.equipped && item.soak) Armor += +item.soak;
			if (item.type === 'gear') if (item.modifier && item.carried) if (item.modifier.soak) Armor += +item.modifier.soak;
		});
		//get soak from Enduring Talent
		let talentModifier = 0;
		Object.keys(talentCount).forEach(talent => {
			if (talents[talent]) {
				if (talents[talent].modifier) talentModifier += ((talents[talent].modifier.soak ? talents[talent].modifier.soak : 0) * talentCount[talent]);
			}
		});

		//get soak from archetype
		let archetypeModifier = 0;
		if (archetypes[archetype]) {
			if (archetypes[archetype].talents) {
				archetypes[archetype].talents.forEach(key => {
					if (archetypeTalents[key]) {
						if (archetypeTalents[key].modifier) {
							if (archetypeTalents[key].modifier.soak) archetypeModifier = +archetypeTalents[key].modifier.soak
						}
					}
				});
			}
		}
		return Brawn + Armor + talentModifier + archetypeModifier;
	}
);

