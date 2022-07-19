import type { Pairing, Match } from "../Pairings/types";
import type { Player } from "../Player/types";

export type TopCutType = 'top-eight' | 'top-four' | undefined;

export interface TournamentState {
  round: number,
  pairings: Pairing[],
  players: Player[],
  matchResults: Match[],
  maxRounds: number,
  topCut: TopCutType, 
  deterministicPairing?: boolean
}