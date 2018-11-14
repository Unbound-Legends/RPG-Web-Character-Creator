import firebase from '@firebase/app';
import '@firebase/auth';
import clone from 'clone';
import merge from 'deepmerge';
import {uniq} from 'lodash-es';
import {customDataTypes, dataTypes, vehicleDataTypes} from '../data';
import {db} from '../firestoreDB';

export const writeUser = () => {
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			let object = {
				name: user.displayName,
				email: user.email,
				uid: user.uid,
				phone: user.phoneNumber,
				lastLogin: new Date(),
			};
			console.log(object);
			db.doc(`userDB/${user.uid}`).set(object).catch(console.error);

		}
	});
};

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
	return dispatch => {
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

export const addListData = (type) => {
	return (dispatch, getState) => db.collection(`${type}`).add({owner: getState().user, name: 'None'})
};
export const removeListData = (type, key) => {
	return () => {
		db.doc(`${type}/${key}/`).delete();
	}
};
export const loadList = (type) => {
	return (dispatch, getState) => {
		const user = getState().user;
		db.collection(type).where('owner', '==', user).onSnapshot(querySnapshot => {
			querySnapshot.docChanges().forEach(change => {
					if (change.type === 'added') {
						dispatch({type: `${type}List_Added`, payload: {[change.doc.id]: change.doc.data()}});
						dispatch({type: `${type}_Changed`, payload: change.doc.id});
					}
					if (change.type === 'removed') {
						let newID = '';
						if (querySnapshot.docs[0]) newID = querySnapshot.docs[0].id;
						dispatch({type: `${type}_Changed`, payload: newID});
						dispatch({type: `${type}List_Removed`, payload: change.doc.id});
					}
					if (change.type === 'modified') {
						dispatch({type: `${type}List_Modified`, payload: {[change.doc.id]: change.doc.data()}});
					}
				}
			);
		});
	}
};
export const changeListActive = (data, type) => {
	return {type: `${type}_Changed`, payload: data};
};
export const changeName = (type, key, data) => {
	return db.doc(`${type}/${key}/`).update({name: data});
};
export const changeDocData = (type, dataType, data) => {
	return (dispatch, getState) => {
		db.doc(`${type}/${getState()[type]}/data/${dataType}`).set({data});
	}
};
export const loadDoc = (type, key) => {
	return (dispatch) => {
		vehicleDataTypes.forEach(dataType => {
			if (key) {
				db.doc(`${type}/${key}/data/${dataType}`).onSnapshot(doc => {
					let data = null;
					if (doc.data()) data = doc.data().data;
					dispatch({type: `${dataType}_Changed`, payload: data});
				});
			} else dispatch({type: `${dataType}_Changed`, payload: null});

		})

	}
};


