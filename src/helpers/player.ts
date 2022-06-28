import { Match } from "../types/Match";
import { Player } from "../types/Player";
import { Result } from "../types/Match";
import { Record } from "../types/Record";

export const getActivePlayers = (players: Player[]): Player[] => players.filter(player => !player.dropped);

/**
 * Gets the number of match points a player has.
 * @param player 
 * @returns 
 */
export const getMatchPoints = (player: Player): number => player.record.wins * 3 + player.record.ties;

export const getUpdatedRecordAfterMatch = (record: Record, result: Result): Record => {
  if (result === Result.Win) {
    return { ...record, wins: record.wins + 1 };
  }

  if (result === Result.Loss) {
    return { ...record, losses: record.losses + 1 };
  }

  if (result === Result.Tie) {
    return { ...record, ties: record.ties + 1 };
  }

  return record;
}

export const getUpdatedPlayerAfterMatch = (player: Player, match: Match, result: Result): Player => {
  return {
    ...player,
    matches: [...player.matches, match],
    record: getUpdatedRecordAfterMatch(player.record, result)
  }
}