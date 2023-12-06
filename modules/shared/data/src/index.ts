import UploadConverter from './lib/converters/UploadConverter';

// Models
export type { UserInfo } from './lib/models/UserInfo';
export type { UserInfoWithUid } from './lib/models/UserInfo';

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

export * from './lib/services/AuthService';

export * from './lib/services/CollectionRefs';

export { createEvent } from './lib/services/create/event';
export { createTeamByOwner } from './lib/services/create/team';
export { createUpload } from './lib/services/create/upload';
export { createUserFromAuth } from './lib/services/create/user';
export { registerUserForEvent } from './lib/services/create/entry';
export { readEvent } from './lib/services/read/event';
export { listEvents } from './lib/services/read/event';
export { getTeamLeaderboard } from './lib/services/read/team';
export { getTeamsByEvent } from './lib/services/read/team';
export { getUserLeaderboard } from './lib/services/read/entry';
export { readEntry } from './lib/services/read/entry';
export { listRecentUploads } from './lib/services/read/upload';
export { listUsers } from './lib/services/read/user';
export { readUser } from './lib/services/read/user';
export { deleteEvent } from './lib/services/delete/event';
export { deleteUser } from './lib/services/delete/user';
export { deleteTeam } from './lib/services/delete/team';
export { updateTeamName } from './lib/services/update/team';
export { updateUser } from './lib/services/update/user';
