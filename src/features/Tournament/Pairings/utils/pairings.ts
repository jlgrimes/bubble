import type { Player } from '../../Player/types/Player';
import maximumMatching, {iter} from '@graph-algorithm/maximum-matching';
import { Pairing } from '../types';

export const buildEdgesForMatchPointTier = (players: Player[], randomize: boolean): number[][] => {
  let edges: number[][] = [];

  const pairs = players.flatMap(
    (v, i) => players.slice(i+1).map( w => [v, w] )
  );

  for (const [player, comparingPlayer] of pairs) {
    // Don't add an edge if the players have played against each other
    if (player.matches.some((playerMatch) => playerMatch.opponentId === comparingPlayer.id)) {
      continue;
    }

    const weight = randomize ? Math.floor(Math.random() * 10) : 1;
    edges.push([player.id, comparingPlayer.id, weight])
  }

  return edges;
}

/**
 * Gets pairings through a graph.
 * @param players List of players.
 * @param randomize Whether or not should be randomized.
 * @returns 
 */
export const getPairings = (players: Player[], randomize: boolean = true): Pairing[] => {
  const matchPointTieredPlayers: {[key: number]: Player[]} = players.reduce((acc: {[key: number]: Player[]}, curr: Player) => {
    if (acc[curr.matchPoints]) {
      return {
        ...acc,
        [curr.matchPoints]: [...acc[curr.matchPoints], curr]
      }
    }

    return {
      ...acc,
      [curr.matchPoints]: [curr]
    }
  }, {});

  const edges = Object.values(matchPointTieredPlayers).map((playerTier: Player[]) => buildEdgesForMatchPointTier(playerTier, randomize)).flat();

  const matching = maximumMatching(edges)
  return [...iter(matching)];
}