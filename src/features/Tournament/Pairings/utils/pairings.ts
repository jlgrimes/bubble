import type { Player } from '../../Player/types/Player';
// import maximumMatching, { iter } from '@graph-algorithm/maximum-matching';
import { MatchingGraph, maximumMatchingGraph } from 'maximum-matching';
import { shuffle } from '../../../../helpers/shuffle';

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

const trickleDownMatchPointTiers = (tiers: Player[][], randomize: boolean) => {
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
        ...tiers[tierIdx + 1].slice(stolenTierIdx + 1, tiers.length),
      ];
    }
  }

  return fixedTiers;
};

export const buildEdgesForMatchPointTier = (
  graph: MatchingGraph,
  players: Player[],
) => {
  let pairs = players.flatMap((v, i) => players.slice(i + 1).map(w => [v, w]));

  for (const [player, comparingPlayer] of pairs) {
    // Don't add an edge if the players have played against each other
    if (
      player.matches.some(
        playerMatch => playerMatch.opponentId === comparingPlayer.id
      )
    ) {
      continue;
    }

    graph.addEdge(player.id, comparingPlayer.id);
  }
};

export const sortMatchingTables = (maxMatching: string[][], players: Player[]) => {
  for (let pairIdx = 0; pairIdx < maxMatching.length; pairIdx++) {
    if (maxMatching[pairIdx][0] === 'bye') {
      maxMatching[pairIdx] = [maxMatching[pairIdx][1], 'bye']
    }
  }

  let sortedMatching = maxMatching.sort(
    (firstPair, secondPair) => {
      if (firstPair[1] === 'bye') {
        return 1;
      } else if (secondPair[1] === 'bye') {
        return -1;
      }

      return Math.max(
        players.find(player => player.id === secondPair[0])!.matchPoints,
        players.find(player => player.id === secondPair[1])!.matchPoints
      ) -
      Math.max(
        players.find(player => player.id === firstPair[0])!.matchPoints,
        players.find(player => player.id === firstPair[1])!.matchPoints
      )
    }
  );

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
  const matchPointTieredPlayers: Player[][] =
    reducePlayersToMatchPointTiers(players);
  const finalPlayers = trickleDownMatchPointTiers(
    matchPointTieredPlayers,
    randomize
  );

  const graph = new MatchingGraph();

  const playerNodes = randomize ? shuffle(players) : players;
  for (const player of playerNodes) {
    graph.addNode(player.id);
  }

  for (const playerTier of finalPlayers) {
    buildEdgesForMatchPointTier(graph, playerTier);
  }

  const maxMatchingGraph = maximumMatchingGraph(graph);

  if (maxMatchingGraph.unpairedNodes().length > 1) {
    throw Error('More than one unpaired node generated. Probably too many rounds.');
  }

  let maxMatching: string[][] = [...maxMatchingGraph.matching()];
  if (maxMatchingGraph.unpairedNodes().length > 0) {
    maxMatching.push(maxMatchingGraph.unpairedNodes());
  }

  const sortedMatching = sortMatchingTables(maxMatching, players);

  return sortedMatching;
};
