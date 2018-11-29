import merge from 'deepmerge';
import {default as archetypesCRB} from './archetypes/CRB.json';
import {default as archetypesROT} from './archetypes/ROT.json';
import {default as archetypeTalentsCRB} from './archetypeTalents/CRB.json';
import {default as archetypeTalentsROT} from './archetypeTalents/ROT.json';
import {default as armorCRB} from './armor/CRB.json';
import {default as armorROT} from './armor/ROT.json';
import {default as careersCRB} from './careers/CRB.json';
import {default as careersROT} from './careers/ROT.json';
import {default as craftsmanshipCRB} from './craftsmanship/CRB.json';
import {default as craftsmanshipROT} from './craftsmanship/ROT.json';
import {default as gearCRB} from './gear/CRB.json';
import {default as gearROT} from './gear/ROT.json';
import {default as talentsCRB} from './talents/CRB.json';
import {default as talentsROT} from './talents/ROT.json';
import {default as vehiclesCRB} from './vehicles/CRB.json';
import {default as vehiclesROT} from './vehicles/ROT.json';
import {default as weaponsCRB} from './weapons/CRB.json';
import {default as weaponsROT} from './weapons/ROT.json';

export const archetypes = merge.all([archetypesCRB, archetypesROT]);
export const archetypeTalents = merge.all([archetypeTalentsCRB, archetypeTalentsROT]);
export const armor = merge.all([armorCRB, armorROT]);
export const careers = merge.all([careersCRB, careersROT]);
export const craftsmanship = merge.all([craftsmanshipCRB, craftsmanshipROT]);
export const gear = merge.all([gearCRB, gearROT]);
export const talents = merge.all([talentsCRB, talentsROT]);
export const weapons = merge.all([weaponsCRB, weaponsROT]);
export const vehicles = merge.all([vehiclesCRB, vehiclesROT]);


export {default as motivations} from './motivations.json';
export {default as qualities} from './qualities.json';
export {default as skills} from './skills.json';
export {default as settings} from './settings.json';
export {dataTypes, customDataTypes, vehicleDataTypes, chars, diceNames, modifiableAttributes} from './lists';
