import { get } from 'lodash-es';
import { createSelector } from 'reselect';
import { diceOrder } from '../data';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const archetypeTalents = state => state.archetypeTalents;
const skills = state => state.skills;
const talents = state => state.talents;

export const skillDice = state => calcSkillDice(state);

const calcSkillDice = createSelector(
    selectors.characteristics,
    selectors.skillRanks,
    skills,
    talents,
    selectors.talentCount,
    archetype,
    archetypes,
    archetypeTalents,
    selectors.equipmentStats,
    (
        characteristics,
        skillRanks,
        skills,
        talents,
        talentCount,
        archetype,
        archetypes,
        archetypeTalents,
        equipmentStats
    ) => {
        let skillDice = {};
        Object.keys(skills).forEach(key => {
            const characteristic = get(
                characteristics,
                get(skills, `${key}.characteristic`),
                0
            );
            let rank = get(skillRanks, key, 0),
                final = [];

            //add equipment modifier to skill rank
            Object.keys(equipmentStats).forEach(key2 => {
                const item = equipmentStats[key2],
                    modifier = get(item, 'modifier', {}),
                    carried = get(item, 'carried', false),
                    equipped = get(item, 'equipped', false),
                    type = get(item, 'type', '');
                if (modifier && carried && (equipped || type !== 'armor')) {
                    Object.keys(modifier).forEach(type => {
                        if (key === type && Array.isArray(modifier[type])) {
                            modifier[type].forEach(text => {
                                if (text.includes('Free Rank'))
                                    rank += +text.replace(/\D/g, '');
                                else final.push(text);
                            });
                        }
                    });
                }
            });

            //get upgrades
            const dice = characteristic > rank ? characteristic : rank,
                upgrade = characteristic >= rank ? rank : characteristic;

            [...Array(dice)].forEach((_, i) => {
                if (upgrade > i) final.push('[yellow]');
                else final.push('[green]');
            });

            //get any bonus dice from talents
            Object.keys(talentCount).forEach(talent => {
                const modifier = get(talents, `${talent}.modifier.${key}`, []);
                [...Array(talentCount[talent])].forEach(() =>
                    modifier.forEach(die => final.push(`${die}`))
                );
            });

            //get dice from archetype talents
            const archTalent = get(archetypes, `${archetype}.talents`, []);
            archTalent.forEach(talent => {
                const modifier = get(
                    archetypeTalents,
                    `${talent}.modifier.${key}`,
                    ''
                );
                if (!Number.isInteger(modifier)) final.push(modifier);
            });

            //sort and join the dice for each skill
            skillDice[key] = final
                .sort((a, b) => diceOrder.indexOf(a) - diceOrder.indexOf(b))
                .join(' ');
        });

        return skillDice;
    }
);
