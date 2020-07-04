import firebase from '@firebase/app';
import '@firebase/firestore';

const config = {
    apiKey: process.env.NX_apiKey,
    authDomain: process.env.NX_authDomain,
    databaseURL: process.env.NX_databaseURL,
    projectId: process.env.NX_projectId,
    storageBucket: process.env.NX_storageBucket,
    messagingSenderId: process.env.NX_messagingSenderId
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {};
firestore.settings(settings);
firestore.enablePersistence().catch(console.error);

export const db = firebase.firestore();
