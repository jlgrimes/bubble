import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialRoundPairings, getNextRoundPairings } from "./Pairings/utils/pairings";
import type { Player } from "./Player/types/Player";
import type { Match } from "./Pairings/types";
import type { TournamentState } from "./types";

const initialState: TournamentState = {
  pairings: [],
  players: [],
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    startTournament(state, action: PayloadAction<Player[]>) {
      state.pairings = getInitialRoundPairings(action.payload);
    },
    nextRound(state, action: PayloadAction<Match[]>) {
      state.pairings = getNextRoundPairings(state.players, action.payload);
    }
  }
})

export const { startTournament, nextRound } = tournamentSlice.actions;
export default tournamentSlice.reducer;