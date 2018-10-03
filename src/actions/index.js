import clone from 'clone';
import merge from 'deepmerge';
import {uniq} from 'lodash-es';
import {customDataTypes, dataTypes} from '../data';
import {db} from '../firestoreDB';

export const changeData = (data, type, merge = true) => {
	return (dispatch, getState) => {
		const {user, character} = getState();
		const dbRef = db.doc(`users/${user}/data/characters/${character}/${type}/`);
		dbRef.set({data}, {merge: merge});
		dispatch({type: `${type}_Changed`, payload: data});
	}
};

export const changeCustomData = (data, type, merge = true) => {
	return (dispatch, getState) => {
		const {user} = getState();
		const dbRef = db.doc(`users/${user}/customData/${type}/`);
		dbRef.set({data}, {merge: merge});
		dispatch({type: `${type}_Changed`, payload: data});
	}
};

export const loadData = () => {
	return (dispatch, getState) => {
		dispatch({type: 'loadingData_Changed', payload: true});
		const {user, character} = getState();
		dataTypes.forEach((type, index) => {
			db.doc(`users/${user}/data/characters/${character}/${type}/`).onSnapshot(doc => {
				let payload = null;
				if (doc.exists) payload = doc.data().data;
				dispatch({type: `${type}_Changed`, payload: payload});
				if (index + 1 >= dataTypes.length) dispatch({type: 'loadingData_Changed', payload: false});
			}, err => {
				console.log(`Encountered error: ${err}`);
			});
		});
	}
};

export const loadCustomData = (setting = 'All', strict = false) => {
	return (dispatch, getState) => {
		dispatch({type: 'loadingCustomData_Changed', payload: true});
		const {user} = getState();
		customDataTypes.forEach((type, index) => {
			db.doc(`users/${user}/customData/${type}/`).onSnapshot(doc => {
				let payload = null;
				if (doc.exists) payload = doc.data().data;
				dispatch({type: `${type}_Changed`, payload: payload, setting: setting, strict: strict});
				if (index + 1 >= customDataTypes.length) dispatch({type: 'loadingCustomData_Changed', payload: false});
			}, err => {
				console.log(`Encountered error: ${err}`);
			});
		});
	}
};

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

export const changeUser = (state) => {
	return {type: 'User_Changed', payload: state}
};

export const changeCharacter = (state) => {
	return (dispatch) => {
		dispatch({type: 'character_Changed', payload: state});
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

export const changeCharacterName = (data) => {
	return (dispatch, getState) => {
		const user = getState().user;
		const character = getState().character;
		db.doc(`users/${user}/data/characterList`).update({[character]: data});
	}
};

export const changePrintContent = (state) => {
	return (dispatch) => {
		dispatch({type: 'printContent_Changed', payload: state});
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

export const importCustomData = (customDataSetImport) => {
	return (dispatch, getState) => {
		const user = getState().user;
		Object.keys(customDataSetImport).forEach(type => {
			const customType = getState()[type];
			let data = clone(customDataSetImport[type]);

			if (customType) {
				if (type === 'customSettings') data = merge(customType, data);
				else Object.keys(data).forEach(item => {
					if (customType[item]) {
						data[item] = merge(customType[item], data[item]);
						if (data[item].setting) data[item].setting = uniq(data[item].setting).sort();
					}
				});
			}
			db.doc(`users/${user}/customData/${type}/`).set({data}, {merge: true})
		});
	}
};