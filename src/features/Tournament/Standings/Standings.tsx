import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../../../app/store';
import type { Player } from '../Player/types';
import styled from '@emotion/styled';
import { generateStandings } from '../state/tournamentSlice';
import Grid from '@mui/material/Grid';
import { TournamentOptionsCard } from '../Options/TournamentOptionsCard';
import { lotsOfConfetti, smallConfetti } from '../../../helpers/confetti-blast';
import { ViewState } from '../state/ViewState';
import { StandingsTable } from './StandingsTable';

export const StandingContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const Standings = () => {
  const dispatch = useDispatch();

  const players: Player[] = useSelector(
    (state: RootState) => state.tournament.players
  );
  const standings: Player[] | undefined = useSelector(
    (state: RootState) => state.tournament.standings
  );
  const viewState: ViewState = useSelector(
    (state: RootState) => state.tournament.viewState
  );


  React.useEffect(() => {
    dispatch(generateStandings());

    if (viewState === 'standings') {
      smallConfetti();
    }

    if (viewState === 'final-standings') {
      lotsOfConfetti();
    }
  }, []);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid item xs={12} md={3}>
        <TournamentOptionsCard />
      </Grid>
      <Grid item xs={12} md={8}>
        <StandingsTable />
      </Grid>
    </Grid>
  )
}