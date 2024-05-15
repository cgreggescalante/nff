import { initializeApp, FirebaseApp } from '@firebase/app';
import { getAuth, connectAuthEmulator, Auth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB85bcexC2tYSJSeaM1MBCtKHt-YyThEfU',
  authDomain: 'notfantasyfitness.firebaseapp.com',
  projectId: 'notfantasyfitness',
  storageBucket: 'notfantasyfitness.appspot.com',
  messagingSenderId: '308758238041',
  appId: '1:308758238041:web:1673a181976cafe3f8b248',
  measurementId: 'G-88NRQ90PTP',
};

let app: FirebaseApp;
let auth: Auth;

export const getFirebaseClientAuth = (): Auth => {
  if (!app) app = initializeApp(firebaseConfig);

  if (!auth) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    auth = getAuth(app);
  }

  return auth;
};
