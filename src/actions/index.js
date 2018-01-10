export const changeChannel = (state) => {
    return {
        type: 'Channel_Changed',
        payload: state,
    }
};

export const changeArchetype = (state) => {
    return {
        type: 'Archetype_Changed',
        payload: state,
    }
};

export const changeCareer = (state) => {
    return {
        type: 'Career_Changed',
        payload: state,
    }
};

export const changeCareerSkills = (state) => {
    return {
        type: 'Career_Skills_Changed',
        payload: state,
    }
};

export const changeSkill = (state) => {
    return {
        type: 'Skill_Changed',
        payload: state,
    }
};
export const changeSkillDice = (state) => {
    return {
        type: 'Skill_Dice_Changed',
        payload: state,
    }
};
