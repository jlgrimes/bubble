import type { Pairing } from "../Pairings/types";
import type { Player } from "../Player/types";

export interface TournamentState {
  pairings: Pairing[],
  players: Player[]
}