import * as merge from 'deepmerge';
import { default as archetypesCRB } from './archetypes/CRB.json';
import { default as archetypesROT } from './archetypes/ROT.json';
import { default as archetypesSOTB } from './archetypes/SOTB.json';
import { default as archetypesKF } from './archetypes/KF.json';
import { default as archetypeTalentsCRB } from './archetypeTalents/CRB.json';
import { default as archetypeTalentsROT } from './archetypeTalents/ROT.json';
import { default as archetypeTalentsSOTB } from './archetypeTalents/SOTB.json';
import { default as archetypeTalentsKF } from './archetypeTalents/KF.json';
import { default as armorCRB } from './armor/CRB.json';
import { default as armorROT } from './armor/ROT.json';
import { default as armorSOTB } from './armor/SOTB.json';
import { default as armorKF } from './armor/KF.json';
import { default as careersCRB } from './careers/CRB.json';
import { default as careersROT } from './careers/ROT.json';
import { default as careersSOTB } from './careers/SOTB.json';
import { default as careersKF } from './careers/KF.json';
import { default as craftsmanshipCRB } from './craftsmanship/CRB.json';
import { default as craftsmanshipROT } from './craftsmanship/ROT.json';
import { default as craftsmanshipSOTB } from './craftsmanship/SOTB.json';
import { default as gearCRB } from './gear/CRB.json';
import { default as gearROT } from './gear/ROT.json';
import { default as gearSOTB } from './gear/SOTB.json';
import { default as gearKF } from './gear/KF.json';
import { default as talentsCRB } from './talents/CRB.json';
import { default as talentsEPG } from './talents/EPG.json';
import { default as talentsROT } from './talents/ROT.json';
import { default as talentsSOTB } from './talents/SOTB.json';
import { default as talentsKF } from './talents/KF.json';
import { default as vehiclesCRB } from './vehicles/CRB.json';
import { default as vehiclesROT } from './vehicles/ROT.json';
import { default as vehiclesSOTB } from './vehicles/SOTB.json';
import { default as vehiclesKF } from './vehicles/KF.json';
import { default as weaponsCRB } from './weapons/CRB.json';
import { default as weaponsROT } from './weapons/ROT.json';
import { default as weaponsSOTB } from './weapons/SOTB.json';
import { default as weaponsKF } from './weapons/KF.json';

export const archetypes = merge.all([
    archetypesCRB,
    archetypesROT,
    archetypesSOTB,
    archetypesKF
]);
export const archetypeTalents = merge.all([
    archetypeTalentsCRB,
    archetypeTalentsROT,
    archetypeTalentsSOTB,
    archetypeTalentsKF
]);
export const armor = merge.all([armorCRB, armorROT, armorSOTB, armorKF]);
export const careers = merge.all([
    careersCRB,
    careersROT,
    careersSOTB,
    careersKF
]);
export const craftsmanship = merge.all([
    craftsmanshipCRB,
    craftsmanshipROT,
    craftsmanshipSOTB
]);
export const gear = merge.all([gearCRB, gearROT, gearSOTB, gearKF]);
export const talents = merge.all([
    talentsCRB,
    talentsEPG,
    talentsROT,
    talentsSOTB,
    talentsKF
]);
export const weapons = merge.all([
    weaponsCRB,
    weaponsROT,
    weaponsSOTB,
    weaponsKF
]);
export const vehicles = merge.all([
    vehiclesCRB,
    vehiclesROT,
    vehiclesSOTB,
    vehiclesKF
]);

export { default as motivations } from './motivations.json';
export { default as qualities } from './qualities.json';
export { default as skills } from './skills.json';
export { default as settings } from './settings.json';
export {
    dataTypes,
    customDataTypes,
    vehicleDataTypes,
    chars,
    diceOrder,
    diceNames,
    modifiableAttributes
} from './lists';
