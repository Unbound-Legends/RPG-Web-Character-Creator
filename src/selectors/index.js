//naked selectors
export {archetypeSkillRank} from './archetypeSkillRank';
export {criticalText} from './criticals';
export {talentCount} from './talentCount';
export {equipmentStats} from './equipmentStats';
export {maxCareerSkills} from './maxCareerSkills';
export {totalXP} from './totalXP';

//compound selectors

//1st level selectors (only need naked selectors)
export {characteristics} from './characteristics';
export {careerCheck} from './careerCheck';
export {totalDefense} from './totalDefense';
export {totalEncumbrance} from './totalEncumbrance';
export {skillRanks} from './skillRanks';

//2nd level selectors (needs naked and 1st level selectors)
export {strainThreshold} from './strainThreshold';
export {encumbranceLimit} from './encumbranceLimit';
export {totalSoak} from './totalSoak';
export {usedXP} from './usedXP';
export {woundThreshold} from './woundThreshold';

//3rd level selectors (needs naked, 1st and 2nd level selectors)
export {skillDice} from './skillDice';

//4th level selectors (needs naked, 1st, 2nd, 3rd level selectors)
export {gearDice} from './gearDice';


