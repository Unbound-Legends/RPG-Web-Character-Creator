import {createSelector} from 'reselect';
import * as selectors from './';

const equipmentGear = state => state.equipmentGear;
const gear = state => state.gear;

export const encumbranceLimit = (state) => calcEncumbranceLimit(state);
const calcEncumbranceLimit = createSelector(
    selectors.characteristics, equipmentGear, gear,
    (characteristics, equipmentGear, gear) => {
        let Brawn = characteristics.Brawn;
        let gearModifier = 0;

        //get gear modifier
        Object.keys(equipmentGear).forEach(item => {
            let id = equipmentGear[item].id;
            if (equipmentGear[item].carried) {
                if (gear[id]) {
                    if (gear[id].modifier) {
                        if (gear[id].modifier.maxEncumbrance) {
                            gearModifier += gear[id].modifier.maxEncumbrance;
                        }
                    }
                }
            }
        });

        return Brawn + gearModifier + 5;
    }
);
