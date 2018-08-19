import {chars} from '../data/lists'

export const typeCheck = (type, data) => {
	if (!data) return false;
	switch (type) {
		case 'archetype':
		case 'career':
			if (typeof data !== 'string') return false;
			break;
		case 'currentStrain':
		case 'currentWound':
		case 'money':
		case 'earnedXP':
			if (typeof data !== 'number') return false;
			break;
		case 'careerSkillsRank':
		case 'critical':
		case 'setting':
			if (!Array.isArray(data)) return false;
			break;
		case 'archetypeSpecialSkills':
			if (typeof data !== 'object') return false;
			break;
		case 'creationCharacteristics':
			if (!chars.every(char => typeof data[char] === 'number')) return false;
			break;
		case 'description':
			if (!Object.keys(data).every(key => typeof data[key] === 'string')) return false;
			break;
		default:
			return true;
	}
	return true;
};

export const dataTypes = [
	'equipmentArmor',
	'equipmentGear',
	'equipmentWeapons',
	'masterMotivations',
	'masterSkills',
	'masterTalents',
	'misc',
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