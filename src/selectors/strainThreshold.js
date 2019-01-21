import {get} from 'lodash-es';
import {createSelector} from 'reselect';
import {chars} from '../data/lists';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const creationCharacteristics = state => state.creationCharacteristics;
const talents = state => state.talents;

export const strainThreshold = (state) => calcStrain(state);

const calcStrain = createSelector(
	archetype, archetypes, talents, creationCharacteristics, selectors.talentCount, selectors.equipmentStats,
	(archetype, archetypes, talents, creationCharacteristics, talentCount, equipmentStats) => {
		const startingThreshold = get(archetypes, `${archetype}.strainThreshold`, 0),
			startingWillpower = get(archetypes, `${archetype}.Willpower`, 0),
			creationWillpower = get(creationCharacteristics, 'Willpower', 0);

		//get all talents that modify strain

		const talentModifier = Object.keys(talentCount).reduce((acc, talent) => {
			return acc + +get(talents, `${talent}.modifier.strainThreshold`, 0) * talentCount[talent];
		}, 0);

		//check for Gear
		let Gear = 0;
		Object.keys(equipmentStats).forEach(key => {
			const modifier = get(equipmentStats, `${key}.modifier`, {}),
				carried = get(equipmentStats, `${key}.carried`, false),
				equipped = get(equipmentStats, `${key}.equipped`, false),
				kind = get(equipmentStats, `${key}.type`, '');

			if (carried) Gear += get(equipmentStats, `${key}.modifier.strainThreshold`, 0);

			if (equipped || kind !== 'armor') {
				Object.keys(modifier).forEach(type => {
					if (chars.includes(type)) Gear--
				});
			}
		});
		return startingThreshold + startingWillpower + creationWillpower + talentModifier + Gear;
	}
);