import * as initialState from './initialState';

export const channel = (state = '', action) =>{
    switch (action.type) {
        case 'Channel_Changed':
          return action.payload;
        default:
          return state;
    }
}

export const archetype = (state = null, action) =>{
    switch (action.type) {
        case 'Archetype_Changed':
          return action.payload;
        default:
          return state;
    }
}

export const archetypeSpecialSkills = (state = {}, action) =>{
    switch (action.type) {
        case 'Archetype_Special_Skills_Changed':
          return action.payload;
        default:
          return state;
    }
}

export const career = (state = null, action) =>{
    switch (action.type) {
        case 'Career_Changed':
          return action.payload;
        default:
          return state;
    }
}

export const careerSkills = (state = [], action) =>{
    switch (action.type) {
        case 'Career_Skills_Changed':
          return action.payload;
        default:
          return state;
    }
}

export const masterSkills = (state = initialState.masterSkills, action) =>{
    switch (action.type) {
        case 'Master_Skills_Changed':
          return action.payload;
        default:
          return state;
    }
}

export const masterTalents = (state = {...initialState.masterTalents}, action) =>{
    switch (action.type) {
        case 'Master_Talents_Changed':
          return action.payload;
        default:
          return state;
    }
}

export const talentSelection = (state = '', action) =>{
    switch (action.type) {
        case 'Talent_Selection_Changed':
          return action.payload;
        default:
          return state;
    }
}

export const masterMotivations = (state = {...initialState.masterMotivations}, action) =>{
    switch (action.type) {
        case 'Master_Motivations_Changed':
          return action.payload;
        default:
          return state;
    }
}
