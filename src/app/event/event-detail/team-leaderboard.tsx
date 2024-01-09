import { EventWithMetadata, TeamWithMetaData } from '@shared-data';
import { LoadingWrapper } from '@shared-ui';
import { useTeamLeaderboard } from '../../../providers/queries';
import { IconButton, Sheet, Table, Typography } from '@mui/joy';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface TeamsListProps {
  event: EventWithMetadata;
}

export const TeamLeaderboard = ({ event }: TeamsListProps) => {
  const { data: teams, isLoading } = useTeamLeaderboard(event.uid);

  return (
    <LoadingWrapper loading={isLoading}>
      {teams && teams.length > 0 && (
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
              <TeamWithDropdown team={team} key={index} />
            ))}
          </tbody>
        </Table>
      )}
    </LoadingWrapper>
  );
};

const TeamWithDropdown = ({ team }: { team: TeamWithMetaData }) => {
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
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={4}>
          {open && (
            <Sheet
              variant={'soft'}
              sx={{ p: 1, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
            >
              <Typography>TODO: List of team members here</Typography>
            </Sheet>
          )}
        </td>
      </tr>
    </>
  );
};
