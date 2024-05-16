import { EntryWithMetaData, EventWithMetadata } from '@shared-data';
import { useUserLeaderboard } from '../providers/queries';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useState } from 'react';

interface EventLeaderboardProps {
  event: EventWithMetadata;
  division?: string | null;
}

export default ({ event, division }: EventLeaderboardProps) => {
  const { data: entries } = useUserLeaderboard(event);

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

  const [data, setData] = useState([] as EntryWithMetaData[]);

  useEffect(() => {
    if (!entries) return;
    if (!division) setData(entries);
    else setData(entries.filter((entry) => entry.category === division));
  }, [entries, division]);

  return (
    <div className="ag-theme-quartz">
      <AgGridReact
        domLayout={'autoHeight'}
        rowData={data}
        columnDefs={colDefs}
        autoSizeStrategy={{ type: 'fitCellContents' }}
      />
    </div>
  );
};
