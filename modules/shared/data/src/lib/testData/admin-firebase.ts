import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
  projectId: 'notfantasyfitness',
  credential: applicationDefault(),
});

const db = getFirestore(app);

export { db };

export default app;
