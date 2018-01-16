import {database} from '../firestore/database';

export const getData = (channel, type) => {
  return dispatch => {
    return database.doc(`channels/${channel}/characters/characterA/data/${type}`).onSnapshot(doc => {
      let payload = null;
      if (doc && doc.exists) payload = doc.data().data;
      dispatch({type: `${type}_Changed`, payload: payload})
    });
  }
}

export const changeData = (data, type) => {
  return (dispatch, getState) => {
    const channel = getState().channel;
    const dbRef = database.doc(`channels/${channel}/characters/characterA/data/${type}`);
    dbRef.set({data});
  }
}

export const changeChannel = (state) => {
    return {
        type: 'Channel_Changed',
        payload: state,
    }
};
