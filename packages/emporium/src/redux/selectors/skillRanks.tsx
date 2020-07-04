import { get } from 'lodash-es';
import { createSelector } from 'reselect';
import {archetypeSkillRank} from './archetypeSkillRank';

const careerSkillsRank = state => state.careerSkillsRank;
const masterSkills = state => state.masterSkills;
const skills = state => state.skills;

export const skillRanks = state => calcSkillRanks(state);

const calcSkillRanks = createSelector(
    masterSkills,
    skills,
    careerSkillsRank,
    archetypeSkillRank,
    (masterSkills, skills, careerSkillsRank, archetypeSkillRank) => {
        const skillRanks = {};
        Object.keys(skills).forEach(key => {
            const ranks = get(masterSkills, `${key}.rank`, 0),
                careerRanks = get(masterSkills, `${key}.careerRank`, 0),
                freeCareerSkillsRank = careerSkillsRank.includes(key) ? 1 : 0,
                freeArchetypeSkillRank = get(
                    archetypeSkillRank,
                    `${key}.rank`,
                    0
                );

            skillRanks[key] =
                ranks +
                careerRanks +
                freeCareerSkillsRank +
                freeArchetypeSkillRank;
        });

        return skillRanks;
    }
);
