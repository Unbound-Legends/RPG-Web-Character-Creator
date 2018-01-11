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
    career: changeState.career,
    careerSkills: changeState.careerSkills,
    masterSkills: changeState.masterSkills,
});

export const characteristics = (state) => derivedStats.calcCharacteristics(state);
export const skillRanks = (state) => derivedStats.calcSkillRanks(state);
export const skillDice = (state) => derivedStats.calcSkillDice(state);


export default allReducers;
