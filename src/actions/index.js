import firebase from '@firebase/app';
import '@firebase/auth';
import clone from 'clone';
import merge from 'deepmerge';
import {uniq, upperFirst} from 'lodash-es';
import {customDataTypes, dataTypes, newData, vehicleDataTypes} from '../data';
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
		let unsub = {};
		dataTypes.forEach((type, index) => {
			unsub[type] = db.doc(`users/${user}/data/characters/${character}/${type}/`).onSnapshot(doc => {
				let payload = null;
				if (doc.exists) payload = doc.data().data;
				dispatch({type: `${type}_Changed`, payload: payload});
				if (index + 1 >= dataTypes.length) dispatch({type: 'loadingData_Changed', payload: false});
			}, error => {
				if (!getState().user) unsub[type]();
				else console.error(error);
			});
		});
	}
};

export const loadCustomData = (setting = 'All') => {
	return (dispatch, getState) => {
		dispatch({type: 'loadingCustomData_Changed', payload: true});
		const {user} = getState();
		let unsub = {};
		customDataTypes.forEach((type, index) => {
			unsub[type] = db.doc(`users/${user}/customData/${type}/`).onSnapshot(doc => {
				let payload = null;
				if (doc.exists) payload = doc.data().data;
				dispatch({type: `${type}_Changed`, payload, setting});
				if (index + 1 >= customDataTypes.length) dispatch({type: 'loadingCustomData_Changed', payload: false});
			}, error => {
				if (!getState().user) unsub[type]();
				else console.error(error);
			});
		});
	}
};

export const loadCharacterList = () => {
	return (dispatch, getState) => {
		const user = getState().user;
		let unsub = db.doc(`users/${user}/data/characterList`).onSnapshot(doc => {
			const character = getState().character;
			let key;
			let newObj = null;
			if (!doc.exists) {
				key = Math.random().toString(36).substr(2, 16);
				newObj = {[key]: 'New Character'};
				db.doc(`users/${user}/data/characterList`).set(newObj, {merge: true});
			} else {
				let list = Object.keys(doc.data()).sort((a, b) => doc.data()[a] < doc.data()[b] ? -1 : (doc.data()[a] > doc.data()[b] ? 1 : 0));
				dispatch({type: `characterList_Changed`, payload: doc.data()});
				if (!character) dispatch({type: `character_Changed`, payload: list[0]});
			}
		}, error => {
			if (!getState().user) unsub();
			else console.error(error);
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
		dataTypes.forEach(type => db.doc(`users/${user}/data/characters/${character}/${type}`).delete());
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

export const importCharacter = (characterImport, user) => {
	return () => {
		let key = Math.random().toString(36).substr(2, 16);
		db.doc(`users/${user}/data/characterList`).update({[key]: characterImport.name});
		Object.keys(characterImport).forEach(type => {
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
			if (type === 'customArchetypes') Object.values(data).forEach(item => {
				let {characteristics, ...obj} = item;
				let final = {write: [getState().user], read: [getState().user], name: 'none'};
				if (item) final = {...final, ...obj, ...characteristics};
				db.collection(`${type}DB`).add(final).catch(console.error);
			});
			else db.doc(`users/${user}/customData/${type}/`).set({data}, {merge: true})
		});
	}
};

//new database structure stuffs
export const addDataSet = (type, data) => {
	return (dispatch, getState) => {
		let final = {write: [getState().user], read: [getState().user], name: 'none'};
		if (data) final = {...final, ...data};
		db.collection(`${type}DB`).add(final).catch(console.error);
	}
};

export const removeDataSet = (type, key) => {
	return () => {
		let list;
		if (type === 'vehicle') list = vehicleDataTypes;
		if (list) list.forEach(dataType => db.doc(`${type}DB/${key}/data/${dataType}`).delete());
		db.doc(`${type}DB/${key}/`).delete();
	}
};

export const modifyDataSet = (type, {id, ...data}) => {
	return () => db.doc(`${type}DB/${id}/`).set({...data}, {merge: true});
};

export const loadDataSets = () => {
	return (dispatch, getState) => {
		const user = getState().user;
		newData.forEach(type => {
			db.collection(`${type}DB`).where('read', 'array-contains', user).onSnapshot(querySnapshot => {
				querySnapshot.docChanges().forEach(change => {
					if (type.includes('custom')) {
						switch (change.type) {
							case 'added':
							case 'modified':
								dispatch({type: `${type}_${upperFirst(change.type)}`, payload: {...change.doc.data(), id: change.doc.id}});
								break;
							case 'removed':
								dispatch({type: `${type}_Removed`, payload: change.doc.id});
								break;
							default:
								break;
						}
					}
					else {
						switch (change.type) {
							case 'added':
								dispatch({type: `${type}DataSet_Modified`, payload: {[change.doc.id]: change.doc.data()}});
								dispatch({type: `${type}_Changed`, payload: change.doc.id});
								break;
							case 'removed':
								dispatch({type: `${type}DataSet_Removed`, payload: change.doc.id});
								dispatch({type: `${type}_Changed`, payload: querySnapshot.docs[0] ? querySnapshot.docs[0].id : ''});
								break;
							case 'modified':
								console.log(change);
								dispatch({type: `${type}DataSet_Modified`, payload: {[change.doc.id]: change.doc.data()}});
								break;
							default:
								break;
						}
						}
					}
				);
			}, console.error);
		});
	}
};

export const changeReduxState = (data, type) => {
	return {type: `${type}_Changed`, payload: data};
};

export const changeFieldData = (type, key, data, field) => {
	return () => db.doc(`${type}DB/${key}/`).update({[field]: data});
};

export const changeDocData = (type, key, dataType, data) => {
	return () => db.doc(`${type}DB/${key}/data/${dataType}`).set({data});
};

export const loadDoc = (type, key) => {
	return dispatch => {
		vehicleDataTypes.forEach(dataType => {
			if (key) {
				db.doc(`${type}DB/${key}/data/${dataType}`).onSnapshot(doc => {
					let data = null;
					if (doc.data()) data = doc.data().data;
					dispatch({type: `${dataType}_Changed`, payload: data});
				}, console.error);
			} else dispatch({type: `${dataType}_Changed`, payload: null});

		})

	}
};


