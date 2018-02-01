import {combineReducers} from 'redux';
import archetypes from './archetypes';
import careers from './careers';
import motivations from './motivations';
import skills from './skills';
import talents from './talents';
import * as criticals from './criticals';
import * as derivedStats from './derivedStats';
import * as changeState from './changeState';

const allReducers = combineReducers({
    archetypes: archetypes,
    careers: careers,
    motivations: motivations,
    skills: skills,
    talents: talents,
    user: changeState.user,
    character: changeState.character,
    characterList: changeState.characterList,
    description : changeState.description,
    weapons: changeState.weapons,
    armor: changeState.armor,
    gear: changeState.gear,
    equipment: changeState.equipment,
    equipped: changeState.equipped,
    archetype: changeState.archetype,
    archetypeSpecialSkills: changeState.archetypeSpecialSkills,
    career: changeState.career,
    careerSkills: changeState.careerSkills,
    masterSkills: changeState.masterSkills,
    masterTalents: changeState.masterTalents,
    masterMotivations: changeState.masterMotivations,
    creationCharacteristics: changeState.creationCharacteristics,
    talentModifiers: changeState.talentModifiers,
    currentWound: changeState.currentWound,
    currentStrain: changeState.currentStrain,
    critical: changeState.critical,
});

export const characteristics = (state) => derivedStats.calcCharacteristics(state);
export const skillRanks = (state) => derivedStats.calcSkillRanks(state);
export const skillDice = (state) => derivedStats.calcSkillDice(state);
export const talentCount = (state) => derivedStats.calcTalentCount(state);
export const maxCareerSkills = (state) => derivedStats.calcMaxCareerSkills(state);
export const woundThreshold = (state) => derivedStats.calcWounds(state);
export const strainThreshold = (state) => derivedStats.calcStrain(state);
export const totalSoak = (state) => derivedStats.calcTotalSoak(state);
export const archetypeSkillRank = (state) => derivedStats.calcArchetypeSkillRank(state);
export const usedXP = (state) => derivedStats.calcUsedXP(state);
export const totalXP = (state) => derivedStats.calcUsedXP(state);
export const criticalText = (state) => criticals.criticalText(state);

export default allReducers;
