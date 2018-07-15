import {createSelector} from 'reselect';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const creationCharacteristics = state => state.creationCharacteristics;
const talents = state => state.talents;

export const strainThreshold = (state) => calcStrain(state);

const calcStrain = createSelector(
    archetype, archetypes, talents, creationCharacteristics, selectors.talentCount,
    (archetype, archetypes, talents, creationCharacteristics, talentCount) => {
        if (!archetype || !archetypes[archetype]) return 0;
        //get starting wounds
        let startingThreshold = archetypes[archetype].strainThreshold;
        //get starting brawn
        let startingBrawn = archetypes[archetype].characteristics.Willpower;
        //get brawn added via creation
        let creationBrawn = creationCharacteristics.Willpower;
        //get wound modifier from talentModifier
        let talentModifier = 0;
        Object.keys(talentCount).forEach((talent) => {
            if (talents[talent]) {
                if (talents[talent].modifier) talentModifier += ((talents[talent].modifier.strainThreshold ? talents[talent].modifier.strainThreshold : 0) * talentCount[talent]);
            }
        });
        return startingThreshold + startingBrawn + creationBrawn + talentModifier;
    }
);