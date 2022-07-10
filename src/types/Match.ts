export type MatchResult = 'win' | 'loss' | 'tie'

export interface Match {
  /**
   * Player ids of the paired players
   */
  playerIds: String[],
  /**
   * Result of the match. First player against second player (ex, win means player 1 beat player 2)
   */
  result: MatchResult
}

/**
 * PlayerMatch is the match object stored in the player objects when the round completes.
 * Match object is mapped down to the PlayerMatch object, accounting for wins/ties/etc.
 */
export interface PlayerMatch {
  /**
   * Id of opponent
   */
  opponentId: String,
  /**
   * Result of the match. Current player against the opponentId player.
   */
  result: MatchResult
}