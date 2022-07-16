import type { Pairing, Match } from "../Pairings/types";
import type { Player } from "../Player/types";

export interface TournamentState {
  round: number,
  pairings: Pairing[],
  players: Player[],
  matchResults: Match[],
  deterministicPairing?: boolean
}