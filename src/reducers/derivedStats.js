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
        let startingThreshold = archetypes[archetype].woundThreshold;
        //get starting brawn
        let startingBrawn = archetypes[archetype].characteristics.Brawn;
        //get brawn added via creation
        let creationBrawn = creationCharacteristics.Brawn;
        //get wound modifier from talentModifier
        let talentModifier = talentCount.Toughened ? talentCount.Toughened * 2 : 0;

        return startingThreshold + startingBrawn + creationBrawn + talentModifier;
    }
);

export const calcStrain = createSelector(
    archetype, archetypes, creationCharacteristics, calcTalentCount,
    (archetype, archetypes, creationCharacteristics, talentCount) => {
        if (archetype===null) return 0;
        //get starting wounds
        let startingThreshold = archetypes[archetype].strainThreshold;
        //get starting brawn
        let startingBrawn = archetypes[archetype].characteristics.Willpower;
        //get brawn added via creation
        let creationBrawn = creationCharacteristics.Willpower;
        //get wound modifier from talentModifier
        let talentModifier = talentCount.Grit ? talentCount.Grit * 2 : 0;

        return startingThreshold + startingBrawn + creationBrawn + talentModifier;
    }
);

export const calcTotalSoak = createSelector(
    calcCharacteristics, calcTalentCount,
    (characteristics, talentCount) => {
        if (archetype===null) return 0;
        //get calcBrawn
        let Brawn = characteristics.Brawn;
        //get soak from armor
        let Armor = 0;
        //get soak from Enduring Talent
        let Enduring = talentCount.Enduring ? talentCount.Enduring : 0;

        return Brawn + Armor + Enduring;
    }
);

export const calcUsedXP = createSelector(
    masterTalents, creationCharacteristics, archetype, archetypes, masterSkills, careerSkills, calcArchetypeSkillRank, calcSkillRanks,
    (masterTalents, creationCharacteristics, archetype, archetypes, masterSkills, careerSkills, archetypeSkillRank, skillRanks) => {
        if (archetype===null) return 0;
        //talent XP
        let talentXP = 0;
        Object.keys(masterTalents).forEach((row)=>{
            Object.keys(masterTalents[row]).forEach((tier)=>{
                if (masterTalents[row][tier] !== '') talentXP = talentXP+(5*tier);
            })
        })
        //skillXP
        let skillXP = 0;
        Object.keys(masterSkills).forEach((skill)=>{
            let rank = skillRanks[skill];
            for(let i=(careerSkills.includes(skill) ? 1 : 0)+(archetypeSkillRank[skill] ? archetypeSkillRank[skill].rank : 0); rank>i; i++){
                skillXP += (((i + 1) * 5) + (careerSkills.includes(skill) ? 0 : 5));
            }
        })

        //characteristicXP
        let characteristicXP = 0;
        //starting characteristics
        Object.keys(creationCharacteristics).forEach((characteristic)=>{
            let points = creationCharacteristics[characteristic];
            for(let i=0; points>i; i++) {
                characteristicXP += (archetypes[archetype].characteristics[characteristic]+i+1)*10;
            }
        });

        return talentXP + skillXP + characteristicXP;
    }
);

export const calcTotalXP = createSelector(
    masterTalents, creationCharacteristics, archetype, archetypes, masterSkills,
    (masterTalents, creationCharacteristics, archetype, archetypes, masterSkills) => {
        if (archetype===null) return 0;
        let totalXP = 0;

        return totalXP;
    }
);