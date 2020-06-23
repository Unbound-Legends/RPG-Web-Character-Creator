import { get } from 'lodash-es';
import { createSelector } from 'reselect';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const archetypeSpecialSkills = state => state.archetypeSpecialSkills;
const archetypeTalents = state => state.archetypeTalents;
const skills = state => state.skills;

export const archetypeSkillRank = state => calcArchetypeSkillRank(state);

const calcArchetypeSkillRank = createSelector(
    archetype,
    archetypes,
    archetypeTalents,
    skills,
    archetypeSpecialSkills,
    (
        archetype,
        archetypes,
        archetypeTalents,
        skills,
        archetypeSpecialSkills
    ) => {
        const archSkills = get(archetypes, `${archetype}.skills`, {}),
            talents = get(archetypes, `${archetype}.talents`, []);
        //add any starting skills based on archetype skills
        if (!Object.keys(archSkills).includes('choice')) {
            Object.keys(archSkills).forEach(key => {
                if (Object.keys(skills).includes(key))
                    archetypeSpecialSkills[key] = { rank: archSkills[key] };
            });
        }
        //add any starting skills based on archetype talents
        for (const talent of talents) {
            const modifier = get(archetypeTalents, `${talent}.modifier`, {});
            Object.keys(modifier).forEach(key => {
                if (
                    Object.keys(skills).includes(key) &&
                    Number.isInteger(modifier[key])
                ) {
                    archetypeSpecialSkills[key] = { rank: modifier[key] };
                }
            });
        }
        return archetypeSpecialSkills;
    }
);
