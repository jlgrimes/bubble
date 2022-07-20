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
    // Sometimes, view state will not be initially set to tournament, in the event of a test.
    if (viewState === 'tournament') {
      dispatch(startTournament());
    }
  }, []);

  return (
    <Stack spacing={4}>
      {viewState === 'tournament' || viewState === 'top-cut' ? (
        <PairingsView />
      ) : viewState === 'standings' || viewState === 'final-standings' ? (
        <Standings />
      ) : null}
    </Stack>
  );
};
