import {combineReducers} from 'redux';
import archetypes from './archetypes';
import careers from './careers';
import motivations from './motivations';
import skills from './skills';
import talents from './talents';
import * as derivedStats from './derivedStats';
import * as changeState from './changeState';

const allReducers = combineReducers({
    archetypes: archetypes,
    careers: careers,
    motivations: motivations,
    skills: skills,
    talents: talents,
    channel: changeState.channel,
    archetype: changeState.archetype,
    archetypeSpecialSkills: changeState.archetypeSpecialSkills,
    career: changeState.career,
    careerSkills: changeState.careerSkills,
    masterSkills: changeState.masterSkills,
    masterTalents: changeState.masterTalents,
    masterMotivations: changeState.masterMotivations,
    masterCharacteristics: changeState.masterCharacteristics,
});

export const characteristics = (state) => derivedStats.calcCharacteristics(state);
export const skillRanks = (state) => derivedStats.calcSkillRanks(state);
export const skillDice = (state) => derivedStats.calcSkillDice(state);
export const talentCount = (state) => derivedStats.calcTalentCount(state);
export const maxCareerSkills = (state) => derivedStats.calcMaxCareerSkills(state);
export const archetypeSkillRank = (state) => derivedStats.calcArchetypeSkillRank(state);

export default allReducers;
