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
		if (archetypes[archetype]) {
			if (archetypes[archetype].talents) {
				archetypes[archetype].talents.forEach(key => {
					if (archetypeTalents[key]) {
						if (archetypeTalents[key].modifier) {
							let target = {...archetypeTalents[key].modifier};
							defense.melee += (target.meleeDefense ? +target.meleeDefense : 0) + (target.defense ? +target.defense : 0);
							defense.ranged += (target.rangedDefense ? +target.rangedDefense : 0) + (target.defense ? +target.defense : 0);
						}
					}
				});
			}
		}

		//get defense from Armor
		Object.keys(equipmentStats).forEach(key => {
			let item = equipmentStats[key];
			if (item.type === 'armor') {
				if (item.equipped) {
					defense.melee += item.meleeDefense ? +item.meleeDefense : 0 + item.defense ? +item.defense : 0;
					defense.ranged += item.rangedDefense ? +item.rangedDefense : 0 + item.defense ? +item.defense : 0;
				}
			}
		});

		//get defense from talents
		Object.keys(talentCount).forEach(talent => {
			if (talents[talent]) {
				if (talents[talent].modifier) {
					defense.melee += ((talents[talent].modifier.meleeDefense ? +talents[talent].modifier.meleeDefense : 0) + (talents[talent].modifier.defense ? +talents[talent].modifier.defense : 0) * talentCount[talent]);
					defense.ranged += ((talents[talent].modifier.rangedDefense ? +talents[talent].modifier.rangedDefense : 0) + (talents[talent].modifier.defense ? +talents[talent].modifier.defense : 0) * talentCount[talent]);
				}
			}
		});

		//get defense from gear
		Object.keys(equipmentStats).forEach(key => {
			let item = equipmentStats[key];
			if (item.carried) {
				if (item.type !== 'armor' || item.equipped)
					if (item.qualities) {
						Object.keys(item.qualities).forEach(quality => {
							let rank = item.qualities[quality] === '' ? 1 : item.qualities[quality];
							if (qualities[quality]) {
								if (qualities[quality].modifier) {
									if (qualities[quality].modifier.meleeDefense) defense.melee += +qualities[quality].modifier.meleeDefense * rank;
									if (qualities[quality].modifier.rangedDefense) defense.ranged += +qualities[quality].modifier.rangedDefense * rank;
								}
							}
						})
					}
				if (item.modifier) {
					Object.keys(item.modifier).forEach(modifier => {
						if (modifier === 'meleeDefense') defense.melee += +item.modifier[modifier];
						if (modifier === 'rangedDefense') defense.ranged += +item.modifier[modifier];
						if (modifier === 'defense') {
							defense.ranged += +item.modifier[modifier];
							defense.melee += +item.modifier[modifier];
						}
					});

				}
			}
		});
		if (defense.melee > 4) defense.melee = 4;
		if (defense.ranged > 4) defense.ranged = 4;
		return defense;
	}
);

