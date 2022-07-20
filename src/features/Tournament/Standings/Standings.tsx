import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../../../app/store';
import type { Player } from '../Player/types';
import { calculateOpponentOpponentWinRate, calculateResistance, getStylizedPercentage } from './utils/resistance';
import styled from '@emotion/styled';
import { getStylizedRecord } from '../Player/utils/record';
import confetti from 'canvas-confetti';
import { generateStandings } from '../state/tournamentSlice';
import Grid from '@mui/material/Grid';
import { TournamentOptionsCard } from '../Options/TournamentOptionsCard';

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

  React.useEffect(() => {
    dispatch(generateStandings());

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid item xs={12} md={4}>
        <TournamentOptionsCard />
      </Grid>
      <Grid item xs={12} md={8}>
        <div>
          {standings && standings.map((player: Player, idx: number) => (
            <StandingContainer>
              <div>{idx + 1}</div>
              <div>{player.name}</div>
              <div>{getStylizedRecord(player.record)}</div>
              <div>{getStylizedPercentage(calculateResistance(player, players))}</div>
              <div>{getStylizedPercentage(calculateOpponentOpponentWinRate(player, players))}</div>
            </StandingContainer>
          ))}
        </div>
      </Grid>
    </Grid>
  )
}