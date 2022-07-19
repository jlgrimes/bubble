import type { Match, MatchResult } from '../types';

/**
 * Makes a win a loss, a loss a win, a tie a tie. Used for converting match to player match.
 */
export const inverseResult = (result: MatchResult): MatchResult => {
  if (result === 'win') {
    return 'loss';
  }

  if (result === 'loss') {
    return 'win';
  }

  if (result === 'double-loss') {
    return 'loss';
  }

  return 'tie';
};

export const getExistingMatch = (
  pairing: string[],
  matchResults: Match[]
): Match | undefined =>
  matchResults.find(
    (match: Match) =>
      match.playerIds[0] === pairing[0] && match.playerIds[1] === pairing[1]
  );
