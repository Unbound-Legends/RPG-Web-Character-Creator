import {createSelector} from 'reselect';
import {chars} from '../data/lists';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const creationCharacteristics = state => state.creationCharacteristics;
const talents = state => state.talents;

export const strainThreshold = (state) => calcStrain(state);

const calcStrain = createSelector(
	archetype, archetypes, talents, creationCharacteristics, selectors.talentCount, selectors.equipmentStats,
	(archetype, archetypes, talents, creationCharacteristics, talentCount, equipmentStats) => {
		if (!archetype || !archetypes[archetype]) return 0;
		//get starting wounds
		let startingThreshold = archetypes[archetype].strainThreshold;
		//get starting brawn
		let startingBrawn = archetypes[archetype].characteristics.Willpower;
		//get brawn added via creation
		let creationBrawn = creationCharacteristics.Willpower;
		//get wound modifier from talentModifier
		let talentModifier = 0;
		Object.keys(talentCount).forEach((talent) => {
			if (talents[talent]) {
				if (talents[talent].modifier) talentModifier += ((talents[talent].modifier.strainThreshold ? talents[talent].modifier.strainThreshold : 0) * talentCount[talent]);
			}
		});
		//check for cybernetics
		let cybernetics = 0;
		Object.keys(equipmentStats).forEach(key => {
			let item = equipmentStats[key];
			if (item.modifier) {
				if (item.carried) {
					if (item.equipped || item.type !== 'armor') {
						let list = item.modifier;
						if (list) {
							Object.keys(list).forEach(modifier => {
								if (chars.includes(modifier) && list[modifier]) cybernetics--;
							});
						}
					}
				}
			}
		});
		return startingThreshold + startingBrawn + creationBrawn + talentModifier + cybernetics;
	}
);