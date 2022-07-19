import { Player } from "../../Player/types";
import { MatchFilter, Match } from "../types";
import { getExistingMatch } from './match';

/**
 * Prunes pairings with the given filter/search term.
 */
export const prunePairings = (searchQuery: string, completedMatchFilter: MatchFilter, players: Player[], pairings: string[][], matchResults: Match[]) => {
  const searchPrunedPairings =
    searchQuery === ''
      ? pairings
      : pairings.filter(
          (pairing, idx) =>
            players
              .find(player => player.id === pairing[0])
              ?.name.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            players
              .find(player => player.id === pairing[1])
              ?.name.toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
  const prunedPairings = searchPrunedPairings.filter(pairing =>
    completedMatchFilter === 'completed'
      ? getExistingMatch(pairing, matchResults)
      : completedMatchFilter === 'incomplete'
      ? !getExistingMatch(pairing, matchResults)
      : true
  );

  return prunedPairings;
}