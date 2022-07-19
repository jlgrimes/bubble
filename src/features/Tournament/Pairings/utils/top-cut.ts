import { Player } from '../../Player/types';
import { TopCutType } from '../../state/TournamentState';

/**
 * Gets players for top cut.
 *
 * @param standings Player array sorted by matchpoints.
 * @param topCut
 * @returns
 */
export const getTopCutPlayers = (
  standings: Player[],
  topCut: TopCutType
): Player[] => {
  if (topCut === 'top-four') {
    return standings.slice(0, 4);
  }

  return standings.slice(0, 8);
};

/**
 * Gets pairings for top cut.
 *
 * @param players Players already run through getTopCutPlayers.
 * @returns
 */
export const getTopCutSeeds = (players: Player[]): number[][] => {
  if (players.length === 2) {
    return [[0, 1]];
  } else if (players.length === 4) {
    return [
      [0, 3],
      [1, 2],
    ];
  } else if (players.length === 8) {
    return [
      [0, 7],
      [1, 6],
      [2, 5],
      [3, 4],
    ];
  }

  throw Error('Players array has not been pruned for top cut.');
};

export const getTopCutPairings = (players: Player[]): string[][] => {
  const topCutSeeds: number[][] = getTopCutSeeds(players);
  return topCutSeeds.map((seeds: number[]) => [
    players[seeds[0]].id,
    players[seeds[1]].id,
  ]);
};

export const getNextRoundTopCutPairings = (players: Player[]): string[][] => {
  players = players.filter(
    (player: Player) =>
      player.matches[player.matches.length - 1].result !== 'loss'
  );
  return getTopCutPairings(players);
};
