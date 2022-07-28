import React from 'react';
import { Typography } from '@mui/material';
import { StandingsTable } from '../Standings/StandingsTable';

export const PrintableStandings = () => {
  React.useEffect(() => {
    window.print();
  }, []);

  return (
    <>
      <Typography variant='h4'>Standings</Typography>
      <StandingsTable />
    </>
  );
};
