// eslint-disable-next-line @nx/enforce-module-boundaries
import { onCall } from 'firebase-functions/v2/https';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as logger from 'firebase-functions/logger';
import { UserInfoService } from '@shared-data';

export const deleteUser = onCall((request) => {
  const { userId } = request.data;

  return UserInfoService.delete(userId).catch((error) => {
    logger.error('Error while deleting user:', error);
    return Promise.reject(error);
  });
});
