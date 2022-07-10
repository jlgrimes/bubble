import { Match, PlayerMatch } from "../types/Match";
import { Player } from "../types/Player";
import { getUpdatedRecordAfterMatch } from "./record";
import { inverseResult } from "./match";

export const getActivePlayers = (players: Player[]): Player[] => players.filter(player => !player.dropped);

/**
 * Gets the number of match points a player has.
 * @param player 
 * @returns 
 */
export const getMatchPoints = (player: Player): number => player.record.wins * 3 + player.record.ties;

/**
 * Converts the match object to PlayerMatch, which will be stored in the player object.
 */
export const convertMatchToPlayerMatch = (player: Player, match: Match): PlayerMatch => {
  /**
   * If the first player is the player we're talking about, the opponent is the second player, keep the result the same.
   */
  if (player.id === match.playerIds[0] ) {
    return {
      opponentId: match.playerIds[1],
      result: match.result
    };
  }

  /**
   * If the second player is the player we're talking about, the opponent is the first player, and inverse the match result to store.
   */
  return {
    opponentId: match.playerIds[0],
    result: inverseResult(match.result)
  };
};

export const getUpdatedPlayerAfterMatch = (player: Player, match: Match): Player => {
  const matchResult = convertMatchToPlayerMatch(player, match);

  return {
    ...player,
    matches: [...player.matches, matchResult],
    record: getUpdatedRecordAfterMatch(player.record, matchResult.result)
  }
}