import { get } from 'lodash-es';
import { createSelector } from 'reselect';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const archetypeTalents = state => state.archetypeTalents;
const career = state => state.career;
const careers = state => state.careers;
const skills = state => state.skills;
const talents = state => state.talents;

export const careerCheck = state => calcCareerCheck(state);

const calcCareerCheck = createSelector(
    archetype,
    archetypes,
    archetypeTalents,
    skills,
    career,
    careers,
    talents,
    selectors.talentCount,
    (
        archetype,
        archetypes,
        archetypeTalents,
        skills,
        career,
        careers,
        talents,
        talentCount
    ) => {
        let careerSkillsList = {};
        //get careerSkills from career
        Object.keys(skills).forEach(skill => {
            careerSkillsList[skill] = false;
            const list = get(careers, `${career}.skills`, []);
            if (list.includes(skill)) careerSkillsList[skill] = true;

            //get careerSkills from archetype
            const archTalents = get(archetypes, `${archetype}.talents`, []);
            archTalents.forEach(talent => {
                const careerSkills = get(
                    archetypeTalents,
                    `${talent}.modifier.careerSkills`,
                    []
                );
                if (careerSkills.includes(skill))
                    careerSkillsList[skill] = true;
            });

            //get careerSkills from talents
            Object.keys(talentCount).forEach(talent => {
                const careerSkills = get(
                    talents,
                    `${talent}.modifier.careerSkills`,
                    []
                );
                if (careerSkills.includes(skill))
                    careerSkillsList[skill] = true;
            });
        });
        return careerSkillsList;
    }
);
