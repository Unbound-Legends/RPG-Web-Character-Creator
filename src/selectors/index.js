//naked selectors
export {archetypeSkillRank} from './archetypeSkillRank';
export {criticalText} from './criticals';
export {talentCount} from './talentCount';
export {characteristics} from './characteristics';
export {equipmentStats} from './equipmentStats';
export {maxCareerSkills} from './maxCareerSkills';
export {totalXP} from './totalXP';

//compound selectors

//1st level selectors (only need naked selectors)
export {careerCheck} from './careerCheck';
export {encumbranceLimit} from './encumbranceLimit';
export {skillRanks} from './skillRanks';
export {strainThreshold} from './strainThreshold';
export {totalDefense} from './totalDefense';
export {totalEncumbrance} from './totalEncumbrance';
export {woundThreshold} from './woundThreshold';

//2nd level selectors (needs naked and 1st level selectors)
export {totalSoak} from './totalSoak';
export {usedXP} from './usedXP';

//3rd level selectors (needs naked, 1st and 2nd level selectors)
export {skillDice} from './skillDice';

//4th level selectors (needs naked, 1st, 2nd, 3rd level selectors)
export {gearDice} from './gearDice';


