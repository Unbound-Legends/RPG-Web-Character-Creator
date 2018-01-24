import {config} from './config';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(config);

export const database = firebase.firestore();


