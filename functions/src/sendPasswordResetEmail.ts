import { sendPasswordResetEmail as sendEmail } from '@firebase/auth';
import { auth } from './firebaseClient';
import * as logger from 'firebase-functions/logger';
import { onCall } from 'firebase-functions/v2/https';

export const sendPasswordResetEmail = onCall({ cors: true }, (request) => {
  return sendEmail(auth, request.data.email).catch((error) => {
    logger.error(error);
    if (error.code === 'auth/user-not-found') {
      logger.warn(`Password reset attempted for email: ${request.data.email}`);
      return;
    }
    throw error;
  });
});
