import {database} from '../firestore/database';

export const getData = (type) => {
    return (dispatch, getState) => {
        const user = getState().user;
        return database.doc(`users/${user}/characters/characterA/data/${type}`).onSnapshot(doc => {
      let payload = null;
      if (doc && doc.exists) payload = doc.data().data;
      dispatch({type: `${type}_Changed`, payload: payload})
    });
  }
}

export const changeData = (data, type) => {
  return (dispatch, getState) => {
    const user = getState().user;
    const dbRef = database.doc(`users/${user}/characters/characterA/data/${type}`);
    dbRef.set({data});
  }
}

export const changeUser = (state) => {
    return {
        type: 'User_Changed',
        payload: state,
    }
};
