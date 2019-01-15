import {get} from 'lodash-es';
import {createSelector} from 'reselect';
import {chars} from '../data/lists'
import * as initialState from '../reducers/initialState';
import * as selectors from './index';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const creationCharacteristics = state => state.creationCharacteristics;
const talentModifiers = state => state.talentModifiers;
const talents = state => state.talents;

export const characteristics = (state) => calcCharacteristics(state);

const calcCharacteristics = createSelector(
	archetype, archetypes, creationCharacteristics, talentModifiers, selectors.equipmentStats, talents, selectors.talentCount,
	(archetype, archetypes, creationCharacteristics, talentModifiers, equipmentStats, talents, talentCount) => {
		//get the starting characteristics
		let characteristics = {...creationCharacteristics};

		//add the arch characteristics
		const arch = get(archetypes, `${archetype}`, initialState.creationCharacteristics);
		Object.keys(characteristics).forEach(key => characteristics[key] += arch[key]);

		//add dedications talents
		const dedication = get(talentModifiers, 'Dedication', {});
		Object.keys(dedication).forEach(key => characteristics[dedication[key]]++);

		//add other talents
		Object.entries(talentCount).forEach(([talent, count]) => {
			const modifier = get(talents, `${talent}.modifier`, {});
			chars.forEach(key => {
				if (key in modifier) characteristics[key] += count;
			});
		});
		//add equipment modifier
		Object.keys(equipmentStats).forEach(key => {
			const modifier = get(equipmentStats, `${key}.modifier`, {}),
				carried = get(equipmentStats, `${key}.carried`, false),
				equipped = get(equipmentStats, `${key}.equipped`, false),
				type = get(equipmentStats, `${key}.type`, '');

			if (carried && modifier && (equipped || type !== 'armor')) {
				Object.keys(modifier).forEach(key => {
					if (chars.includes(key)) characteristics[key] += 1;
				});
			}
		});

		//Hard cap of 6
		Object.keys(characteristics).forEach(key => {
			if (characteristics[key] > 6) characteristics[key] = 6;
		});

		return characteristics;
	}
);
