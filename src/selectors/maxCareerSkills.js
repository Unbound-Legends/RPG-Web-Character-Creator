import { get } from 'lodash-es';
import { createSelector } from 'reselect';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;

export const maxCareerSkills = state => calcMaxCareerSkills(state);

const calcMaxCareerSkills = createSelector(
    archetype,
    archetypes,
    (archetype, archetypes) =>
        get(archetypes, `${archetype}.skills.careerSkills`, 4)
);
