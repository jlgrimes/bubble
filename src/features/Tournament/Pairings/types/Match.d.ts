import { MatchResult } from "./MatchResult"

export interface Match {
  /**
   * Result of the match. First player against second player (ex, win means player 1 beat player 2)
   */
  result: MatchResult,
  /**
   * Player ids of the paired players
   */
  playerIds: number[]
}