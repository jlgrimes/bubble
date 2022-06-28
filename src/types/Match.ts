export enum Result {
  Win,
  Loss,
  Tie
}

export interface Match {
  /**
   * Player ids of the paired players
   */
  playerIds: String[],
  /**
   * Result of the match. First player against second player (ex, win means player 1 beat player 2)
   */
  result?: Result
}