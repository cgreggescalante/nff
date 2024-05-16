import {
  EntryWithMetaData,
  EventWithMetadata,
  TeamWithMetaData,
} from '@shared-data';
import { useTeamLeaderboard, useUserLeaderboard } from '../providers/queries';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import Popover from '@mui/material/Popover';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Stack } from '@mui/joy';
import './teamLeaderboard.css';

interface TeamsListProps {
  event: EventWithMetadata;
}

export default ({ event }: TeamsListProps) => {
  const { data: teams } = useTeamLeaderboard(event.uid);
  const { data: entries } = useUserLeaderboard(event);

  const [colDefs, setColDefs] = useState<any[]>();

  useEffect(() => {
    if (!teams || !entries) return;

    setColDefs([
      { field: 'rank', headerName: 'Rank', flex: 1 },
      {
        field: 'name',
        headerName: 'Team',
        flex: 2,
        cellRenderer: (p: CustomCellRendererProps) => (
          <TeamDetailPopover team={p.data} entries={entries}>
            {p.value}
          </TeamDetailPopover>
        ),
      },
      {
        headerName: 'Leader',
        flex: 2,
        valueGetter: (p: any) =>
          entries.find((entry) => entry.uid === p.data.ownerEntryRef.id)
            ?.userDisplayName,
      },
      {
        field: 'points',
        headerName: 'Points',
        valueFormatter: (p: any) => Math.round(p.value).toLocaleString(),
        flex: 1,
      },
    ]);
  }, [event, teams, entries]);

  return (
    <div className="ag-theme-quartz">
      <AgGridReact
        domLayout={'autoHeight'}
        rowData={teams}
        columnDefs={colDefs}
        autoSizeStrategy={{ type: 'fitCellContents' }}
      />
    </div>
  );
};

const TeamDetailPopover = ({
  team,
  entries,
  children,
}: {
  team: TeamWithMetaData;
  entries: EntryWithMetaData[];
  children: ReactNode;
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const [colDefs] = useState<any[]>([
    { field: 'rank', headerName: 'Rank', flex: 1 },
    {
      field: 'userDisplayName',
      headerName: 'Name',
      flex: 2,
    },
    {
      field: 'points',
      headerName: 'Points',
      valueFormatter: (p: any) => Math.round(p.value).toLocaleString(),
      flex: 1,
    },
  ]);

  return (
    <>
      <div
        aria-owns={anchorEl ? 'popover' : undefined}
        aria-haspopup={'true'}
        onClick={toggleOpen}
      >
        <Stack direction={'row'} alignItems={'center'}>
          {children}
          {anchorEl ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </Stack>
      </div>
      <Popover
        ref={popoverRef}
        id={'popover'}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableAutoFocus
      >
        <div className="ag-theme-quartz compact" style={{ width: '350px' }}>
          <AgGridReact
            domLayout={'autoHeight'}
            rowData={entries.filter(
              (entry) => entry.teamRef && entry.teamRef.id === team.uid
            )}
            columnDefs={colDefs}
          />
        </div>
      </Popover>
    </>
  );
};
