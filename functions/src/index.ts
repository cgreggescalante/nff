/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onUpload } from './onUpload';
import { onUploadDelete } from './onUploadDelete';
import { sendPasswordResetEmail } from './sendPasswordResetEmail';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export { onUpload, sendPasswordResetEmail, onUploadDelete };
