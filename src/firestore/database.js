import {config} from './config';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(config);
const database = firebase.firestore();

export default database;
