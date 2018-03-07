import {db} from '../firestore/db';
import {dataTypes, customDataTypes} from '../data/lists';

export const loadCharacterList = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        db.doc(`users/${user}/data/characterList`).onSnapshot(doc => {
            const character = getState().character;
            let key;
            let newObj = null;
            if (!doc.exists) {
                key = Math.random().toString(36).substr(2, 16);
                newObj = {[key]: 'New Character'};
                db.doc(`users/${user}/data/characterList`).set(newObj);
            } else {
                dispatch({type: `characterList_Changed`, payload: doc.data()});
                if (!character) dispatch({type: `character_Changed`, payload: Object.keys(doc.data())[0]});
            }
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }
};

export const addCharacter = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        dispatch({type: 'loading_Changed', payload: true});
        let newCharacter = Math.random().toString(36).substr(2, 16);
        db.doc(`users/${user}/data/characterList`).update({[newCharacter]: 'New Character'});
        dispatch({type: `character_Changed`, payload: newCharacter});
    }
};

export const deleteCharacter = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        const character = getState().character;
        let characterList = {...getState().characterList};
        delete characterList[character];
        dataTypes.forEach((type) => db.doc(`users/${user}/data/characters/${character}/${type}`).delete());
        if (Object.keys(characterList).length === 0) {
            db.doc(`users/${user}/data/characterList`).delete();
        }
        else {
            db.doc(`users/${user}/data/characterList`).set(characterList);
            dispatch({type: `character_Changed`, payload: Object.keys(characterList)[0]});
        }

    }
};

export const importCharacter = (characterImport) => {
    return (dispatch, getState) => {
        const user = getState().user;
        dispatch({type: 'loading_Changed', payload: true});
        let key = Math.random().toString(36).substr(2, 16);
        db.doc(`users/${user}/data/characterList`).update({[key]: characterImport.name});
        Object.keys(characterImport).forEach((type) => {
            let data = characterImport[type];
            if (type !== 'name') db.doc(`users/${user}/data/characters/${key}/${type}/`).set({data});
        });
        dispatch({type: `character_Changed`, payload: key});
    }
};

export const changeCharacterName = (data) => {
    return (dispatch, getState) => {
        const user = getState().user;
        const character = getState().character;
        dispatch({type: `character_Changed`, payload: character});
        db.doc(`users/${user}/data/characterList`).update({[character]: data});
    }
};

export const loadData = () => {
    return (dispatch, getState) => {
        dispatch({type: 'loading_Changed', payload: true});
        const user = getState().user;
        const character = getState().character;
        dataTypes.forEach((type, index) => {
            db.doc(`users/${user}/data/characters/${character}/${type}/`).onSnapshot(doc => {
                if (doc.exists) dispatch({type: `${type}_Changed`, payload: doc.data().data});
                else dispatch({type: `${type}_Changed`, payload: null});
                if (index + 1 >= dataTypes.length) dispatch({type: 'loading_Changed', payload: false});
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
        });
    }
};

export const changeData = (data, type, merge = true) => {
    return (dispatch, getState) => {
        const user = getState().user;
        const character = getState().character;
        const dbRef = db.doc(`users/${user}/data/characters/${character}/${type}/`);
        dbRef.set({data}, {merge: merge});
        dispatch({type: `${type}_Changed`, payload: data})
    }
};

export const loadCustomDataList = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        db.doc(`users/${user}/data/customDataList`).onSnapshot(doc => {
            const customDataSet = getState().customDataSet;
            let key;
            let newObj = null;
            if (!doc.exists) {
                key = Math.random().toString(36).substr(2, 16);
                newObj = {[key]: 'New Dataset'};
                db.doc(`users/${user}/data/customDataList`).set(newObj);
            } else {
                if (!customDataSet) dispatch({type: `customDataSet_Changed`, payload: Object.keys(doc.data())[0]});
                dispatch({type: `customDataList_Changed`, payload: doc.data()});
            }
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }
};
export const loadCustomDataSet = () => {
    return (dispatch, getState) => {
        dispatch({type: 'loading_Changed', payload: true});
        const user = getState().user;
        const customDataSet = getState().customDataSet;
        customDataTypes.forEach((type, index) => {
            db.doc(`users/${user}/data/customDataSets/${customDataSet}/${type}/`).onSnapshot(doc => {
                if (doc.exists) dispatch({type: `${type}_Changed`, payload: doc.data().data});
                else dispatch({type: `${type}_Changed`, payload: null});
                if (index + 1 >= dataTypes.length) dispatch({type: 'loading_Changed', payload: false});
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
        });
    }
};

export const changeCustomData = (data, type, merge = true) => {
    return (dispatch, getState) => {
        const user = getState().user;
        const customDataSet = getState().customDataSet;
        const dbRef = db.doc(`users/${user}/data/customDataSets/${customDataSet}/${type}/`);
        dbRef.set({data}, {merge: merge});
        dispatch({type: `${type}_Changed`, payload: data})
    }
};


export const changeUser = (state) => {
    console.log(`UserID: ${state}`);
    return {type: 'User_Changed', payload: state}
};

export const changeCharacterList = (state) => {
    return {type: 'characterList_Changed', payload: state}
};

export const changeCharacter = (state) => {
    return (dispatch) => {
        dispatch({type: 'character_Changed', payload: state});
    }
};

export const fixDataStructure = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        db.doc(`users/${user}/characters/characterList/`).get()
            .then(doc => {
                if (doc.exists) {
                    let oldData = doc.data();
                    let characterList = {};
                    Object.keys(oldData).forEach((key, index) => {
                        characterList[key] = oldData[key].description ? oldData[key].description.name : 'New Character';
                        Object.keys(oldData[key]).forEach((type, index2) => {
                            let data = oldData[key][type];
                            if (type !== 'name') db.doc(`users/${user}/data/characters/${key}/${type}/`).set({data})
                                .then(() => {
                                    if (index2 + 1 >= Object.keys(oldData[key]).length) {
                                        if (index + 1 >= Object.keys(oldData).length) {
                                            db.doc(`users/${user}/data/characterList`).set(characterList);
                                            db.doc(`users/${user}/characters/characterList/`).delete();
                                        }
                                    }
                                });
                        });
                    });
                }
            })
            .then(() => {
                db.doc(`users/${user}/customData/data/`).get()
                    .then(doc => {
                        if (!doc.exists) {
                            dispatch({type: 'fix_Changed', payload: false});
                        } else {
                            let key = Math.random().toString(36).substr(2, 16);
                            db.doc(`users/${user}/data/customDataList`).set({[key]: 'New Dataset'});
                            let oldData = doc.data();
                            Object.keys(oldData).forEach((customSkill, index) => {
                                let data = oldData[customSkill];
                                db.doc(`users/${user}/data/customDataSets/${key}/${customSkill}/`).set({data});
                                if (index + 1 >= Object.keys(oldData).length) {
                                    db.doc(`users/${user}/customData/data/`).delete();
                                    dispatch({type: 'fix_Changed', payload: false});
                                }
                            });
                        }
                    });
            });


    }
};