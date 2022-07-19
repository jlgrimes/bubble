import { Player } from '../../Player/types';
import {
  calculateOpponentOpponentWinRate,
  calculateResistance,
} from './resistance';

export const getStandings = (players: Player[], standings?: Player[]): Player[] => {
  // If we're generating standings for top cut, players is going to contain top cut players.
  if (standings) {
    const topCutStandings: Player[] = getStandings(players);
    return [
      ...topCutStandings,
      ...standings.slice(topCutStandings.length, standings.length)
    ]
  }

  return [...players].sort((playerA: Player, playerB: Player) => {
    if (playerA.matchPoints === playerB.matchPoints) {
      const playerAResistance = calculateResistance(playerA, players);
      const playerBResistance = calculateResistance(playerB, players);

      if (playerAResistance === playerBResistance) {
        return (
          calculateOpponentOpponentWinRate(playerB, players) -
          calculateOpponentOpponentWinRate(playerA, players)
        );
      }

      return playerBResistance - playerAResistance;
    }

    return playerB.matchPoints - playerA.matchPoints;
  });
};
