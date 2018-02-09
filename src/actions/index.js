import {db} from '../firestore/db';


export const addCharacter = (character = {}) => {
    return (dispatch, getState) => {
        const user = getState().user;
        const characterList = {...getState().characterList};
        let newCharacter = Math.random().toString(36).substr(2, 16);
        characterList[newCharacter] = character;
        db.doc(`users/${user}/characters/characterList/`).update(characterList);
        dispatch({type: `characterList_Changed`, payload: characterList});
        dispatch({type: `character_Changed`, payload: newCharacter});
    }
};

export const deleteCharacter = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        const character = getState().character;
        let characterList = {...getState().characterList};
        delete characterList[character];
        if (Object.keys(characterList).length===0) {
            db.doc(`users/${user}/characters/characterList`).delete();
            window.location.reload();
        }
        else {
            db.doc(`users/${user}/characters/characterList/`).set(characterList);
            dispatch({type: `character_Changed`, payload: Object.keys(characterList)[0]});
            dispatch({type: `characterList_Changed`, payload: characterList});
        }

    }
};

export const changeCharacter = (state) => {
    return (dispatch) => {
        dispatch({type: `Initialize_State`});
        dispatch({type: 'character_Changed', payload: state});
    }
};

export const changeData = (data, type, merge = true) => {
    return (dispatch, getState) => {
        const user = getState().user;
        const character = getState().character;
        const dbRef = db.doc(`users/${user}/characters/characterList/`);
        dbRef.set ({[character]: {[type]: data}}, { merge: merge });
        dispatch({type: `${type}_Changed`, payload: data})
    }
};

export const loadData = (data, type) => {
    return {type: `${type}_Changed`, payload: data}
};

export const changeUser = (state) => {
    return {type: 'User_Changed', payload: state}
};

export const changeCharacterList = (state) => {
    return {type: 'characterList_Changed', payload: state}
};
