import React from 'react';
import { useSelector } from "react-redux"
import { RootState } from '../../../app/store';
import { TopCutType } from "../state/TournamentState";
import type { Player } from '../Player/types';
import { getStandings } from './utils/standings';
import { calculateOpponentOpponentWinRate, calculateResistance } from './utils/resistance';

export const Standings = () => {
  const [standings, setStandings] = React.useState<Player[]>([]);

  const players: Player[] = useSelector(
    (state: RootState) => state.tournament.players
  );
  const topCut: TopCutType = useSelector((state: RootState) => state.tournament.topCut);

  React.useEffect(() => {
    setStandings(getStandings(players));
  }, []);

  return (
    <div>
      {standings.map((player: Player) => (
        <div style={{display: 'flex'}}>
          <div>{player.name}</div>
          <div>{player.matchPoints}</div>
          <div>{calculateResistance(player, players)}</div>
          <div>{calculateOpponentOpponentWinRate(player, players)}</div>
        </div>
      ))}
    </div>
  )
}