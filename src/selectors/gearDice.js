import {createSelector} from 'reselect';
import * as selectors from './';

const qualities = state => state.qualities;

export const gearDice = (state) => calcGearDice(state);

const calcGearDice = createSelector(
    selectors.skillDice, selectors.equipmentStats, qualities,
    (skillDice, equipmentStats, qualities) => {
        let gearDice = {};
        Object.keys(equipmentStats).forEach(key => {
            let item = equipmentStats[key];
            let type = item.type;
            let list = item.qualities;
            let skill = item.skill;
            if (!gearDice[type]) gearDice[type] = {};
            let qualityDice = [];
            if (list) {
                Object.keys(list).forEach(quality => {
                    let rank = list[quality] === '' ? 1 : list[quality];
                    if (qualities[quality]) {
                        if (qualities[quality].modifier) {
                            if (qualities[quality].modifier.check) {
                                for (let i = 0; i < rank; i++) {
                                    qualityDice.push(qualities[quality].modifier.check);
                                }
                            }
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
