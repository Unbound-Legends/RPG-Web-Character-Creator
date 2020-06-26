import { get } from 'lodash-es';
import { createSelector } from 'reselect';
import * as selectors from './';

const equipmentGear = state => state.equipmentGear;
const talents = state => state.talents;
const archetypeTalents = state => state.archetypeTalents;
const gear = state => state.gear;
const archetype = state => state.archetype;
const archetypes = state => state.archetypes;

export const encumbranceLimit = state => calcEncumbranceLimit(state);
const calcEncumbranceLimit = createSelector(
    selectors.characteristics,
    equipmentGear,
    gear,
    talents,
    archetypeTalents,
    selectors.talentCount,
    archetypes,
    archetype,
    (characteristics, equipmentGear, gear, talents, archetypeTalents, talentCount, archetypes, archetype) => {
        const Brawn = characteristics.Brawn;

        //get gear modifier
        const gearModifier = Object.keys(equipmentGear)
            .map(item => {
                const id = equipmentGear[item].id,
                    maxEncumbrance = get(
                        gear,
                        `${id}.modifier.maxEncumbrance`,
                        0
                    );
                if (equipmentGear[item].carried) return maxEncumbrance;
                else return 0;
            })
            .reduce((acc, val) => acc + val, 0);

        // Add archetype talents
        let archetypeTalentModifier = 0;
        if (archetype && archetypes?.[archetype]?.talents) {
            const selectedArchetypeTalents = archetypes?.[archetype]?.talents;
            archetypeTalentModifier = selectedArchetypeTalents
                .map(talent => {
                    return (
                        get(archetypeTalents, `${talent}.modifier.maxEncumbrance`, 0)
                    );
                })
                .reduce((acc, val) => acc + val, 0);
        }

        // Add other talents
        const talentsModifier = Object.entries(talentCount)
            .map(([talent, count]) => {
                return (
                    get(talents, `${talent}.modifier.maxEncumbrance`, 0) * count
                );
            })
            .reduce((acc, val) => acc + val, 0);

        return Brawn + gearModifier + talentsModifier + archetypeTalentModifier + 5;
    }
);
