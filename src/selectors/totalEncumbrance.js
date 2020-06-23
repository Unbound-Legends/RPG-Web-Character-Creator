import { get } from 'lodash-es';
import { createSelector } from 'reselect';
import * as selectors from './';

export const totalEncumbrance = state => calcTotalEncumbrance(state);

const calcTotalEncumbrance = createSelector(
    selectors.equipmentStats,
    equipmentStats => {
        let encumbrance = 0;
        Object.keys(equipmentStats).forEach(key => {
            const carried = get(equipmentStats, `${key}.carried`, false),
                equipped = get(equipmentStats, `${key}.equipped`, false),
                type = get(equipmentStats, `${key}.type`, ''),
                itemEncumbrance = get(equipmentStats, `${key}.encumbrance`, 0);
            if (carried) {
                encumbrance += itemEncumbrance;
                if (type === 'armor' && equipped)
                    encumbrance -= itemEncumbrance < 3 ? itemEncumbrance : 3;
            }
        });
        return encumbrance;
    }
);
