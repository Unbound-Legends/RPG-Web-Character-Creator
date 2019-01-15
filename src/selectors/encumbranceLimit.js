import {get} from 'lodash-es';
import {createSelector} from 'reselect';
import * as selectors from './';

const equipmentGear = state => state.equipmentGear;
const gear = state => state.gear;

export const encumbranceLimit = (state) => calcEncumbranceLimit(state);
const calcEncumbranceLimit = createSelector(
	selectors.characteristics, equipmentGear, gear,
	(characteristics, equipmentGear, gear) => {
		const Brawn = characteristics.Brawn;

		//get gear modifier
		let gearModifier = 0;

		Object.keys(equipmentGear).forEach(item => {
			const id = equipmentGear[item].id, maxEncumbrance = get(gear, `${id}.modifier.maxEncumbrance`, 0);
			if (equipmentGear[item].carried) gearModifier += maxEncumbrance;
		});

		return Brawn + gearModifier + 5;
	}
);
