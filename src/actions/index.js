import {db} from '../firestore/db';

export const getData = (type, character) => {
    return (dispatch, getState) => {
        const user = getState().user;
        return db.doc(`users/${user}/characters/${character}/data/${type}`).onSnapshot(doc => {
      let payload = null;
      if (doc && doc.exists) payload = doc.data().data;
      dispatch({type: `${type}_Changed`, payload: payload})
    });
  }
};

export const getCharacterList = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        return db.doc(`users/${user}/characters/CharacterList`).onSnapshot(doc => {
            const character = getState().character;
            let payload = 0;
            if (doc && doc.exists) {
                payload = doc.data();
                dispatch({type: 'characterList_Changed', payload: payload});
            }
            if (!(doc.exists)) {
                db.collection(`users/${user}/characters`).add({name: 'newCharacter'}).then(ref => {
                    console.log('Added document with ID: ', ref.id);
                    let newObj = {};
                    newObj[ref.id] = {name: 'newCharacter'};
                    db.doc(`users/${user}/characters/CharacterList`).set(newObj);
                });
            }
            if (character===null && doc && doc.exists) {
                let payload2 = Object.keys(payload)[0];
                dispatch({type: 'character_Changed', payload: payload2})
            }
        });
    }
};

export const addCharacter = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        const characterList = getState().characterList;
        return db.collection(`users/${user}/characters`).add({name: 'newCharacter'}).then(ref => {
                console.log('Added document with ID: ', ref.id);
                let newObj = characterList===null ? {} : {...characterList};
                newObj[ref.id] = {name: 'newCharacter'};
                db.doc(`users/${user}/characters/CharacterList`).set(newObj);
        });
    }
};

export const changeCharacterName = (data) => {
    return (dispatch, getState) => {
        const user = getState().user;
        const character = getState().character;
        const dbRef = db.doc(`users/${user}/characters/CharacterList`);
        let newObj = {};
        newObj[`${character}.name`] = data;
        dbRef.update(newObj);
    }
};

export const deleteCharacter = (data) => {
    return (dispatch, getState) => {
        const user = getState().user;
        const character = getState().character;
        const dbRef = db.doc(`users/${user}/characters/CharacterList`);
        

        dispatch({type: 'character_Changed', payload: null})

    }
}

export const changeData = (data, type) => {
  return (dispatch, getState) => {
    const user = getState().user;
    const character = getState().character;
    const dbRef = db.doc(`users/${user}/characters/${character}/data/${type}`);
    dbRef.set({data});
  }
};

export const changeUser = (state) => {
    return {
        type: 'User_Changed',
        payload: state,
    }
};

export const changeCharacter = (state) => {
    return {
        type: 'character_Changed',
        payload: state,
    }
};
