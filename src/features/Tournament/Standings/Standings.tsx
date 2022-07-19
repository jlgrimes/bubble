import React from 'react';
import { useSelector } from "react-redux"
import { RootState } from '../../../app/store';
import { TopCutType } from "../state/TournamentState";
import type { Player } from '../Player/types';
import { getStandings } from './utils/standings';
import { calculateOpponentOpponentWinRate, calculateResistance, getStylizedPercentage } from './utils/resistance';
import styled from '@emotion/styled';
import { getStylizedRecord } from '../Player/utils/record';
import confetti from 'canvas-confetti';

export const StandingContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const Standings = () => {
  const [standings, setStandings] = React.useState<Player[]>([]);

  const players: Player[] = useSelector(
    (state: RootState) => state.tournament.players
  );
  const topCut: TopCutType = useSelector((state: RootState) => state.tournament.topCut);

  React.useEffect(() => {
    setStandings(getStandings(players));

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div>
      {standings.map((player: Player, idx: number) => (
        <StandingContainer>
          <div>{idx + 1}</div>
          <div>{player.name}</div>
          <div>{getStylizedRecord(player.record)}</div>
          <div>{getStylizedPercentage(calculateResistance(player, players))}</div>
          <div>{getStylizedPercentage(calculateOpponentOpponentWinRate(player, players))}</div>
        </StandingContainer>
      ))}
    </div>
  )
}