import * as initialState from './initialState';
import * as data from '../data';
import merge from 'deepmerge';
import {upperFirst} from 'lodash';

const clone = require('clone');

//loading objects
const loadingReducer = (state, action, type) => {
    if (action.type === `${type}_Changed`) return action.payload;
    return state;
};

export const user = (state = null, action) => loadingReducer(state, action, 'User');
export const character = (state = null, action) => loadingReducer(state, action, 'character');
export const loadingData = (state = true, action) => loadingReducer(state, action, 'loadingData');
export const loadingCustomData = (state = true, action) => loadingReducer(state, action, 'loadingCustomData');
export const characterList = (state = null, action) => loadingReducer(state, action, 'characterList');
export const customDataList = (state = null, action) => loadingReducer(state, action, 'customDataList');
export const customDataSet = (state = null, action) => loadingReducer(state, action, 'customDataSet');
export const printContent = (state = initialState.printContent, action) => loadingReducer(state, action, 'printContent');

//character objects
const characterReducer = (state, action, type) => {
    if (action.type === `${type}_Changed`) {
        if (action.payload) return action.payload;
        else return clone(initialState[type]);
    }
    return state;
};

export const archetype = (state = clone(initialState.archetype), action) => characterReducer(state, action, 'archetype');
export const archetypeSpecialSkills = (state = clone(initialState.archetypeSpecialSkills), action) => characterReducer(state, action, 'archetypeSpecialSkills');
export const career = (state = clone(initialState.career), action) => characterReducer(state, action, 'career');
export const careerSkillsRank = (state = clone(initialState.careerSkillsRank), action) => characterReducer(state, action, 'careerSkillsRank');
export const creationCharacteristics = (state = clone(initialState.creationCharacteristics), action) => characterReducer(state, action, 'creationCharacteristics');
export const critical = (state = clone(initialState.critical), action) => characterReducer(state, {
    type: action.type,
    payload: Array.isArray(action.payload) ? action.payload.sort((a, b) => a - b) : null
}, 'critical');
export const currentStrain = (state = clone(initialState.currentStrain), action) => characterReducer(state, action, 'currentStrain');
export const currentWound = (state = clone(initialState.currentWound), action) => characterReducer(state, action, 'currentWounds');
export const description = (state = clone(initialState.description), action) => characterReducer(state, action, 'description');
export const earnedXP = (state = clone(initialState.earnedXP), action) => characterReducer(state, action, 'earnedXP');
export const equipmentArmor = (state = clone(initialState.equipmentArmor), action) => characterReducer(state, action, 'equipmentArmor');
export const equipmentGear = (state = clone(initialState.equipmentGear), action) => characterReducer(state, action, 'equipmentGear');
export const equipmentWeapons = (state = clone(initialState.equipmentWeapons), action) => characterReducer(state, action, 'equipmentWeapons');
export const masterMotivations = (state = clone(initialState.masterMotivations), action) => characterReducer(state, action, 'masterMotivations');
export const masterSkills = (state = clone(initialState.masterSkills), action) => characterReducer(state, action, 'masterSkills');
export const masterTalents = (state = clone(initialState.masterTalents), action) => characterReducer(state, action, 'masterTalents');
export const misc = (state = clone(initialState.misc), action) => characterReducer(state, action, 'misc');
export const money = (state = clone(initialState.money), action) => characterReducer(state, action, 'money');
export const talentModifiers = (state = clone(initialState.talentModifiers), action) => characterReducer(state, action, 'talentModifiers');

//database objects
const databaseReducer = (state, action, type) => {
    if (action.type === `custom${upperFirst(type)}_Changed`) {
        if (action.payload) return merge(data[type], action.payload);
        else return data[type];
    }
    return state;
};

export const archetypes = (state = data.archetypes, action) => databaseReducer(state, action, 'archetypes');
export const archetypeTalents = (state = data.archetypeTalents, action) => databaseReducer(state, action, 'archetypeTalents');
export const armor = (state = data.armor, action) => databaseReducer(state, action, 'armor');
export const careers = (state = data.careers, action) => databaseReducer(state, action, 'careers');
export const craftsmanship = (state = data.craftsmanship, action) => databaseReducer(state, action, 'craftsmanship');
export const gear = (state = data.gear, action) => databaseReducer(state, action, 'gear');
export const motivations = (state = data.motivations, action) => databaseReducer(state, action, 'motivations');
export const skills = (state = data.skills, action) => databaseReducer(state, action, 'skills');
export const qualities = (state = data.qualities, action) => databaseReducer(state, action, 'qualities');
export const talents = (state = data.talents, action) => databaseReducer(state, action, 'talents');
export const weapons = (state = data.weapons, action) => databaseReducer(state, action, 'weapons');

//custom data objects
const customDataReducer = (state, action, type) => {
    if (action.type === `${type}_Changed`) {
        if (action.payload) return action.payload;
        else return {};
    }
    return state;
};

export const customArchetypes = (state = {}, action) => customDataReducer(state, action, 'customArchetypes');
export const customArmor = (state = {}, action) => customDataReducer(state, action, 'customArmor');
export const customCareers = (state = {}, action) => customDataReducer(state, action, 'customCareers');
export const customGear = (state = {}, action) => customDataReducer(state, action, 'customGear');
export const customSkills = (state = {}, action) => customDataReducer(state, action, 'customSkills');
export const customMotivations = (state = {}, action) => customDataReducer(state, action, 'customMotivations');
export const customTalents = (state = {}, action) => customDataReducer(state, action, 'customTalents');
export const customWeapons = (state = {}, action) => customDataReducer(state, action, 'customWeapons');