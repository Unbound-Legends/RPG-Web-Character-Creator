export const calcDice = (state) => {
  const {skills} = state;
  let characteristics = calcCharacteristics(state);
  let skillRanks = calcSkillRanks(state);
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

export const calcCharacteristics = (state) => {
  const {archetype, archetypes} = state;
  if (archetype===null) return null;
  let characteristics = archetypes[archetype].characteristics;
  return characteristics;
}

export const calcSkillRanks = (state) => {
  const {skills, skill, careerSkills} = state;
  let skillRanks = {}
  Object.keys(skills).forEach((key)=>{
    skillRanks[key] = skill[key].rank + (careerSkills !== null ? (careerSkills[key] ? 1 : 0 ) : 0);
  });
  return skillRanks;
}
