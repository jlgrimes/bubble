import { PlayerMatch } from "./PlayerMatch";
import { Record } from "./Record";

export interface Player {
  /**
   * Unique identifier of the player. Bye player has ID 'bye'
   */
  id: string;
  /**
   * Name of the player. Ex. Kenny
   */
  name: string;
  /**
   * Matches the player has played. Starts as empty array
   */
  matches: PlayerMatch[];
  /**
   * The record a player has. Should be updated alongside matches.
   */
  record: Record;
  /**
   * Number of match points a player has
   */
  matchPoints: number;
  /**
   * Dropped status. If true, player is dropped, do not include in pairings.
   */
  dropped?: boolean;
}