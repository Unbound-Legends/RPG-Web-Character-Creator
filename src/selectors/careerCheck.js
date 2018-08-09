import {createSelector} from 'reselect';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const archetypeTalents = state => state.archetypeTalents;
const career = state => state.career;
const careers = state => state.careers;
const skills = state => state.skills;
const talents = state => state.talents;

export const careerCheck = (state) => calcCareerCheck(state);

const calcCareerCheck = createSelector(
	archetype, archetypes, archetypeTalents, skills, career, careers, talents, selectors.talentCount,
	(archetype, archetypes, archetypeTalents, skills, career, careers, talents, talentCount) => {
		let careerSkillsList = {};

		//get careerSkills from career
		Object.keys(skills).forEach(skill => {
			careerSkillsList[skill] = false;
			if (careers[career]) {
				if (careers[career].skills.includes(skill)) careerSkillsList[skill] = true;
			}
			//get careerSkills from archetype
			if (archetypes[archetype]) {
				if (archetypes[archetype].talents) {
					archetypes[archetype].talents.forEach(talent => {
						if (archetypeTalents[talent]) {
							if (archetypeTalents[talent].modifier) {
								if (archetypeTalents[talent].modifier.careerSkills) {
									if (archetypeTalents[talent].modifier.careerSkills.includes(skill)) careerSkillsList[skill] = true;
								}
							}
						}
					});
				}
			}
			//get careerSkills from talents
			Object.keys(talentCount).forEach(talent => {
				if (talents[talent]) {
					if (talents[talent].modifier) {
						if (talents[talent].modifier.careerSkills) {
							if (talents[talent].modifier.careerSkills.includes(skill)) careerSkillsList[skill] = true;
						}
					}
				}
			});
		});
		return careerSkillsList;
	}
);