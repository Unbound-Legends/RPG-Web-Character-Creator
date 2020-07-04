import { get } from 'lodash-es';
import { createSelector } from 'reselect';
import { equipmentStats } from './equipmentStats';
import { skillDice } from './skillDice';

const qualities = state => state.qualities;

export const gearDice = state => calcGearDice(state);

const calcGearDice = createSelector(
    skillDice,
    equipmentStats,
    qualities,
    (skillDice, equipmentStats, qualities) => {
        const gearDice = {};
        Object.keys(equipmentStats).forEach(key => {
            const item = equipmentStats[key],
                { type, skill } = item,
                list = get(item, 'qualities', []),
                qualityDice = Object.keys(list)
                    .map(quality => {
                        const rank = list[quality] === '' ? 1 : list[quality];
                        const check = get(
                            qualities,
                            `${quality}.modifier.check`,
                            ''
                        );
                        return [...Array(rank)].map(() => check).join(' ');
                    })
                    .join(' ');

            gearDice[type] = {
                ...gearDice[type],
                [key]: skillDice[skill] + ' ' + qualityDice
            };
        });
        return gearDice;
    }
);
