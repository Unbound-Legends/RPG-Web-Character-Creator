import {createSelector} from 'reselect';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const archetypeSpecialSkills = state => state.archetypeSpecialSkills;
const archetypeTalents = state => state.archetypeTalents;
const skills = state => state.skills;

export const archetypeSkillRank = (state) => calcArchetypeSkillRank(state);

const calcArchetypeSkillRank = createSelector(
	archetype, archetypes, archetypeTalents, skills, archetypeSpecialSkills,
	(archetype, archetypes, archetypeTalents, skills, archetypeSpecialSkills) => {
		if (!archetype || !archetypes[archetype]) return archetypeSpecialSkills;
		let archetypeSkillRank = {...archetypeSpecialSkills};
		//add any starting skills based on archetype skills
		if (!Object.keys(archetypes[archetype].skills).includes('choice')) {
			Object.keys(archetypes[archetype].skills).forEach(key => {
				if (Object.keys(skills).includes(key)) archetypeSkillRank[key] = {rank: archetypes[archetype].skills[key]};
			});
		}
		//add any starting skills based on archetype talents
		if (archetypes[archetype].talents) {
			archetypes[archetype].talents.forEach(talent => {
				if (archetypeTalents[talent]) {
					if (archetypeTalents[talent].modifier) {
						Object.keys(archetypeTalents[talent].modifier).forEach(key => {
							if (Object.keys(skills).includes(key) && Number.isInteger(archetypeTalents[talent].modifier[key])) {
								archetypeSkillRank[key] = {rank: archetypeTalents[talent].modifier[key]};
							}
						})
					}
				}
			});
		}
		return archetypeSkillRank;
	}
);