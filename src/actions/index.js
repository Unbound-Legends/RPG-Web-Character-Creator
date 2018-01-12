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

export const changeMasterSkills = (state) => {
    return {
        type: 'Master_Skills_Changed',
        payload: state,
    }
};

export const changeMasterTalents = (state) => {
    return {
        type: 'Master_Talents_Changed',
        payload: state,
    }
};

export const changeTalentSelection = (state) => {
    return {
        type: 'Talent_Selection_Changed',
        payload: state,
    }
};
