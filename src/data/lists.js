export const dataTypes = [
	'archetype',
	'archetypeSpecialSkills',
	'career',
	'careerSkillsRank',
	'creationCharacteristics',
	'critical',
	'currentStrain',
	'currentWound',
	'description',
	'earnedXP',
	'equipmentArmor',
	'equipmentGear',
	'equipmentWeapons',
	'masterMotivations',
	'masterSkills',
	'masterTalents',
	'misc',
	'money',
	'setting',
	'talentModifiers',
	'theme',
	'themes',
];

export const customDataTypes = [
	'customMotivations',
	'customSettings',
	'customSkills',
	'customTalents',
	'customWeapons',
	'customArmor',
	'customGear',
];

export const vehicleDataTypes = [
	'vehicleType', 'currentHullTrauma', 'currentSystemStrain', 'vehicleNotes'
];

export const chars = ['Brawn', 'Agility', 'Intellect', 'Cunning', 'Willpower', 'Presence'];

export const diceOrder = ['[yellow]', '[green]', '[blue]', '[red]', '[purple]', '[black]'];

export const diceNames = {
	'[blue]': {name: 'Boost Die'},
	'[black]': {name: 'Setback Die'},
	'[rmblack]': {name: 'Remove Setback Die'},
	'[success]': {name: 'Success'},
	'[advantage]': {name: 'Advantage'},
	'[failure]': {name: 'Failure'},
	'[threat]': {name: 'Threat'}
};

export const newData = ['customArchetypes',
	'customArchetypeTalents',
	'customCareers',
	'customVehicles'
];

export const modifiableAttributes = ['woundThreshold', 'strainThreshold', 'soak', 'meleeDefense', 'rangedDefense', 'defense', 'careerSkills'].sort();