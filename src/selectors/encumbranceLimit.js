import { get } from 'lodash-es';
import { createSelector } from 'reselect';
import * as selectors from './';

const equipmentGear = state => state.equipmentGear;
const talents = state => state.talents;
const gear = state => state.gear;

export const encumbranceLimit = state => calcEncumbranceLimit(state);
const calcEncumbranceLimit = createSelector(
    selectors.characteristics,
    equipmentGear,
    gear,
    talents,
    selectors.talentCount,
    (characteristics, equipmentGear, gear, talents, talentCount) => {
        const Brawn = characteristics.Brawn;

        //get gear modifier
        const gearModifier = Object.keys(equipmentGear)
            .map(item => {
                const id = equipmentGear[item].id,
                    maxEncumbrance = get(
                        gear,
                        `${id}.modifier.maxEncumbrance`,
                        0
                    );
                if (equipmentGear[item].carried) return maxEncumbrance;
                else return 0;
            })
            .reduce((acc, val) => acc + val, 0);

        //add other talents
        const talentsModifier = Object.entries(talentCount)
            .map(([talent, count]) => {
                return (
                    get(talents, `${talent}.modifier.maxEncumbrance`, 0) * count
                );
            })
            .reduce((acc, val) => acc + val, 0);

        return Brawn + gearModifier + talentsModifier + 5;
    }
);
