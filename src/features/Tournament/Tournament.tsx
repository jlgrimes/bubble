import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { PairingsView } from './PairingsView';
import { startTournament } from './state/tournamentThunks';
import { ViewState } from './state/ViewState';
import { Standings } from './Standings/Standings';
import { TournamentSetupView } from './TournamentSetupView';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './ErrorPage';

export const Tournament = () => {
  const viewState: ViewState = useSelector(
    (state: RootState) => state.tournament.viewState
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      {viewState === 'setup' ? (
        <TournamentSetupView />
      ) : viewState === 'tournament' || viewState === 'top-cut' ? (
        <PairingsView />
      ) : viewState === 'standings' || viewState === 'final-standings' ? (
        <Standings />
      ) : null}
    </ErrorBoundary>
  );
};
