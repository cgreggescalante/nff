/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { auth } from './firebaseClient';
import { sendPasswordResetEmail as sendEmail } from 'firebase/auth';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const sendPasswordResetEmail = onCall({ cors: true }, (request) => {
  return sendEmail(auth, request.data.email).catch((error) => {
    logger.error(error);
    if (error.code === 'auth/user-not-found') {
      logger.warn(`Password reset attempted for email: ${request.data.email}`);
      return;
    }
    throw error;
  });
});

export { sendPasswordResetEmail };
