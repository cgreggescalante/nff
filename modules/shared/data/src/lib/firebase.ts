import { initializeApp } from '@firebase/app';
import { getAuth, connectAuthEmulator } from '@firebase/auth';
import { getFirestore, connectFirestoreEmulator } from '@firebase/firestore';
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyB85bcexC2tYSJSeaM1MBCtKHt-YyThEfU',
  authDomain: 'notfantasyfitness.firebaseapp.com',
  projectId: 'notfantasyfitness',
  storageBucket: 'notfantasyfitness.appspot.com',
  messagingSenderId: '308758238041',
  appId: '1:308758238041:web:1673a181976cafe3f8b248',
  measurementId: 'G-88NRQ90PTP',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const functions = getFunctions();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

const sendPasswordResetEmail = httpsCallable(
  functions,
  'sendPasswordResetEmail'
);

export { db, auth, functions, sendPasswordResetEmail };

export default app;
