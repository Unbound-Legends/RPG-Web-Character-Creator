import {db} from '../firestore/db';
import {customDataTypes, dataTypes} from '../data';

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
                db.doc(`users/${user}/data/characterList`).set(newObj, {merge: true});
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
        dispatch({type: 'loading_Changed', payload: true});
        const user = getState().user;
        const character = getState().character;
        let characterList = {...getState().characterList};
        delete characterList[character];
        dataTypes.forEach((type) => db.doc(`users/${user}/data/characters/${character}/${type}`).delete());
        if (Object.keys(characterList).length === 0) {
            let newCharacter = Math.random().toString(36).substr(2, 16);
            db.doc(`users/${user}/data/characterList`).set({[newCharacter]: 'New Character'});
            dispatch({type: `character_Changed`, payload: newCharacter});
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
        let key = Math.random().toString(36).substr(2, 16);
        db.doc(`users/${user}/data/characterList`).update({[key]: characterImport.name});
        Object.keys(characterImport).forEach((type) => {
            let data = characterImport[type];
            if (type !== 'name') db.doc(`users/${user}/data/characters/${key}/${type}/`).set({data});
        });
    }
};

export const changeCharacterName = (data) => {
    return (dispatch, getState) => {
        const user = getState().user;
        const character = getState().character;
        db.doc(`users/${user}/data/characterList`).update({[character]: data});
    }
};

export const loadData = () => {
    return (dispatch, getState) => {
        dispatch({type: 'loadingData_Changed', payload: true});
        const user = getState().user;
        const character = getState().character;
        dataTypes.forEach((type, index) => {
            db.doc(`users/${user}/data/characters/${character}/${type}/`).onSnapshot(doc => {
                if (doc.exists) dispatch({type: `${type}_Changed`, payload: doc.data().data});
                else dispatch({type: `${type}_Changed`, payload: null});
                if (index + 1 >= dataTypes.length) dispatch({type: 'loadingData_Changed', payload: false});
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
                newObj = {[key]: 'New Custom Dataset'};
                db.doc(`users/${user}/data/customDataList`).set(newObj, {merge: true});
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
        dispatch({type: 'loadingCustomData_Changed', payload: true});
        const user = getState().user;
        const customDataSet = getState().customDataSet;
        customDataTypes.forEach((type, index) => {
            db.doc(`users/${user}/data/customDataSets/${customDataSet}/${type}/`).onSnapshot(doc => {
                if (doc.exists) dispatch({type: `${type}_Changed`, payload: doc.data().data});
                else dispatch({type: `${type}_Changed`, payload: null});
                if (index + 1 >= customDataTypes.length) dispatch({type: 'loadingCustomData_Changed', payload: false});
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
        });
    }
};

export const addCustomDataSet = () => {
    return (dispatch, getState) => {
        const user = getState().user;
        dispatch({type: 'loadingCustomData_Changed', payload: true});
        let key = Math.random().toString(36).substr(2, 16);
        db.doc(`users/${user}/data/customDataList`).update({[key]: 'New Custom Dataset'});
        dispatch({type: `customDataSet_Changed`, payload: key});
    }
};

export const deleteCustomDataSet = () => {
    return (dispatch, getState) => {
        dispatch({type: 'loadingCustomData_Changed', payload: true});
        const user = getState().user;
        const customDataSet = getState().customDataSet;
        let customDataList = {...getState().customDataList};
        delete customDataList[customDataSet];
        customDataTypes.forEach((type) => db.doc(`users/${user}/data/customDataSets/${customDataSet}/${type}/`).delete());
        if (Object.keys(customDataList).length === 0) {
            let key = Math.random().toString(36).substr(2, 16);
            db.doc(`users/${user}/data/customDataList`).set({[key]: 'New Custom Dataset'});
            dispatch({type: `customDataSet_Changed`, payload: key});
        }
        else {
            db.doc(`users/${user}/data/customDataList`).set(customDataList);
            dispatch({type: `customDataSet_Changed`, payload: Object.keys(customDataList)[0]});
        }

    }
};

export const changeCustomDataSet = (state) => {
    return (dispatch) => {
        dispatch({type: 'customDataSet_Changed', payload: state});
    }
};

export const changeCustomDataSetName = (data) => {
    return (dispatch, getState) => {
        const user = getState().user;
        const customDataSet = getState().customDataSet;
        db.doc(`users/${user}/data/customDataList`).update({[customDataSet]: data});
    }
};

export const importCustomDataSet = (customDataSetImport) => {
    return (dispatch, getState) => {
        const user = getState().user;
        let key = Math.random().toString(36).substr(2, 16);
        db.doc(`users/${user}/data/customDataList`).update({[key]: customDataSetImport.name});
        Object.keys(customDataSetImport).forEach((type) => {
            let data = customDataSetImport[type];
            if (type !== 'name') db.doc(`users/${user}/data/customDataSets/${key}/${type}/`).set({data});
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
    return {type: 'User_Changed', payload: state}
};

export const changeCharacter = (state) => {
    return (dispatch) => {
        dispatch({type: 'character_Changed', payload: state});
    }
};

export const changePrintContent = (state) => {
    return (dispatch) => {
        dispatch({type: 'printContent_Changed', payload: state});
    }
};