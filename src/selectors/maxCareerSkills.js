import {createSelector} from 'reselect';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;


export const maxCareerSkills = (state) => calcMaxCareerSkills(state);

const calcMaxCareerSkills = createSelector(
    archetype, archetypes,
    (archetype, archetypes) => {
        if (!archetype || !archetypes[archetype]) return 4;
        const archetypeSkills = archetypes[archetype].skills;
        return Object.keys(archetypeSkills).includes('careerSkills') ? 6 : 4;
    }
);