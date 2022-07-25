import { TopCutType } from "../../state/TournamentState";

// 4.6.3.2 - Single Day Tournament Structures
export const recommendedRounds = (numPlayers: number) => {
  if (numPlayers <= 2) return 1;
  if (numPlayers <= 4) return 2;
  if (numPlayers <= 8) return 3;
  if (numPlayers <= 12) return 4;
  if (numPlayers <= 20) return 5;
  if (numPlayers <= 32) return 5;
  if (numPlayers <= 64) return 6;
  if (numPlayers <= 128) return 7;
  if (numPlayers <= 226) return 8;
  if (numPlayers <= 409) return 9;
  return 10;
}

export const recommendedTopCut = (numPlayers: number): TopCutType => {
  if (numPlayers <= 8) return undefined;
  if (numPlayers <= 20) return 'top-four';
  return 'top-eight';
}