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
    archetype: changeState.archetype,
    archetypes: archetypes,
    archetypeSpecialSkills: changeState.archetypeSpecialSkills,
    armor: changeState.armor,
    career: changeState.career,
    careers: careers,
    careerSkills: changeState.careerSkills,
    character: changeState.character,
    characterList: changeState.characterList,
    creationCharacteristics: changeState.creationCharacteristics,
    critical: changeState.critical,
    currentStrain: changeState.currentStrain,
    currentWound: changeState.currentWound,
    description: changeState.description,
    earnedXP: changeState.earnedXP,
    gear: changeState.gear,
    masterMotivations: changeState.masterMotivations,
    masterSkills: changeState.masterSkills,
    masterTalents: changeState.masterTalents,
    money: changeState.money,
    motivations: motivations,
    skills: skills,
    talentModifiers: changeState.talentModifiers,
    talents: talents,
    user: changeState.user,
    weapons: changeState.weapons,
});

export const archetypeSkillRank = (state) => derivedStats.calcArchetypeSkillRank(state);
export const characteristics = (state) => derivedStats.calcCharacteristics(state);
export const criticalText = (state) => criticals.criticalText(state);
export const encumbranceLimit = (state) => derivedStats.calcEncumbranceLimit(state);
export const maxCareerSkills = (state) => derivedStats.calcMaxCareerSkills(state);
export const skillDice = (state) => derivedStats.calcSkillDice(state);
export const skillRanks = (state) => derivedStats.calcSkillRanks(state);
export const strainThreshold = (state) => derivedStats.calcStrain(state);
export const talentCount = (state) => derivedStats.calcTalentCount(state);
export const totalDefense = (state) => derivedStats.calcTotalDefense(state);
export const totalEncumbrance = (state) => derivedStats.calcTotalEncumbrance(state);
export const totalSoak = (state) => derivedStats.calcTotalSoak(state);
export const totalXP = (state) => derivedStats.calcTotalXP(state);
export const usedXP = (state) => derivedStats.calcUsedXP(state);
export const woundThreshold = (state) => derivedStats.calcWounds(state);


export default allReducers;
