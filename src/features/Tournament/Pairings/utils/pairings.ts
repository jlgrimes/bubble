import type { Match, Pairing } from '../types';
import type { Player } from '../../Player/types/Player';
import {
  sortPlayersByMatchPoints,
} from '../../Player/utils/player';
import { shuffle } from '../../../../helpers/shuffle';
import maximumMatching, {iter} from '@graph-algorithm/maximum-matching';

/**
 * Gets pairings from a list of players. Top-down.
 *
 * @param players Top-down sorted list of players.
 * @returns Pairings list.
 */
export const getPairings = (players: Player[]): Pairing[] => {
  let pairings: Pairing[] = [];
  for (let playerIdx = 0; playerIdx < players.length; playerIdx += 2) {
    if (playerIdx === players.length - 1) {
      pairings.push({ playerIds: [players[playerIdx].id] });
    } else {
      pairings.push({
        playerIds: [players[playerIdx].id, players[playerIdx + 1].id],
      });
    }
  }

  return pairings;
};

/**
 * Gets initial round pairings as an array of matches.
 *
 * @param players Players list.
 * @returns
 */
export const getInitialRoundPairings = (players: Player[]): Pairing[] => {
  // Initial round doesn't need to organize by match points.
  const sortedPlayers = shuffle(players);

  return getPairings(sortedPlayers);
};

/**
 * Gets next round pairings as an array of pairings.
 *
 * @param players Updated players list. Expected "applyMatchResultsToPlayers" to have been run.
 * @returns
 */
export const getNextRoundPairings = (
  players: Player[],
): Pairing[] => {
  // Sorts the players by match points and scrambles within match point tiers.
  const sortedPlayers = sortPlayersByMatchPoints(players);

  return getPairings(sortedPlayers);
};

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
export const getPairingsGraph = (players: Player[], randomize: boolean = true) => {
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