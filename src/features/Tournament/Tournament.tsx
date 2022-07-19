import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { PairingsView } from './PairingsView';
import { startTournament } from './state/tournamentThunks';
import { TournamentStateView } from './TournamentStateView';
import { ViewState } from './state/ViewState';
import { Standings } from './Standings/Standings';

export const Tournament = () => {
  const dispatch = useAppDispatch();
  const viewState: ViewState = useSelector(
    (state: RootState) => state.tournament.viewState
  );

  React.useEffect(() => {
    dispatch(startTournament());
  }, []);

  return (
    <Stack spacing={4}>
      <Paper>
        <TournamentStateView />
      </Paper>
      {viewState === 'tournament' ? (
        <PairingsView />
      ) : viewState === 'standings' ? (
        <Standings />
      ) : null}
    </Stack>
  );
};
