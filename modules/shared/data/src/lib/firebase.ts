import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from '@firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: false });
connectFirestoreEmulator(db, '127.0.0.1', 8080);

export { db, auth };

export default app;
