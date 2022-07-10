import { Pairing } from "./Pairing"
import { MatchResult } from "./MatchResult"

export interface Match extends Pairing {
  /**
   * Result of the match. First player against second player (ex, win means player 1 beat player 2)
   */
  result: MatchResult
}