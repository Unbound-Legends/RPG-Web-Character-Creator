import * as initialState from './initialState';

export const user = (state = null, action) =>{
    if (action.type === 'User_Changed')  return action.payload;
    return state;
};

export const character = (state = null, action) =>{
    if (action.type === 'character_Changed') return action.payload;
    if (action.type === 'Initialize_State')  return null;
    return state;
};

export const characterList = (state = {}, action) =>{
    if (action.type === 'characterList_Changed') {
        if (action.payload===null) return {};
        else return action.payload;
    }
    return state;
};

export const description = (state = {...initialState.description}, action) =>{
    if (action.type === 'description_Changed') {
        if (action.payload === null) return {...initialState.description};
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return {...initialState.description};

    return state;
};

export const archetype = (state = null, action) => {
    if (action.type === 'archetype_Changed') return action.payload;
    if (action.type === 'Initialize_State')  return null;
    return state;
};

export const archetypeSpecialSkills = (state = {}, action) =>{
    if (action.type === 'archetypeSpecialSkills_Changed'){
        if (action.payload===null) return {};
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return {};
    return state;
};

export const career = (state = null, action) =>{
    if (action.type === 'career_Changed') return action.payload;
    if (action.type === 'Initialize_State')  return null;
    return state;
};

export const careerSkills = (state = [], action) =>{
    if (action.type === 'careerSkills_Changed') {
        if (action.payload===null) return [];
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return [];
    return state;
};

export const masterSkills = (state = {...initialState.masterSkills}, action) =>{
    if (action.type === 'masterSkills_Changed') {
        if (action.payload===null) return {...initialState.masterSkills};
        else return {...state, ...action.payload};
    }
    if (action.type === 'Initialize_State') {
        return {...initialState.masterSkills};
    }
    return state;
};

export const masterTalents = (state = {...initialState.masterTalents}, action) =>{
    if (action.type === 'masterTalents_Changed') {
        if (action.payload===null) return {...initialState.masterTalents};
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return {...initialState.masterTalents};
    return state;
};

export const masterMotivations = (state = {...initialState.masterMotivations}, action) =>{
    if (action.type === 'masterMotivations_Changed') {
        if (action.payload===null) return {...initialState.masterMotivations};
        else return {...state, ...action.payload};
    }
    if (action.type === 'Initialize_State')  return {...initialState.masterMotivations};
    return state;
};

export const creationCharacteristics = (state = {...initialState.creationCharacteristics}, action) =>{
  if (action.type === 'creationCharacteristics_Changed') {
      if (action.payload===null) return {...initialState.creationCharacteristics};
      else return action.payload;
  }
    if (action.type === 'Initialize_State')  return {...initialState.creationCharacteristics};
    return state;
};

export const talentModifiers = (state = {...initialState.talentModifiers}, action) =>{
    if (action.type === 'talentModifiers_Changed') {
        if (action.payload===null) return {...initialState.talentModifiers};
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return {...initialState.talentModifiers};
    return state;
};

export const currentWound = (state = 0, action) =>{
    if (action.type === 'currentWound_Changed') {
        if (action.payload===null) return 0;
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return 0;
    return state;
};

export const currentStrain = (state = 0, action) =>{
    if (action.type === 'currentStrain_Changed') {
        if (action.payload===null) return 0;
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return 0;
    return state;
};

export const critical = (state = [], action) =>{
    if (action.type === 'critical_Changed') {
        if (action.payload===null) return 0;
        else {
            action.payload.sort((a, b) =>  a - b);
            return action.payload;
        }
    }
    if (action.type === 'Initialize_State')  return [];
    return state;
};

export const equipment = (state = {}, action) =>{
    if (action.type === 'equipment_Changed'){
        if (action.payload===null) return {};
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return {};
    return state;
};

export const weapons = (state = {}, action) =>{
    if (action.type === 'weapons_Changed'){
        if (action.payload===null) return {};
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return {};
    return state;
};

export const armor = (state = {}, action) =>{
    if (action.type === 'armor_Changed'){
        if (action.payload===null) return {};
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return {};
    return state;
};

export const gear = (state = {}, action) =>{
    if (action.type === 'gear_Changed'){
        if (action.payload===null) return {};
        else return action.payload;
    }
    if (action.type === 'Initialize_State')  return {};
    return state;
};