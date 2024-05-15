import {
  EntryWithMetaData,
  EventWithMetadata,
  TeamWithMetaData,
} from '@shared-data';
import {
  useTeamLeaderboard,
  useUserLeaderboard,
} from '../../../providers/queries';
import { IconButton, Table } from '@mui/joy';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { LoadingWrapper } from '../../../components';

interface TeamsListProps {
  event: EventWithMetadata;
}

export const TeamLeaderboard = ({ event }: TeamsListProps) => {
  const { data: teams, isLoading: teamsLoading } = useTeamLeaderboard(
    event.uid
  );
  const { data: entries, isLoading: usersLoading } = useUserLeaderboard(event);

  return (
    <LoadingWrapper loading={teamsLoading && usersLoading}>
      {teams && teams.length > 0 && entries && (
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
              <TeamWithDropdown team={team} entries={entries} key={index} />
            ))}
          </tbody>
        </Table>
      )}
    </LoadingWrapper>
  );
};

const TeamWithDropdown = ({
  team,
  entries,
}: {
  team: TeamWithMetaData;
  entries: EntryWithMetaData[];
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
          {entries
            .filter((entry) => entry.teamRef?.id === team.uid)
            .map((entry, index) => (
              <tr key={index}>
                <td />
                <td>{entry.userDisplayName}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
        </>
      )}
    </>
  );
};
