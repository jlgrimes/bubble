import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getInitialRoundPairings,
  getNextRoundPairings,
} from './Pairings/utils/pairings';
import { Player } from './Player/types';
import type { TournamentState } from './TournamentState';

const initialState: TournamentState = {
  round: 0,
  pairings: [],
  players: [],
  matchResults: [],
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    /**
     * Add player to the tournament before the tournament has started.
     * @param state
     * @param action
     */
    addPlayer(state, action: PayloadAction<Player>) {
      state.players.push(action.payload);
    },
    /**
     * Removes a player before the tournament has started.
     * @param state
     * @param action Payload contains the id of the player removed
     */
    removePlayer(state, action: PayloadAction<string>) {
      state.players = state.players.filter(
        player => player.id !== action.payload
      );
    },
    initializeTournament(state) {
      state.pairings = getInitialRoundPairings(state.players);
      state.round = 1;
    },
    nextRound(state) {
      state.pairings = getNextRoundPairings(state.players, state.matchResults);
    },
  },
});

export const { addPlayer, removePlayer, initializeTournament, nextRound } =
  tournamentSlice.actions;
export default tournamentSlice.reducer;
