import type { Player } from '../../Player/types/Player';
// import maximumMatching, { iter } from '@graph-algorithm/maximum-matching';
import { MatchingGraph, maximumMatchingGraph } from 'maximum-matching';
import { shuffle } from '../../../../helpers/shuffle';
import { getActivePlayers } from '../../Player/utils/player';
import { byePlayer } from '../../state/constants';

/**
 * Converts a flat list of players to a map from match points to players that have that number of match points.
 *
 * @param players - Player array.
 * @returns - Reduced map from match points to players.
 */
const reducePlayersToMatchPointTiers = (players: Player[]): Player[][] => {
  return Object.values(
    players.reduce((acc: { [key: number]: Player[] }, curr: Player) => {
      if (acc[curr.matchPoints]) {
        return {
          ...acc,
          [curr.matchPoints]: [...acc[curr.matchPoints], curr],
        };
      }

      return {
        ...acc,
        [curr.matchPoints]: [curr],
      };
    }, {})
  ).reverse();
};

export const trickleDownMatchPointTiers = (
  tiers: Player[][],
  randomize: boolean
) => {
  let fixedTiers: Player[][] = [];

  for (let tierIdx = 0; tierIdx < tiers.length; tierIdx++) {
    const tier = tiers[tierIdx];

    if (tier.length % 2 === 0 || tierIdx === tiers.length - 1) {
      fixedTiers.push(tier);
      // Don't pop from the next tier if we're at the last one
    } else {
      const stolenTierIdx = randomize
        ? Math.floor(Math.random() * tiers[tierIdx + 1].length)
        : 0;
      fixedTiers.push([...tier, tiers[tierIdx + 1][stolenTierIdx]]);
      tiers[tierIdx + 1] = [
        ...tiers[tierIdx + 1].slice(0, stolenTierIdx),
        ...tiers[tierIdx + 1].slice(
          stolenTierIdx + 1,
          tiers[tierIdx + 1].length
        ),
      ];
    }
  }

  return fixedTiers;
};

/**
 * Builds edges for the max match problem. Excludes cases where
 * we shouldn't have the possibility of pairing together players.
 *
 * @param graph - The graph of players.
 * @param players - Flat list of players.
 */
export const buildEdgesForMatchPointTier = (
  graph: MatchingGraph,
  players: Player[]
) => {
  let pairs = players.flatMap((v, i) => players.slice(i + 1).map(w => [v, w]));

  for (const [player, comparingPlayer] of pairs) {
    // Don't add an edge if the players have played against each other
    if (
      player.matches.some(
        playerMatch => playerMatch.opponentId === comparingPlayer.id
      ) ||
      /**
       * If a player has dropped, then another player dropped, then another player dropped,
       * the bye player will be removed then readded. However this will be fine on pairings
       * since the “pairs” that the program iterates through are first to last, so the bye player
       * is always the second player. This means that the “pair” for the bye match once the bye
       * gets introduced in will be [player, bye], so the bye will not be introduced as an edge since the logic checks.
       *
       * This is a safeguard for this to say, if either of the pairings have been “already played”,
       * don’t add the edge. Complexity wise, it adds overhead for when the first of the || is false,
       * then it will look for the second one.
       */
      comparingPlayer.matches.some(
        playerMatch => playerMatch.opponentId === player.id
      )
    ) {
      continue;
    }

    graph.addEdge(player.id, comparingPlayer.id);
  }
};

/**
 * Post-pairing, sorts the tables to be sat at from the max matching.
 *
 * @param maxMatching - The max matching.
 * @param players - Flat list of players.
 * @returns - Max matching sorted by how it should be rendered.
 */
export const sortMatchingTables = (
  maxMatching: string[][],
  players: Player[]
) => {
  for (let pairIdx = 0; pairIdx < maxMatching.length; pairIdx++) {
    if (maxMatching[pairIdx][0] === 'bye') {
      maxMatching[pairIdx] = [maxMatching[pairIdx][1], 'bye'];
    }
  }

  let sortedMatching = maxMatching.sort((firstPair, secondPair) => {
    if (firstPair[1] === 'bye') {
      return 1;
    } else if (secondPair[1] === 'bye') {
      return -1;
    }

    /**
     * This logic means, for any two pairs, firstPair and secondPair, sort them
     * by the min of the match points that each player has. We sort by the sum of
     * the match points of each pair, because if we're on the same tier, of course
     * we should keep them next to each other. If we're on the same tier but someone
     * is down paired, that pairing should be ranked lower and be put at a lower table.
     * Similarly, up pairs should be ranked higher and should be put at a higher table.
     */
    return (
      players.find(player => player.id === secondPair[0])!.matchPoints +
      players.find(player => player.id === secondPair[1])!.matchPoints -
      (players.find(player => player.id === firstPair[0])!.matchPoints +
        players.find(player => player.id === firstPair[1])!.matchPoints)
    );
  });

  // I think I fixed this? uncomment if still broken
  // To fix the case where the down paired player need to be listed first.
  // for (let pairIdx = 0; pairIdx < sortedMatching.length; pairIdx++) {
  //   if (
  //     sortedMatching[pairIdx].length > 1 &&
  //     players.find(player => player.id === sortedMatching[pairIdx][0])!
  //       .matchPoints <
  //     players.find(player => player.id === sortedMatching[pairIdx][1])!
  //       .matchPoints
  //   ) {
  //     sortedMatching[pairIdx] = [
  //       sortedMatching[pairIdx][1],
  //       sortedMatching[pairIdx][0],
  //     ];
  //   }
  // }

  return sortedMatching;
};

/**
 * Gets pairings through a graph.
 * @param players List of players.
 * @param randomize Whether or not should be randomized.
 * @returns
 */
export const getPairings = (
  players: Player[],
  randomize: boolean = true
): string[][] => {
  if (randomize) {
    players = shuffle(players);
  }

  const matchPointTieredPlayers: Player[][] =
    reducePlayersToMatchPointTiers(players);
  const finalPlayers = trickleDownMatchPointTiers(
    matchPointTieredPlayers,
    randomize
  );

  const graph = new MatchingGraph();
  for (const player of players) {
    graph.addNode(player.id);
  }

  for (const playerTier of finalPlayers) {
    buildEdgesForMatchPointTier(graph, playerTier);
  }

  const maxMatchingGraph = maximumMatchingGraph(graph);

  if (maxMatchingGraph.unpairedNodes().length > 1) {
    throw Error(
      `More than one unpaired node generated (${maxMatchingGraph.unpairedNodes()}). Probably too many rounds.`
    );
  }

  let maxMatching: string[][] = [...maxMatchingGraph.matching()];
  if (maxMatchingGraph.unpairedNodes().length > 0) {
    maxMatching.push(maxMatchingGraph.unpairedNodes());
  }

  const sortedMatching = sortMatchingTables(maxMatching, players);

  return sortedMatching;
};
