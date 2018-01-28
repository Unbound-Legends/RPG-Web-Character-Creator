import {database} from '../firestore/database';

export const getData = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        return database.doc(`users/${user}/characters/characterList/`).onSnapshot(doc => {
            let character = getState().character;
            if (doc && doc.exists) {
                dispatch({type: `characterList_Changed`, payload: doc.data()});
                if (character===null) {
                    character = Object.keys(doc.data())[0];
                    dispatch({type: `character_Changed`, payload: character});
                }
                if (Object.keys(doc.data()).includes(character)) {
                    Object.keys(doc.data()[character]).forEach((type) => {
                        let data = getState()[type];
                        let payload = doc.data()[character][type] ? doc.data()[character][type] : null;
                        if (data !== payload) dispatch({type: `${type}_Changed`, payload: payload})
                    });
                } else {
                    character = Object.keys(doc.data())[0];
                    dispatch({type: `character_Changed`, payload: character});
                }
            } else {
                  let newObj = {};
                  newObj[Math.random().toString(36).substr(2, 16)] = {};
                  database.doc(`users/${user}/characters/characterList/`).set(newObj);
            }
        });
    }
};

export const addCharacter = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        let newObj = {};
        let newCharacter = Math.random().toString(36).substr(2, 16)
        newObj[newCharacter] = {};
        database.doc(`users/${user}/characters/characterList/`).update(newObj)
        dispatch({type: `character_Changed`, payload: newCharacter});
        dispatch({type: `Initialize_State`});
    }
};

export const deleteCharacter = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        const character = getState().character;
        let characterList = {...getState().characterList};
        delete characterList[character];
        dispatch({type: `Initialize_State`});
        if (Object.keys(characterList).length===0) {
            database.doc(`users/${user}/characters/characterList`).delete();
        }
        else database.doc(`users/${user}/characters/characterList/`).set(characterList);

    }
};

export const changeCharacter = (state) => {
    return (dispatch) => {
        dispatch({type: `Initialize_State`});
        dispatch({type: 'character_Changed', payload: state});
    }
};

export const changeData = (data, type) => {
    return (dispatch, getState) => {
        const user = getState().user;
        const character = getState().character;
        const dbRef = database.doc(`users/${user}/characters/characterList/`);
        dbRef.set ({[character]: {[type]: data}}, { merge: true });
    }
};

export const changeUser = (state) => {
    return {type: 'User_Changed', payload: state}
};
