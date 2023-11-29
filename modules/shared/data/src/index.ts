import UploadService from './lib/services/UploadService';
import UserInfoService from './lib/services/UserInfoService';
import EventService from './lib/services/EventService';
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
export type { Team } from './lib/models/Team';

export { WorkoutTypeNames } from './lib/models/WorkoutType';

// Converters
export { UploadConverter };
export { UserInfoConverter } from './lib/converters/UserInfoConverter';
export { EntryConverter } from './lib/converters/EntryConverter';

// Services
export { UploadService };
export { UserInfoService };
export { EventService };
export { EntryService };
export { TeamService };

export { CheckAdminStatus } from './lib/services/AuthService';

export {
  generateUsers,
  generateEvents,
  generateUploads,
  registerUsersForEvents,
} from './lib/testData';
