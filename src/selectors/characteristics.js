import {createSelector} from 'reselect';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const creationCharacteristics = state => state.creationCharacteristics;
const talentModifiers = state => state.talentModifiers;

export const characteristics = (state) => calcCharacteristics(state);

const calcCharacteristics = createSelector(
    archetype, archetypes, creationCharacteristics, talentModifiers,
    (archetype, archetypes, creationCharacteristics, talentModifiers) => {
        if (!archetype || !archetypes[archetype]) return creationCharacteristics;
        //get the starting characteristics
        let characteristics = {...archetypes[archetype].characteristics};
        //add the creation characteristics
        Object.keys(characteristics).forEach((characteristic) => {
            characteristics[characteristic] += creationCharacteristics[characteristic];
        });
        //add dedications talents
        Object.values(talentModifiers.Dedication).forEach((characteristic) => {
            characteristics[characteristic]++;
        });
        return characteristics;
    }
);