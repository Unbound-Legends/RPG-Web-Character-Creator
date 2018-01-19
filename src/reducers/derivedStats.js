import {createSelector} from 'reselect';

const archetype = state => state.archetype;
const archetypes = state => state.archetypes;
const masterSkills = state => state.masterSkills;
const skills = state => state.skills;
const careerSkills = state => state.careerSkills;
const masterTalents = state => state.masterTalents;
const archetypeSpecialSkills = state => state.archetypeSpecialSkills;
const creationCharacteristics = state => state.creationCharacteristics;
const talentModifiers = state => state.talentModifiers;


export const calcCharacteristics = createSelector(
    archetype, archetypes, creationCharacteristics, talentModifiers,
    (archetype, archetypes, creationCharacteristics, talentModifiers) => {
      if (archetype===null) return creationCharacteristics;
      //get the starting characteristics
      let characteristics = {...archetypes[archetype].characteristics};
      //add the creation characteristics
      Object.keys(characteristics).forEach((characteristic)=>{
        characteristics[characteristic] += creationCharacteristics[characteristic];
      });
      //add dedications talents
      Object.values(talentModifiers.Dedication).forEach((characteristic)=>{
        characteristics[characteristic]++;
      });
      return characteristics;
    }
);

export const calcArchetypeSkillRank = createSelector(
  archetype, archetypes, skills, archetypeSpecialSkills,
  (archetype, archetypes, skills, archetypeSpecialSkills) => {
    if (archetype===null) return archetypeSpecialSkills;
    const archetypeSkills = {...archetypes[archetype].skills}
    let archetypeSkillRank = {};
    if (Object.keys(archetypeSkills).includes('choice')) return archetypeSpecialSkills;
    if (Object.keys(archetypeSkills).includes('careerSkills')) return archetypeSkillRank;
    if (Object.keys(skills).includes(Object.keys(archetypeSkills)[0])) {
      Object.keys(archetypeSkills).forEach((skillKey) => archetypeSkillRank[skillKey]={rank: archetypeSkills[skillKey]});
      return archetypeSkillRank;
    }
    return archetypeSpecialSkills;
  }
);

export const calcSkillRanks = createSelector(
  masterSkills, skills, careerSkills, calcArchetypeSkillRank,
  (masterSkills, skills, careerSkills, archetypeSkillRank) => {
    let skillRanks = {}
    Object.keys(skills).forEach((key)=>{
      skillRanks[key] = masterSkills[key].rank + (careerSkills.includes(key) ? 1 : 0) + (Object.keys(archetypeSkillRank).includes(key) ? archetypeSkillRank[key].rank : 0);
    });
    return skillRanks;
  }
);

export const calcSkillDice = createSelector(
  calcCharacteristics, calcSkillRanks, skills,
  (characteristics, skillRanks, skills) => {
    if (characteristics===null || characteristics===undefined) return '';
    let skillDice = {};
    Object.keys(skills).forEach((key)=>{
      let characteristic = characteristics[skills[key].characteristic];
      let rank = skillRanks[key];
      let dice, upgrade = 0;
      let text = '';
      if (characteristic>=rank) {
        dice=characteristic;
        upgrade=characteristic-rank;
      } else {
        dice=rank;
        upgrade=rank-characteristic;
      }
      for (let i=dice; i>0; i--) {
        if (i>upgrade) text += '[yellow] ';
        else text += '[green] ';
      }
      skillDice[key] = text;
    });
    return skillDice;
  }
);

export const calcTalentCount = createSelector(
  masterTalents,
  (masterTalents) => {
    let count = {};
    Object.keys(masterTalents).forEach((row)=>{
      Object.keys(masterTalents[row]).forEach((tier)=>{
        let talent = masterTalents[row][tier];
        if(talent!=='') count[talent] = count[talent] ? count[talent]+1 : 1;
      })
    })
    return count;
  }
);

export const calcMaxCareerSkills = createSelector(
  archetype, archetypes,
  (archetype, archetypes) => {
    if (archetype===null) return 4;
    const archetypeSkills = archetypes[archetype].skills
    let maxCareerSkills = Object.keys(archetypeSkills).includes('careerSkills') ? 6 : 4;
    return maxCareerSkills;
  }
);

export const calcWounds = createSelector(
    archetype, archetypes, creationCharacteristics, calcTalentCount,
    (archetype, archetypes, creationCharacteristics, talentCount) => {
        if (archetype===null) return 0;
        //get starting wounds
        let woundThreshold = archetypes[archetype].woundThreshold;
        //get starting brawn
        let startingBrawn = archetypes[archetype].characteristics.Brawn;
        //get brawn added via creation
        let creationBrawn = creationCharacteristics.Brawn;
        //get wound modifier from talentModifier
        let woundModifier = talentCount.Toughened ? talentCount.Toughened * 2 : 0;

        woundThreshold += startingBrawn + creationBrawn + woundModifier;
        return woundThreshold;
    }
);

export const calcStrain = createSelector(
    archetype, archetypes, creationCharacteristics, calcTalentCount,
    (archetype, archetypes, creationCharacteristics, talentCount) => {
        if (archetype===null) return 0;
        //get starting wounds
        let woundThreshold = archetypes[archetype].strainThreshold;
        //get starting brawn
        let startingBrawn = archetypes[archetype].characteristics.Willpower;
        //get brawn added via creation
        let creationBrawn = creationCharacteristics.Willpower;
        //get wound modifier from talentModifier
        let woundModifier = talentCount.Grit ? talentCount.Grit * 2 : 0;

        woundThreshold += startingBrawn+creationBrawn+woundModifier;

        return woundThreshold;
    }
);

export const calcTotalSoak = createSelector(
    calcCharacteristics, calcTalentCount,
    (characteristics, talentCount) => {
        if (archetype===null) return 0;
        let totalSoak = 0;
        //get calcBrawn
        let Brawn = characteristics.Brawn;
        //get soak from armor
        let Armor = 0;
        //get soak from Enduring Talent
        let Enduring = talentCount.Enduring ? talentCount.Enduring : 0;
        //add it all up
        totalSoak = Brawn + Armor + Enduring;

        return totalSoak;
    }
);
