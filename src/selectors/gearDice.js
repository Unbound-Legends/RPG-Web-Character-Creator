import {get} from 'lodash-es';
import {createSelector} from 'reselect';
import * as selectors from './';

const qualities = state => state.qualities;

export const gearDice = (state) => calcGearDice(state);

const calcGearDice = createSelector(
	selectors.skillDice, selectors.equipmentStats, qualities,
	(skillDice, equipmentStats, qualities) => {
		let gearDice = {};
		Object.keys(equipmentStats).forEach(key => {
			const item = equipmentStats[key], {type, qualities: list, skill} = item;
			if (!gearDice[type]) gearDice[type] = {};
			let qualityDice = [];
			if (list) {
				Object.keys(list).forEach(quality => {
					const rank = list[quality] === '' ? 1 : list[quality];
					const check = get(qualities, `${quality}.modifier.check`, false);
					if (check) {
						for (let i = 0; i < rank; i++) {
							qualityDice.push(check);
						}
					}
				});
			}
			gearDice[type][key] = skillDice[skill] + qualityDice.map(die => `${die}`).sort((a, b) => {
				if (a.length < b.length) return -1;
				if (a.length > b.length) return 1;
				return 0;
			}).join(' ');
		});
		return gearDice;
	}
);
