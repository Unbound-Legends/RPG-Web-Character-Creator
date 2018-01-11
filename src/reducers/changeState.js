import {initialSkill} from './initialState';

export const channel = (state = null, action) =>{
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

export const masterSkills = (state = initialSkill, action) =>{
    switch (action.type) {
        case 'Master_Skills_Changed':
          return action.payload;
        default:
          return state;
    }
}
