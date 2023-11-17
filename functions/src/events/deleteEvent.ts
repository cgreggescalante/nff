// eslint-disable-next-line @nx/enforce-module-boundaries
import { onCall } from 'firebase-functions/v2/https';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as logger from 'firebase-functions/logger';
import { EventService } from '../../../modules/shared/data/src/index';

export const deleteEvent = onCall(async (request) => {
  const { eventId } = request.data;

  try {
    return await EventService.delete(eventId);
  } catch (error) {
    logger.error('Error while deleting Event:', error);
    return await Promise.reject(error);
  }
});
