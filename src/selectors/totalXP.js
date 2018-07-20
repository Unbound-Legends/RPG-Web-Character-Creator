import {createSelector} from 'reselect';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const earnedXP = state => state.earnedXP;

export const totalXP = (state) => calcTotalXP(state);
const calcTotalXP = createSelector(
	archetype, archetypes, earnedXP,
	(archetype, archetypes, earnedXP) => {
		if (!archetype || !archetypes[archetype]) return earnedXP;
		return +archetypes[archetype].experience + +earnedXP;
	}
);
