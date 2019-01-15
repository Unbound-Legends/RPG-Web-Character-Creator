import {get} from 'lodash-es';
import {createSelector} from 'reselect';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const creationCharacteristics = state => state.creationCharacteristics;
const talents = state => state.talents;

export const woundThreshold = (state) => calcWounds(state);

const calcWounds = createSelector(
	archetype, archetypes, talents, creationCharacteristics, selectors.talentCount, selectors.equipmentStats,
	(archetype, archetypes, talents, creationCharacteristics, talentCount, equipmentStats) => {
		const startingThreshold = get(archetypes, `${archetype}.woundThreshold`, 0),
			startingBrawn = get(archetypes, `${archetype}.Brawn`, 0),
			creationBrawn = get(creationCharacteristics, 'Brawn', 0);

		//get wound modifier from talentModifier
		let talentModifier = 0;
		Object.keys(talentCount).forEach(talent => talentModifier += get(talents, `${talent}.modifier.woundThreshold`, 0) * talentCount[talent]);

		let Gear = 0;
		Object.keys(equipmentStats).forEach(key => {
			const carried = get(equipmentStats, `${key}.carried`, false),
				type = get(equipmentStats, `${key}.type`, ''),
				woundThreshold = +get(equipmentStats, `${key}.modifier.woundThreshold`, 0);

			if (type === 'gear' && carried) Gear += woundThreshold;
		});

		return startingThreshold + startingBrawn + creationBrawn + talentModifier + Gear;
	}
);