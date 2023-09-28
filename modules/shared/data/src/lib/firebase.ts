// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB85bcexC2tYSJSeaM1MBCtKHt-YyThEfU",
  authDomain: "notfantasyfitness.firebaseapp.com",
  projectId: "notfantasyfitness",
  storageBucket: "notfantasyfitness.appspot.com",
  messagingSenderId: "308758238041",
  appId: "1:308758238041:web:1673a181976cafe3f8b248",
  measurementId: "G-88NRQ90PTP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)

export default app;