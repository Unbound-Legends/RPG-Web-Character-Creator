import database from './database';

export const getData = (channel, type) => {
  return dispatch => {
    return database.ref(`/${channel}/${type}`).once('value', snap => {
      dispatch({type: `${type}_Changed`, payload: snap.val()})
    });
  }
}

export const changeData = (data, type) => {
  return (dispatch, getState) => {
    const channel = getState().channel;
    const dbRef = database.ref(`/${channel}/`).child(`${type}`);
    dbRef.set(data)
    .then(() => {
      dispatch({type: `${type}_Changed`, payload: data})
    });
  }
}

export const changeChannel = (state) => {
    return {
        type: 'Channel_Changed',
        payload: state,
    }
};
