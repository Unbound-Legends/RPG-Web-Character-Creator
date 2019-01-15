import {get} from 'lodash-es';
import {createSelector} from 'reselect';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const archetypeTalents = state => state.archetypeTalents;
const qualities = state => state.qualities;
const talents = state => state.talents;

export const totalDefense = (state) => calcTotalDefense(state);

const calcTotalDefense = createSelector(
	qualities, archetype, archetypes, archetypeTalents, talents, selectors.talentCount, selectors.equipmentStats,
	(qualities, archetype, archetypes, archetypeTalents, talents, talentCount, equipmentStats) => {
		let defense = {melee: 0, ranged: 0};

		//get defense from Archetype
		const archTalents = get(archetypes, `${archetype}.talents`, []);
		archTalents.forEach(key => {
			Object.keys(defense).forEach(type => {
				defense[type] += get(archetypeTalents, `${key}.modifier.${type}Defense`, 0) + get(archetypeTalents, `${key}.modifier.defense`, 0)
			});
		});

		//get defense from talents
		Object.keys(talentCount).forEach(talent => {
			Object.keys(defense).forEach(type => {
				defense[type] += get(talents, `${talent}.modifier.${type}Defense`, 0) + get(talents, `${talent}.modifier.defense`, 0);
			});
		});

		//get defense from gear
		Object.keys(equipmentStats).forEach(key => {
			const carried = get(equipmentStats, `${key}.carried`, false),
				equipped = get(equipmentStats, `${key}.equipped`, false),
				type = get(equipmentStats, `${key}.type`, ''),
				gearQualities = get(equipmentStats, `${key}.qualities`, {}),
				modifier = get(equipmentStats, `${key}.modifier`, {});

			if (carried && (type !== 'armor' || equipped)) {
				//add defense from item qualities
				Object.keys(gearQualities).forEach(quality => {
					const rank = gearQualities[quality] === '' ? 1 : gearQualities[quality];
					Object.keys(defense).forEach(type => defense[type] += get(qualities, `${quality}.modifier.${type}Defense`, 0) * rank);
				});
				//add armor defense
				Object.keys(defense).forEach(type => {
					defense[type] += +get(equipmentStats, `${key}.${type}Defense`, 0) + +get(equipmentStats, `${key}.defense`, 0);
				});
				//add any modifier defense
				Object.keys(defense).forEach(type => defense[type] += get(modifier, `${type}Defense`, 0) + get(modifier, `defense`, 0));
			}
		});

		//max of 4
		Object.keys(defense).forEach(key => {
			if (defense[key] > 4) defense[key] = 4
		});
		return defense;
	}
);