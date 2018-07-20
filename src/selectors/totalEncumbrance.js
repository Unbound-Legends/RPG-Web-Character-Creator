import {createSelector} from 'reselect';
import * as selectors from './'

export const totalEncumbrance = (state) => calcTotalEncumbrance(state);

const calcTotalEncumbrance = createSelector(
	selectors.equipmentStats,
	(equipmentStats) => {
		let encumbrance = 0;
		Object.keys(equipmentStats).forEach(key => {
			let item = equipmentStats[key];
			if (item.carried && item.encumbrance) {
				encumbrance += +item.encumbrance;
				if (item.type === 'armor' && item.equipped) encumbrance -= item.encumbrance < 3 ? item.encumbrance : 3;
			}
		});
		return encumbrance;
	}
);