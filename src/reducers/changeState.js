import * as initialState from './initialState';
import * as data from '../data';
import merge from 'deepmerge';

export const fix = (state = true, action) =>{
    if (action.type === 'fix_Changed')  return action.payload;
    return state;
};

export const user = (state = null, action) =>{
    if (action.type === 'User_Changed')  return action.payload;
    return state;
};

export const character = (state = null, action) =>{
    if (action.type === 'character_Changed') return action.payload;
    return state;
};

export const loadingData = (state = true, action) => {
    if (action.type === 'loadingData_Changed') return action.payload;
    return state;
};

export const loadingCustomData = (state = true, action) => {
    if (action.type === 'loadingCustomData_Changed') return action.payload;
    return state;
};

export const characterList = (state = null, action) =>{
    if (action.type === 'characterList_Changed') return action.payload;
    return state;
};

export const description = (state = {...initialState.description}, action) =>{
    if (action.type === 'description_Changed') {
        if (action.payload === null) return {...initialState.description};
        else return action.payload;
    }
    return state;
};

export const archetype = (state = null, action) => {
    if (action.type === 'archetype_Changed') {
        if (action.payload === '') return null;
        return action.payload;
    }
    return state;
};

export const archetypeSpecialSkills = (state = {}, action) =>{
    if (action.type === 'archetypeSpecialSkills_Changed'){
        if (action.payload===null) return {};
        else return action.payload;
    }
    return state;
};

export const career = (state = null, action) =>{
    if (action.type === 'career_Changed') return action.payload;
    return state;
};

export const careerSkillsRank = (state = [], action) =>{
    if (action.type === 'careerSkillsRank_Changed') {
        if (action.payload===null) return [];
        else return action.payload;
    }
    return state;
};

export const masterSkills = (state = {}, action) =>{
    if (action.type === 'masterSkills_Changed') {
        if (action.payload===null) return {};
        else return action.payload;
    }
    return state;
};

export const masterTalents = (state = {...initialState.masterTalents()}, action) => {
    if (action.type === 'masterTalents_Changed') {
        if (action.payload === null) return {...initialState.masterTalents()};
        else return action.payload;
    }
    return state;
};

export const masterMotivations = (state = {...initialState.masterMotivations}, action) =>{
    if (action.type === 'masterMotivations_Changed') {
        if (action.payload===null) return {...initialState.masterMotivations};
        else return {...state, ...action.payload};
    }
    return state;
};

export const creationCharacteristics = (state = {...initialState.creationCharacteristics}, action) =>{
  if (action.type === 'creationCharacteristics_Changed') {
      if (action.payload===null) return {...initialState.creationCharacteristics};
      else return action.payload;
  }
    return state;
};

export const talentModifiers = (state = {...initialState.talentModifiers}, action) =>{
    if (action.type === 'talentModifiers_Changed') {
        if (action.payload===null) return {...initialState.talentModifiers};
        else return action.payload;
    }
    return state;
};

export const currentWound = (state = 0, action) =>{
    if (action.type === 'currentWound_Changed') {
        if (action.payload===null) return 0;
        else return action.payload;
    }
    return state;
};

export const currentStrain = (state = 0, action) =>{
    if (action.type === 'currentStrain_Changed') {
        if (action.payload===null) return 0;
        else return action.payload;
    }
    return state;
};

export const critical = (state = [], action) =>{
    if (action.type === 'critical_Changed') {
        if (action.payload===null) return [];
        else {
            action.payload.sort((a, b) =>  a - b);
            return action.payload;
        }
    }
    return state;
};

export const money = (state = '', action) =>{
    if (action.type === 'money_Changed'){
        if (action.payload===null) return '';
        else return action.payload;
    }
    return state;
};

export const earnedXP = (state = 0, action) =>{
    if (action.type === 'earnedXP_Changed'){
        if (action.payload===null) return 0;
        else return action.payload;
    }
    return state;
};

export const weapons = (state = {}, action) =>{
    if (action.type === 'weapons_Changed'){
        if (action.payload===null) return {};
        else return action.payload;
    }
    return state;
};

export const armor = (state = {}, action) =>{
    if (action.type === 'armor_Changed'){
        if (action.payload===null) return {};
        else return action.payload;
    }
    return state;
};

export const gear = (state = {}, action) =>{
    if (action.type === 'gear_Changed') {
        if (action.payload===null) return {};
        else return action.payload;
    }
    return state;
};

export const customDataList = (state = null, action) =>{
    if (action.type === 'customDataList_Changed') {
        return action.payload;
    }
    return state;
};

export const customDataSet = (state = null, action) =>{
    if (action.type === 'customDataSet_Changed') return action.payload;
    return state;
};

export const customSkills = (state = {}, action) =>{
    if (action.type === 'customSkills_Changed') {
        if (action.payload === null) return {};
        else return action.payload;
    }
    return state;
};

export const customArchetypes = (state = {}, action) =>{
    if (action.type === 'customArchetypes_Changed') {
        if (action.payload === null) return {};
        else return action.payload;
    }
    return state;
};

export const customCareers = (state = {}, action) =>{
    if (action.type === 'customCareers_Changed') {
        if (action.payload === null) return {};
        else return action.payload;
    }
    return state;
};

export const customMotivations = (state = {}, action) =>{
    if (action.type === 'customMotivations_Changed') {
        if (action.payload === null) return {};
        else return action.payload;
    }
    return state;
};

export const customTalents = (state = {}, action) =>{
    if (action.type === 'customTalents_Changed') {
        if (action.payload === null) return {};
        else return action.payload;
    }
    return state;
};

export const skills = (state = data.skills, action) => {
    if (action.type === 'customSkills_Changed') {
        if (action.payload === null) return data.skills;
        else return merge(data.skills, action.payload);
    }
    return state;
};

export const archetypes = (state = data.archetypes, action) => {
    if (action.type === 'customArchetypes_Changed') {
        if (action.payload === null) return data.archetypes;
        else return merge(data.archetypes, action.payload);
    }
    return state;
};

export const careers = (state = data.careers, action) => {
    if (action.type === 'customCareers_Changed') {
        if (action.payload === null) return data.careers;
        else return merge(data.careers, action.payload);
    }
    return state;
};

export const motivations = (state = data.motivations, action) => {
    if (action.type === 'customMotivations_Changed') {
        if (action.payload === null) return data.motivations;
        else return merge(data.motivations, action.payload);
    }
    return state;
};

export const talents = (state = data.talents, action) => {
    if (action.type === 'customTalents_Changed') {
        if (action.payload === null) return data.talents;
        else return merge(data.talents, action.payload);
    }
    return state;
};

export const qualities = (state = data.qualities, action) => {
    if (action.type === 'customQualities_Changed') {
        if (action.payload === null) return data.qualities;
        else return merge(data.qualities, action.payload);
    }
    return state;
};