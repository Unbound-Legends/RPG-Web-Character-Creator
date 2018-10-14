import merge from 'deepmerge';
import * as archetypesCRB from './archetypes/CRB.json';
import * as archetypesROT from './archetypes/ROT.json';
import * as archetypeTalentsCRB from './archetypeTalents/CRB.json';
import * as archetypeTalentsROT from './archetypeTalents/ROT.json';
import * as armorCRB from './armor/CRB.json';
import * as armorROT from './armor/ROT.json';
import * as careersCRB from './careers/CRB.json';
import * as careersROT from './careers/ROT.json';
import * as craftsmanshipCRB from './craftsmanship/CRB.json';
import * as craftsmanshipROT from './craftsmanship/ROT.json';
import * as gearCRB from './gear/CRB.json';
import * as gearROT from './gear/ROT.json';
import * as talentsCRB from './talents/CRB.json';
import * as talentsROT from './talents/ROT.json';
import * as vehiclesCRB from './vehicles/CRB.json';
import * as vehiclesROT from './vehicles/ROT.json';
import * as weaponsCRB from './weapons/CRB.json';
import * as weaponsROT from './weapons/ROT.json';

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
