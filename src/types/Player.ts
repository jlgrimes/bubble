import { Record } from "./Record";

export interface Player {
  /**
   * Name of the player. Ex. Kenny
   */
  name: string;
  /**
   * Player record.
   */
  record: Record;
  /**
   * Dropped status. If true, player is dropped, do not include in pairings.
   */
  dropped?: boolean;
}