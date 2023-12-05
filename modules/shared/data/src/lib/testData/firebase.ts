import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
  projectId: 'notfantasyfitness',
});

const db = getFirestore(app);

export { db };

export default app;
