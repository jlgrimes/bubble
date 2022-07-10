import { MatchResult } from "../types/Match";

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

  return 'tie';
};