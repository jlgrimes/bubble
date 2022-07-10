import { Match, PlayerMatch } from "./Match";
import { Record } from "./Record";

export interface Player {
  /**
   * Unique identifier of the player
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
   * Dropped status. If true, player is dropped, do not include in pairings.
   */
  dropped?: boolean;
};