import firebase from '@firebase/app';
import '@firebase/firestore';

console.log('FIRESTORE', process.env);

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId
};

console.log('Config:', process.env);

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {};
firestore.settings(settings);
firestore.enablePersistence().catch(console.error);

export const db = firebase.firestore();
