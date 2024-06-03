import { useEffect, useState } from 'react';
import {
  Entry,
  EntryWithMetaData,
  EventWithMetadata,
  getEntriesByEvent,
  getTeamsByEvent,
  TeamWithMetaData,
} from '@shared-data';
import { Select, Stack, Table, Typography, Option } from '@mui/joy';
import { AgGridReact } from 'ag-grid-react';
import './style.css';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { DocumentReference } from '@firebase/firestore';

export default ({ event: serverEvent }: { event: EventWithMetadata }) => {
  const [event] = useState<EventWithMetadata>(serverEvent);

  const [teams, setTeams] = useState<TeamWithMetaData[]>([]);

  const [entries, setEntries] = useState<EntryWithMetaData[]>([]);

  const [ownerRefs, setOwnerRefs] = useState<DocumentReference<Entry>[]>([]);

  const setTeam = (uid: string, team: TeamWithMetaData | null) => {
    setEntries((entries) =>
      entries.map((entry) =>
        entry.uid === uid
          ? { ...entry, teamRef: team ? team.ref : undefined }
          : entry
      )
    );
  };

  const [draftableColDefs, setDraftableColDefs] = useState<any[]>([]);

  const [draftedColDefs, setDraftedColDefs] = useState<any[]>();

  useEffect(() => {
    if (!event) return;
    getTeamsByEvent(event.uid)
      .then(setTeams)
      .catch((error) => console.error(error));

    getEntriesByEvent(event).then(setEntries);
  }, [event]);

  useEffect(() => {
    if (!entries || !teams) return;

    const ownerRefs = teams.map((team) => team.ownerEntryRef);
    setOwnerRefs(ownerRefs);

    console.log(ownerRefs);

    setDraftableColDefs([
      {
        field: 'userDisplayName',
        headerName: 'Name',
        filter: 'agTextColumnFilter',
        floatingFilter: true,
      },
      { field: 'goal' },
      {
        headerName: 'Team',
        cellRenderer: (p: any) => (
          <TeamSelector p={p} teams={teams} setTeam={setTeam} />
        ),
      },
    ]);

    setDraftedColDefs([
      {
        field: 'userDisplayName',
        headerName: 'Name',
        filter: 'agTextColumnFilter',
        floatingFilter: true,
      },
      {
        headerName: 'Team',
        valueGetter: (p: any) =>
          teams.find((t) => t.ref === p.data.teamRef)?.name,
      },
      {
        cellRenderer: (p: any) =>
          ownerRefs.includes(p.data.ref) ? (
            'Owner'
          ) : (
            <IconButton
              size={'small'}
              onClick={() => setTeam(p.data.uid, null)}
            >
              <ClearIcon fontSize={'small'} />
            </IconButton>
          ),
      },
    ]);
  }, [entries, teams]);

  if (!entries || !teams || !ownerRefs) return null;

  return (
    <Stack>
      <Typography level={'h2'}>Draft</Typography>

      <Typography level={'h3'}>Teams</Typography>
      <Table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Current Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr>
              <td>{team.name}</td>
              <td>{team.entryRefs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Typography level={'h3'}>Available Athletes</Typography>
      <div className={'ag-theme-quartz'} style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={draftableColDefs}
          rowData={entries.filter((entry) => !entry.teamRef)}
        />
      </div>

      <Typography level={'h3'}>Drafted Athletes</Typography>
      <div className={'ag-theme-quartz'} style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={draftedColDefs}
          rowData={entries.filter(
            (entry) => entry.teamRef && !ownerRefs.includes(entry.ref)
          )}
        />
      </div>
    </Stack>
  );
};

const TeamSelector = ({
  p,
  teams,
  setTeam,
}: {
  p: any;
  teams: TeamWithMetaData[];
  setTeam: (uid: string, teamRef: TeamWithMetaData | null) => void;
}) => (
  <Select
    size={'sm'}
    variant={'plain'}
    value={p.data.teamRef}
    onChange={(_, value) => setTeam(p.data.uid, value)}
  >
    <Option value={null}>None</Option>
    {teams.map((team) => (
      <Option value={team}>{team.name}</Option>
    ))}
  </Select>
);
