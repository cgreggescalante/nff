import {
  EntryWithMetaData,
  EventWithMetadata,
  TeamWithMetaData,
  UserInfo,
} from '@shared-data';
import { LoadingWrapper } from '@shared-ui';
import {
  useTeamLeaderboard,
  useUserLeaderboard,
} from '../../../providers/queries';
import { IconButton, Sheet, Table } from '@mui/joy';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface TeamsListProps {
  event: EventWithMetadata;
}

export const TeamLeaderboard = ({ event }: TeamsListProps) => {
  const { data: teams, isLoading: teamsLoading } = useTeamLeaderboard(
    event.uid
  );
  const { data: users, isLoading: usersLoading } = useUserLeaderboard(event);

  return (
    <LoadingWrapper loading={teamsLoading && usersLoading}>
      {teams && teams.length > 0 && users && (
        <Table hoverRow={true}>
          <thead>
            <tr>
              <th style={{ width: '8%' }} />
              <th>Team</th>
              <th>Points</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <TeamWithDropdown team={team} users={users} key={index} />
            ))}
          </tbody>
        </Table>
      )}
    </LoadingWrapper>
  );
};

const TeamWithDropdown = ({
  team,
  users,
}: {
  team: TeamWithMetaData;
  users: { user: UserInfo; entry: EntryWithMetaData }[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr>
        <td>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td>{team.name}</td>
        <td>{team.points}</td>
        <td>{team.entryRefs.length}</td>
      </tr>
      {open && (
        <>
          <tr>
            <td />
            <td>User</td>
            <td>Points</td>
            <td>User</td>
          </tr>
          {users
            .filter((user) => user.entry.teamRef?.id === team.uid)
            .map((user) => (
              <tr>
                <td>{user.user.firstName}</td>
              </tr>
            ))}
        </>
      )}
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={4}>
          {open && (
            <Sheet
              variant={'soft'}
              sx={{ p: 1, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
            >
              <Table>
                <tbody>{team.entryRefs.length}</tbody>
              </Table>
            </Sheet>
          )}
        </td>
      </tr>
    </>
  );
};
