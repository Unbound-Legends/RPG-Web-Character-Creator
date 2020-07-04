import * as data from '@emporium/data';
import clone from 'clone';
import * as merge from 'deepmerge';
import { camelCase, get, omit, upperFirst } from 'lodash-es';
import * as initialState from './initialState';

//loading objects
const loadingReducer = (type, state, action) => {
    if (action.type === `${type}_Changed`) {
        return action.payload;
    }
    return state;
};

export const user = (state = null, action) =>
    loadingReducer('User', state, action);
export const character = (state = null, action) =>
    loadingReducer('character', state, action);
export const vehicle = (state = '', action) =>
    loadingReducer('vehicle', state, action);
export const loadingData = (state = true, action) =>
    loadingReducer('loadingData', state, action);
export const characterList = (state = null, action) =>
    loadingReducer('characterList', state, action);
export const printContent = (state = initialState.printContent, action) =>
    loadingReducer('printContent', state, action);

//character objects
const dataReducer = (type, state = clone(initialState[type]), action) => {
    if (action.type === `${type}_Changed`) {
        if (action.payload) {
            return action.payload;
        } else {
            return clone(initialState[type]);
        }
    }
    return state;
};

export const archetype = (state, action) =>
    dataReducer('archetype', state, action);
export const archetypeSpecialSkills = (state, action) =>
    dataReducer('archetypeSpecialSkills', state, action);
export const career = (state, action) => dataReducer('career', state, action);
export const careerSkillsRank = (state, action) =>
    dataReducer('careerSkillsRank', state, action);
export const creationCharacteristics = (state, action) =>
    dataReducer('creationCharacteristics', state, action);
export const critical = (state, action) =>
    dataReducer('critical', state, {
        type: action.type,
        payload: Array.isArray(action.payload)
            ? action.payload.sort((a, b) => a - b)
            : null
    });
export const currentHullTrauma = (state, action) =>
    dataReducer('currentHullTrauma', state, action);
export const currentSystemStrain = (state, action) =>
    dataReducer('currentSystemStrain', state, action);
export const currentStrain = (state, action) =>
    dataReducer('currentStrain', state, action);
export const currentWound = (state, action) =>
    dataReducer('currentWound', state, action);
export const description = (state, action) =>
    dataReducer('description', state, action);
export const earnedXP = (state, action) =>
    dataReducer('earnedXP', state, action);
export const equipmentArmor = (state, action) =>
    dataReducer('equipmentArmor', state, action);
export const equipmentGear = (state, action) =>
    dataReducer('equipmentGear', state, action);
export const equipmentWeapons = (state, action) =>
    dataReducer('equipmentWeapons', state, action);
export const masterMotivations = (state, action) =>
    dataReducer('masterMotivations', state, action);
export const masterSkills = (state, action) =>
    dataReducer('masterSkills', state, action);
export const masterTalents = (state, action) =>
    dataReducer('masterTalents', state, action);
export const misc = (state, action) => dataReducer('misc', state, action);
export const money = (state, action) => dataReducer('money', state, action);
export const aember = (state, action) => dataReducer('aember', state, action);
export const setting = (state, action) => dataReducer('setting', state, action);
export const talentModifiers = (state, action) =>
    dataReducer('talentModifiers', state, action);
export const theme = (state, action) => dataReducer('theme', state, action);
export const themes = (state, action) => dataReducer('themes', state, action);
export const vehicleNotes = (state, action) =>
    dataReducer('vehicleNotes', state, action);
export const vehicleType = (state, action) =>
    dataReducer('vehicleType', state, action);

// THE data model
export const motivation = (type, state, action, custom = false) => {
    const name = ['customArmor', 'customGear', 'customWeapons'].includes(type)
        ? camelCase(get(action, 'payload.name', 'unnamed'))
        : upperFirst(camelCase(get(action, 'payload.name', 'unnamed')));
    const id = get(action, 'payload.id');
    switch (action.type) {
        case `${type}_Added`:
            // @ts-ignore
            return merge(state, { [custom ? id : name]: action.payload });
        case `${type}_Modified`:
            const key = Object.keys(state).find(
                key => state[key].id === action.payload.id
            );
            // @ts-ignore
            return merge(omit(state, key), {
                [custom ? id : name]: action.payload
            });
        case `${type}_Removed`:
            return omit(
                state,
                Object.keys(state).find(key => state[key].id === action.payload)
            );
        default:
            return state;
    }
};

export const dataObjects = (type, state, action, custom = null) => {
    const name = ['customArmor', 'customGear', 'customWeapons'].includes(type)
            ? camelCase(get(action, 'payload.name', 'unnamed'))
            : upperFirst(camelCase(get(action, 'payload.name', 'unnamed'))),
        id = get(action, 'payload.id');
    switch (action.type) {
        case `${type}_Added`:
            // @ts-ignore
            return merge(state, { [custom ? id : name]: action.payload });
        case `${type}_Modified`:
            const key = Object.keys(state).find(
                key => state[key].id === action.payload.id
            );
            // @ts-ignore
            return merge(omit(state, key), {
                [custom ? id : name]: action.payload
            });
        case `${type}_Removed`:
            return omit(
                state,
                Object.keys(state).find(key => state[key].id === action.payload)
            );
        default:
            return state;
    }
};

export const customArchetypes = (state = {}, action) =>
    dataObjects('customArchetypes', state, action, 'customObject');
export const customArchetypeTalents = (state = {}, action) =>
    dataObjects('customArchetypeTalents', state, action, 'customObject');
export const customArmor = (state = {}, action) =>
    dataObjects('customArmor', state, action, 'customObject');
export const customCareers = (state = {}, action) =>
    dataObjects('customCareers', state, action, 'customObject');
export const customGear = (state = {}, action) =>
    dataObjects('customGear', state, action, 'customObject');
export const customMotivations = (state = {}, action) =>
    dataObjects('customMotivations', state, action, 'customObject');
export const customSettings = (state = {}, action) =>
    dataObjects('customSettings', state, action, 'customObject');
export const customSkills = (state = {}, action) =>
    dataObjects('customSkills', state, action, 'customObject');
export const customTalents = (state = {}, action) =>
    dataObjects('customTalents', state, action, 'customObject');
export const customVehicles = (state = {}, action) =>
    dataObjects('customVehicles', state, action, 'customObject');
export const customWeapons = (state = {}, action) =>
    dataObjects('customWeapons', state, action, 'customObject');

export const archetypes = (state = data.archetypes, action) =>
    dataObjects('customArchetypes', state, action);
export const archetypeTalents = (state = data.archetypeTalents, action) =>
    dataObjects('customArchetypeTalents', state, action);
export const careers = (state = data.careers, action) =>
    dataObjects('customCareers', state, action);
export const craftsmanship = (state = data.craftsmanship, action) =>
    dataObjects('customCraftsmanship', state, action);
export const armor = (state = data.armor, action) =>
    dataObjects('customArmor', state, action);
export const gear = (state = data.gear, action) =>
    dataObjects('customGear', state, action);
export const motivations = (state = data.motivations, action) =>
    dataObjects('customMotivations', state, action);
export const qualities = (state = data.qualities, action) =>
    dataObjects('customQualities', state, action);
export const settings = (state = data.settings, action) =>
    dataObjects('customSettings', state, action);
export const skills = (state = data.skills, action) =>
    dataObjects('customSkills', state, action);
export const talents = (state = data.talents, action) =>
    dataObjects('customTalents', state, action);
export const vehicles = (state = data.vehicles, action) =>
    dataObjects('customVehicles', state, action);
export const weapons = (state = data.weapons, action) =>
    dataObjects('customWeapons', state, action);

export const dataSets = (type, state = {}, action) => {
    switch (action.type) {
        case `${type}_Added`:
            // @ts-ignore
            return merge(state, action.payload);
        case `${type}_Modified`:
            // @ts-ignore
            return merge(state, { [action.payload.id]: action.payload });
        case `${type}_Removed`:
            return omit(state, action.payload);
        default:
            return state;
    }
};

export const vehicleDataSet = (state, action) =>
    dataSets('vehicleDataSet', state, action);
