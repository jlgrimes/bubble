import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { PairingsView } from './PairingsView';
import { startTournament } from './state/tournamentThunks';
import { TournamentStateView } from './TournamentStateView';

const Tournament = () => {
  const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   dispatch(startTournament());
  // }, []);

  return (
    <Stack spacing={4}>
      <Paper>
        <TournamentStateView />
      </Paper>
      <PairingsView />
    </Stack>
  );
};

export default Tournament;
