import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPairings } from '../Pairings/utils/pairings';
import { Player } from '../Player/types';
import { Match } from '../Pairings/types';
import type { TournamentState } from './TournamentState';
import { applyMatchResultsToPlayers } from '../Player/utils/player';
import { generateEmptyPlayers } from '../../../helpers/testConstants';
import { recommendedRounds } from '../Pairings/utils/rounds';
import { byePlayer } from './constants';

export const initialState: TournamentState = {
  round: 0,
  pairings: [],
  players: generateEmptyPlayers(16),
  matchResults: [],
  maxRounds: 4,
  topCut: undefined,
  viewState: 'tournament'
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
      // If we pass in pairings through tests, don't generate them
      if (state.pairings.length === 0) {
        // If there's an odd number of players, add the bye player.
        if (state.players.length % 2 !== 0) {
          state.players.push(byePlayer)
        }

        state.maxRounds = recommendedRounds(state.players.length);
        state.pairings = getPairings(state.players, !state.deterministicPairing);
      }
      state.round = 1;
    },
    submitMatchResult(state, action: PayloadAction<Match>) {
      state.matchResults.push(action.payload);
    },
    unsubmitMatchResult(state, action: PayloadAction<Match>) {
      state.matchResults = state.matchResults.filter((matchResult) => matchResult.playerIds[0] !== action.payload.playerIds[0]);
    },
    // action payload: if we should pair deterministically for testing.
    nextRound(state) {
      const updatedPlayers = applyMatchResultsToPlayers(state.matchResults, state.players);
      state.players = updatedPlayers;
      state.pairings = getPairings(updatedPlayers, !state.deterministicPairing);
      state.matchResults = [];
      state.round += 1;

      const lastPairing = state.pairings[state.pairings.length - 1];
      if (lastPairing.length === 1) {
        state.matchResults.push({ playerIds: lastPairing, result: 'win' });
      }
    },
  },
});

export const { addPlayer, removePlayer, initializeTournament, submitMatchResult, unsubmitMatchResult, nextRound } =
  tournamentSlice.actions;
export default tournamentSlice.reducer;
