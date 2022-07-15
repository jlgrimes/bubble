import type { Player } from '../../Player/types/Player';
import maximumMatching, { iter } from '@graph-algorithm/maximum-matching';

const reducePlayersToMatchPointTiers = (players: Player[]): Player[][] => {
  return Object.values(players.reduce(
    (acc: { [key: number]: Player[] }, curr: Player) => {
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
    },
    {}
  ))
};

const trickleDownMatchPointTiers = (tiers: Player[][], randomize: boolean) => {
  let fixedTiers: Player[][] = [];

  for (let tierIdx = 0; tierIdx < tiers.length; tierIdx++) {
    const tier = tiers[tierIdx];

    if (tier.length % 2 === 0) {
      fixedTiers.push(tier);
      // Don't pop from the next tier if we're at the last one
    } else if (tierIdx !== tiers.length - 1) {
      const stolenTierIdx = randomize ? Math.floor(Math.random() * tiers[tierIdx + 1].length) : 0;
      fixedTiers.push([...tier, tiers[tierIdx + 1][stolenTierIdx]]);
      tiers[tierIdx + 1] = [
        ...tiers[tierIdx + 1].slice(0, stolenTierIdx),
        ...tiers[tierIdx + 1].slice(stolenTierIdx + 1, tiers.length)
      ];
    }
  }

  return fixedTiers;
};

export const buildEdgesForMatchPointTier = (
  players: Player[],
  randomize: boolean
): number[][] => {
  let edges: number[][] = [];

  const pairs = players.flatMap((v, i) =>
    players.slice(i + 1).map(w => [v, w])
  );

  for (const [player, comparingPlayer] of pairs) {
    // Don't add an edge if the players have played against each other
    if (
      player.matches.some(
        playerMatch => playerMatch.opponentId === comparingPlayer.id
      )
    ) {
      continue;
    }

    const weight = randomize ? Math.floor(Math.random() * 10) : 1;
    edges.push([player.id, comparingPlayer.id, weight]);
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
): number[][] => {
  const matchPointTieredPlayers: Player[][] = reducePlayersToMatchPointTiers(players);
  const finalPlayers = trickleDownMatchPointTiers(matchPointTieredPlayers, randomize);

  const edges = finalPlayers
    .map((playerTier: Player[]) =>
      buildEdgesForMatchPointTier(playerTier, randomize)
    )
    .flat();

  const matching = maximumMatching(edges);
  return [...iter(matching)];
};
