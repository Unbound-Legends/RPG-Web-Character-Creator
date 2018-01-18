import * as initialState from './initialState';

export const channel = (state = null, action) =>{
  if (action.type === 'Channel_Changed') {
    return action.payload;
  }
  return state;
}

export const archetype = (state = null, action) => {
  if (action.type === 'archetype_Changed') {
    return action.payload;
  }
  return state;
}

export const archetypeSpecialSkills = (state = {}, action) =>{
    if (action.type === 'archetypeSpecialSkills_Changed' && action.payload!==null) return action.payload;
    return state;
}

export const career = (state = null, action) =>{
  if (action.type === 'career_Changed') return action.payload;
  return state;
}

export const careerSkills = (state = [], action) =>{
  if (action.type === 'careerSkills_Changed' && action.payload!==null)
    return action.payload;

  return state;
}

export const masterSkills = (state = initialState.masterSkills, action) =>{
  if (action.type === 'masterSkills_Changed' && action.payload!==null) return action.payload;
  return state;
}

export const masterTalents = (state = {...initialState.masterTalents}, action) =>{
  if (action.type === 'masterTalents_Changed' && action.payload!==null) return action.payload;
  return state;
}

export const masterMotivations = (state = {...initialState.masterMotivations}, action) =>{
  if (action.type === 'masterMotivations_Changed' && action.payload!==null) return {...state, ...action.payload};
  return state;
}

export const creationCharacteristics = (state = {...initialState.creationCharacteristics}, action) =>{
  if (action.type === 'creationCharacteristics_Changed' && action.payload!==null) return action.payload;
  return state;
}

export const talentModifiers = (state = initialState.talentModifiers, action) =>{
  if (action.type === 'talentModifiers_Changed' && action.payload!==null) return action.payload;
  return state;
}
