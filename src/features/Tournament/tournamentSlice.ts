import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialRoundPairings, getNextRoundPairings } from "./Pairings/utils/pairings";
import { Player } from "./Player/types/Player";
import { TournamentState } from "./types";

const initialState: TournamentState = {
  pairings: [],
  players: []
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    loadInitialPairings(state, action: PayloadAction<Player[]>) {
      state.pairings = getInitialRoundPairings(action.payload);
    },
    updatePairings(state, action) {

    }
  }
})