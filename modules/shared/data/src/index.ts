import UploadService from './lib/services/UploadService';
import UserInfoService from './lib/services/UserInfoService';
import UploadConverter from './lib/converters/UploadConverter';
import EntryService from './lib/services/EntryService';
import TeamService from './lib/services/TeamService';

// Models
export type { UserInfo } from './lib/models/UserInfo';
export type { Upload } from './lib/models/Upload';

export type { Event } from './lib/models/Event';
export type { EventWithUid } from './lib/models/Event';

export type { Entry } from './lib/models/Entry';
export type { WorkoutType } from './lib/models/WorkoutType';
export type { WorkoutTypeToNumber } from './lib/models/WorkoutType';
export { emptyWorkoutTypeToNumber } from './lib/models/WorkoutType';

export type { Team } from './lib/models/Team';
export type { TeamWithUid } from './lib/models/Team';

export { WorkoutTypeNames } from './lib/models/WorkoutType';

// Converters
export { UploadConverter };
export { UserInfoConverter } from './lib/converters/UserInfoConverter';
export { EntryConverter } from './lib/converters/EntryConverter';

// Services
export { UploadService };
export { UserInfoService };
export { EntryService };
export { TeamService };

export { CheckAdminStatus } from './lib/services/AuthService';
export { CheckIsEventOwner } from './lib/services/AuthService';

export {
  generateUsers,
  generateEvents,
  generateUploads,
  registerUsers,
} from './lib/testData';

export * from './lib/services/EventService';
export * from './lib/services/UploadService';

export * from './lib/services/CollectionRefs';
