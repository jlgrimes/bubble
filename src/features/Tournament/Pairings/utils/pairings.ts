import type { Player } from '../../Player/types/Player';
// import maximumMatching, { iter } from '@graph-algorithm/maximum-matching';
import { MatchingGraph, maximumMatching } from 'maximum-matching';
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
  );
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
  players: Player[],
  randomize: boolean
): string[][] => {
  let edges: string[][] = [];

  let pairs = players.flatMap((v, i) =>
    players.slice(i + 1).map(w => [v, w])
  );

  if (randomize) {
    pairs = shuffle(pairs);
  }

  for (const [player, comparingPlayer] of pairs) {
    // Don't add an edge if the players have played against each other
    if (
      player.matches.some(
        playerMatch => playerMatch.opponentId === comparingPlayer.id
      )
    ) {
      continue;
    }

    // const weight = randomize ? Math.floor(Math.random() * 10) : 1;
    edges.push([player.id, comparingPlayer.id]);
  }

  return edges;
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

  const edges = finalPlayers
    .map((playerTier: Player[]) =>
      buildEdgesForMatchPointTier(playerTier, randomize)
    )
    .flat();

  // Make max matching graph
  const graph = new MatchingGraph();
  for (const player of players) {
    graph.addNode(player.id);
  }
  for (const edge of edges) {
    graph.addEdge(edge[0], edge[1]);
  }

  const maxMatching = maximumMatching(graph);
  let sortedMatching = maxMatching.sort(
    (firstPair, secondPair) =>
      Math.max(
        players.find(player => player.id === secondPair[0])!.matchPoints,
        players.find(player => player.id === secondPair[1])!.matchPoints
      ) -
      Math.max(
        players.find(player => player.id === firstPair[0])!.matchPoints,
        players.find(player => player.id === firstPair[1])!.matchPoints
      )
  );
  // To fix the case where the down paired player need to be listed first.
  for (let pairIdx = 0; pairIdx < sortedMatching.length; pairIdx++) {
    if (players.find(player => player.id === sortedMatching[pairIdx][0])!.matchPoints < players.find(player => player.id === sortedMatching[pairIdx][1])!.matchPoints) {
      sortedMatching[pairIdx] = [sortedMatching[pairIdx][1], sortedMatching[pairIdx][0]];
    }
  }

  return sortedMatching;
};
