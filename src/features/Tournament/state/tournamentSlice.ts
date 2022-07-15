import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPairings } from '../Pairings/utils/pairings';
import { Player } from '../Player/types';
import { Match } from '../Pairings/types';
import type { TournamentState } from './TournamentState';
import { applyMatchResultsToPlayers } from '../Player/utils/player';
import { SAMPLE_PAIRINGS, SAMPLE_SORTED_PLAYER_LIST } from '../../../helpers/testConstants';

export const initialState: TournamentState = {
  round: 0,
  pairings: SAMPLE_PAIRINGS,
  players: SAMPLE_SORTED_PLAYER_LIST,
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
      state.pairings = getPairings(state.players);
      state.round = 1;
    },
    submitMatchResult(state, action: PayloadAction<Match>) {
      state.matchResults.push(action.payload);
    },
    unsubmitMatchResult(state, action: PayloadAction<Match>) {
      state.matchResults = state.matchResults.filter((matchResult) => matchResult.playerIds[0] !== action.payload.playerIds[0]);
    },
    nextRound(state) {
      const updatedPlayers = applyMatchResultsToPlayers(state.matchResults, state.players);
      state.players = updatedPlayers;
      state.pairings = getPairings(updatedPlayers);
      state.matchResults = [];
      state.round += 1;
    },
  },
});

export const { addPlayer, removePlayer, initializeTournament, submitMatchResult, unsubmitMatchResult, nextRound } =
  tournamentSlice.actions;
export default tournamentSlice.reducer;
