import React from 'react';


export const masterMotivations = {
    Desire: {}, Fear: {}, Strength: {}, Flaw: {}
};

export const creationCharacteristics = {
    Brawn: 0,
    Agility: 0,
    Intellect: 0,
    Cunning: 0,
    Willpower: 0,
    Presence: 0
};

export const talentModifiers = {
    Dedication: {},
};

export const description = {
    name: 'New Character',
    playerName: 'Enter Player Name',
    setting: '',
};

export function masterTalents() {
    let talent = {1: ''};
    return {1: talent};
}

export const printContent = <h1 className='text-left m-3' style={{whiteSpace: 'pre-line'}}>
    {`You savage. I made print button and you dare to use the print function in the browser?!?!\n
    For better results use the aforementioned print button.  It's located on the top-right of the characters tab.\n
    Can't I just hijack the print function and do it automatically, you ask?\n
    PROBABLY!\n\n
    -Sky`}
</h1>;
