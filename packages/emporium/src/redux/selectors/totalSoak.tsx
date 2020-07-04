import { get } from 'lodash-es';
import { createSelector } from 'reselect';
import { characteristics } from './characteristics';
import { equipmentStats } from './equipmentStats';
import { talentCount } from './talentCount';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const archetypeTalents = state => state.archetypeTalents;
const talents = state => state.talents;
const armor = state => state.armor;

export const totalSoak = state => calcTotalSoak(state);

const calcTotalSoak = createSelector(
    archetype,
    archetypes,
    talents,
    armor,
    archetypeTalents,
    equipmentStats,
    characteristics,
    talentCount,
    (
        archetype,
        archetypes,
        talents,
        armor,
        archetypeTalents,
        equipmentStats,
        characteristics,
        talentCount
    ) => {
        const Brawn = get(characteristics, 'Brawn', 0);

        //get soak from armor and gear
        let Armor = 0;
        Object.keys(equipmentStats).forEach(key => {
            const carried = get(equipmentStats, `${key}.carried`, false),
                equipped = get(equipmentStats, `${key}.equipped`, false),
                type = get(equipmentStats, `${key}.type`, ''),
                soak = +get(equipmentStats, `${key}.soak`, 0),
                modifierSoak = +get(equipmentStats, `${key}.modifier.soak`, 0);

            if (type === 'armor' && equipped) {
                Armor += soak;
            }
            if (type === 'gear' && carried) {
                Armor += modifierSoak;
            }
        });

        //get soak from Enduring Talent
        let talentModifier = 0;
        Object.keys(talentCount).forEach(
            talent =>
                (talentModifier +=
                    +get(talents, `${talent}.modifier.soak`, 0) *
                    talentCount[talent])
        );

        //get soak from archetype
        let archetypeModifier = 0;
        const archTalents = get(archetypes, `${archetype}.talents`, []);
        archTalents.forEach(
            key =>
                (archetypeModifier += +get(
                    archetypeTalents,
                    `${key}.modifier.soak`,
                    0
                ))
        );

        return Brawn + Armor + talentModifier + archetypeModifier;
    }
);
