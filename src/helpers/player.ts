import { Result } from "../types/Match";
import { Player } from "../types/Player";
import { Record } from "../types/Record";

export const getActivePlayers = (players: Player[]): Player[] => players.filter(player => !player.dropped);

/**
 * Gets the record of a player (number of wins, ties, losses)
 * @param player 
 * @returns 
 */
export const getRecord = (player: Player): Record => ({
  wins: player.matches.filter((match) => match.result === Result.Win).length,
  ties: player.matches.filter((match) => match.result === Result.Tie).length,
  losses: player.matches.filter((match) => match.result === Result.Loss).length
});

/**
 * Gets the number of match points a player has.
 * @param player 
 * @returns 
 */
export const getMatchPoints = (player: Player): number => {
  const record: Record = getRecord(player);
  return record.wins * 3 + record.ties;
}