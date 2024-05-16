import { EventWithMetadata } from '@shared-data';
import { useUserLeaderboard } from '../../providers/queries';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useState } from 'react';

interface EventLeaderboardProps {
  event: EventWithMetadata;
}

export default ({ event }: EventLeaderboardProps) => {
  const { data: leaderboard } = useUserLeaderboard(event);

  const [colDefs] = useState([
    { field: 'rank', headerName: 'Rank', flex: 1 },
    { field: 'userDisplayName', headerName: 'Name', flex: 4 },
    { field: 'goal', headerName: 'Goal', flex: 2 },
    {
      field: 'points',
      headerName: 'Points',
      valueFormatter: (p: any) =>
        (Math.round(p.value * 10) / 10).toLocaleString(),
      flex: 5,
    },
    {
      headerName: 'Run',
      valueGetter: (p: any) => p.data.activities['Run'],
      flex: 2,
    },
    {
      headerName: 'Ski',
      valueGetter: (p: any) =>
        (p.data.activities['Classic Roller Skiing'] || 0) +
        (p.data.activities['Skate Roller Skiing'] || 0),
      flex: 2,
    },
  ] as any[]);

  return (
    <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={leaderboard}
        columnDefs={colDefs}
        autoSizeStrategy={{ type: 'fitCellContents' }}
      />
    </div>
  );
};
