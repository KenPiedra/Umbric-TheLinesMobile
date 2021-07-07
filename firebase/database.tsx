import * as firebase from 'firebase';
import '@firebase/firestore';
import { firebaseConfig } from './config';

// Initialize the app

if (firebase.default.apps.length == 0) {
  console.log('Initializing Firebase database...');
  firebase.default.initializeApp(firebaseConfig);
}

export { firebase };
