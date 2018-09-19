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
	'strict',
	'talentModifiers',
];

export const customDataTypes = [
	'customArchetypes',
	'customArchetypeTalents',
	'customCareers',
	'customMotivations',
	'customSettings',
	'customSkills',
	'customTalents',
	'customWeapons',
	'customArmor',
	'customGear',
];

export const chars = ['Brawn', 'Agility', 'Intellect', 'Cunning', 'Willpower', 'Presence'];

export const diceNames = {
	'[blue]': {name: 'Boost Die'},
	'[black]': {name: 'Setback Die'},
	'[rmblack]': {name: 'Remove Setback Die'},
	'[success]': {name: 'Success'},
	'[advantage]': {name: 'Advantage'},
	'[failure]': {name: 'Failure'},
	'[threat]': {name: 'Threat'}
};

export const modifiableAttributes = ['woundThreshold', 'strainThreshold', 'soak', 'meleeDefense', 'rangedDefense', 'defense', 'careerSkills'].sort();