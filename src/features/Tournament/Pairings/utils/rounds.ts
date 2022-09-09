import { TopCutType } from '../../state/TournamentState';

const recommendedRoundMap: Record<number, number> = {
  1: 2,
  2: 4,
  3: 8,
  4: 12,
  5: 32,
  6: 64,
  7: 128,
  8: 226,
  9: 409,
  10: Number.MAX_SAFE_INTEGER
}

// 4.6.3.2 - Single Day Tournament Structures
export const recommendedRounds = (numPlayers: number): number => {
  for (const [round, minPlayers] of Object.entries(recommendedRoundMap)) {
    if (numPlayers <= minPlayers) return parseInt(round);
  }

  return 10;
};

// Inverse of above function. For helper text.
export const minPlayersForNumberOfRounds = (numRounds: number) => {
  // this should never happen
  if (numRounds === 0) {
    return 1;
  }

  return recommendedRoundMap[numRounds - 1] + 1;
}

export const recommendedTopCut = (numPlayers: number): TopCutType => {
  if (numPlayers <= 8) return undefined;
  if (numPlayers <= 20) return 'top-four';
  return 'top-eight';
};

export const prettyRecommendedRounds = (numPlayers: number): string => {
  const numRounds = recommendedRounds(numPlayers);

  if (numRounds === 1) {
    return '1 round';
  }

  return `${numRounds} rounds`;
};

export const prettyCut = (numPlayers: number): string => {
  const recommendedCut = recommendedTopCut(numPlayers);

  if (recommendedCut === 'top-eight') {
    return 'top 8 cut';
  } else if (recommendedCut === 'top-four') {
    return 'top 4 cut';
  }

  return 'no top cut';
};
