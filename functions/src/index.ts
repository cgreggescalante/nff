// eslint-disable-next-line @nx/enforce-module-boundaries
import { onCall } from 'firebase-functions/v2/https';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as logger from 'firebase-functions/logger';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onCall((request) => {
  logger.info('Hello logs!', { structuredData: true });

  return 'Hello from Firebase!';
});

export { deleteUser } from './deleteUser';
