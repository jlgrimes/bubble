import { Match } from "./Match";

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
  matches: Match[]
  /**
   * Dropped status. If true, player is dropped, do not include in pairings.
   */
  dropped?: boolean;
}