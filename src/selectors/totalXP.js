import { get } from 'lodash-es';
import { createSelector } from 'reselect';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const earnedXP = state => state.earnedXP;

export const totalXP = state => calcTotalXP(state);

const calcTotalXP = createSelector(
    archetype,
    archetypes,
    earnedXP,
    (archetype, archetypes, earnedXP) =>
        +get(archetypes, `${archetype}.experience`, 0) + +earnedXP
);
