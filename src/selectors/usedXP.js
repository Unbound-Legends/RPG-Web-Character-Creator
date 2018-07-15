import {createSelector} from 'reselect';
import * as selectors from './';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const career = state => state.career;
const careers = state => state.careers;
const careerSkillsRank = state => state.careerSkillsRank;
const creationCharacteristics = state => state.creationCharacteristics;
const masterSkills = state => state.masterSkills;
const masterTalents = state => state.masterTalents;

export const usedXP = (state) => calcUsedXP(state);

const calcUsedXP = createSelector(
    masterTalents, creationCharacteristics, archetype, archetypes, masterSkills, career, careers, careerSkillsRank, selectors.archetypeSkillRank, selectors.skillRanks,
    (masterTalents, creationCharacteristics, archetype, archetypes, masterSkills, career, careers, careerSkillsRank, archetypeSkillRank, skillRanks) => {
        if (!archetype || !archetypes[archetype]) return 0;
        //talent XP
        let talentXP = 0;
        Object.keys(masterTalents).forEach((row) => {
            Object.keys(masterTalents[row]).forEach((tier) => {
                if (masterTalents[row][tier] !== '') talentXP = talentXP + (5 * tier);
            })
        });
        //skillXP
        let skillXP = 0;
        Object.keys(masterSkills).forEach((skill) => {
            let rank = skillRanks[skill];

            for (let i = (careerSkillsRank.includes(skill) ? 1 : 0) + (archetypeSkillRank[skill] ? archetypeSkillRank[skill].rank : 0); rank > i; i++) {
                skillXP += (i + 1) * 5;
            }
            if (masterSkills[skill].rank) skillXP += masterSkills[skill].rank * 5;
        });

        //characteristicXP
        let characteristicXP = 0;
        //starting characteristics
        Object.keys(creationCharacteristics).forEach((characteristic) => {
            let points = creationCharacteristics[characteristic];
            for (let i = 0; points > i; i++) {
                characteristicXP += (archetypes[archetype].characteristics[characteristic] + i + 1) * 10;
            }
        });

        return talentXP + skillXP + characteristicXP;
    }
);