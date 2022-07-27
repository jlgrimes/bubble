import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPairings } from '../Pairings/utils/pairings';
import { Player } from '../Player/types';
import { Match } from '../Pairings/types';
import type { TournamentState } from './TournamentState';
import {
  addByeWin,
  adjustByePlayer,
  applyMatchResultsToPlayers,
  dropPlayerFromPlayers,
  getActivePlayers,
} from '../Player/utils/player';
import { generateEmptyPlayers } from '../../../helpers/testConstants';
import { recommendedRounds, recommendedTopCut } from '../Pairings/utils/rounds';
import { byePlayer } from './constants';
import { getStandings } from '../Standings/utils/standings';
import {
  getNextRoundTopCutPairings,
  getTopCutPairings,
  getTopCutPlayers,
} from '../Pairings/utils/top-cut';
import { devMode } from '../../../helpers/url';

const initialDevState: TournamentState = {
  round: 0,
  pairings: [],
  players: generateEmptyPlayers(100),
  matchResults: [],
  maxRounds: 3,
  topCut: 'top-eight',
  viewState: 'tournament',
};

const initialProdState: TournamentState = {
  round: 0,
  pairings: [],
  players: [],
  matchResults: [],
  maxRounds: 3,
  topCut: 'top-eight',
  viewState: 'setup',
};

const initialState = devMode ? initialDevState : initialProdState;

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    loadPlayers(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
      state.viewState = 'tournament';
    },
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
          state.players.push(byePlayer);
        }

        state.maxRounds = recommendedRounds(state.players.length);
        state.pairings = getPairings(
          state.players,
          !state.deterministicPairing
        );
      }
      state.topCut = recommendedTopCut(state.players.length);
      state.round = 1;
      state.matchResults = addByeWin(state.pairings, state.matchResults);
    },
    submitMatchResult(state, action: PayloadAction<Match>) {
      state.matchResults.push(action.payload);
    },
    unsubmitMatchResult(state, action: PayloadAction<Match>) {
      state.matchResults = state.matchResults.filter(
        matchResult => matchResult.playerIds[0] !== action.payload.playerIds[0]
      );
    },
    // action payload: if we should pair deterministically for testing.
    nextRound(state) {
      const updatedPlayers = applyMatchResultsToPlayers(
        state.matchResults,
        state.players
      );
      state.players = updatedPlayers;
      state.matchResults = [];

      if (state.viewState === 'top-cut') {
        // If we're on the last round, go to standings.
        if (state.round === state.maxRounds) {
          state.viewState = 'final-standings';
          return;
        }

        state.pairings = getNextRoundTopCutPairings(state.players);

        state.matchResults = [];
        state.round += 1;

        return;
      }

      // If we're on the last round, go to standings.
      if (state.round === state.maxRounds) {
        state.viewState = 'standings';
        return;
      }

      state.players = adjustByePlayer(state.players);

      state.pairings = getPairings(
        getActivePlayers(state.players),
        !state.deterministicPairing
      );
      state.round += 1;

      state.matchResults = addByeWin(state.pairings, state.matchResults);
    },
    repair(state) {
      state.matchResults = [];
      // If someone drops before a repair, or a drop needs to happen before a repair
      state.players = adjustByePlayer(state.players);
      state.pairings = getPairings(
        getActivePlayers(state.players),
        !state.deterministicPairing
      );
      state.matchResults = addByeWin(state.pairings, state.matchResults);
    },
    generateStandings(state) {
      state.standings = getStandings(state.players, state.standings);
    },
    /**
     * For testing. Assigns wins to the first player.'
     */
    autoWins(state) {
      for (const pairing of state.pairings) {
        if (
          !state.matchResults.some(
            matchResult => matchResult.playerIds[0] === pairing[0]
          )
        ) {
          state.matchResults.push({ playerIds: pairing, result: 'win' });
        }
      }
    },
    enterCut(state) {
      if (!state.standings) {
        throw Error('Standings should be defined at this point.');
      }

      state.round = 1;
      const newPlayers = getTopCutPlayers(state.standings, state.topCut);
      state.players = newPlayers;
      state.pairings = getTopCutPairings(state.players);
      // 3 rounds for top 8, 2 rounds for top 4
      state.maxRounds = recommendedRounds(state.players.length);
      state.viewState = 'top-cut';
    },
    /**
     * Drop player from the tournament.
     *
     * @param state
     * @param action Payload is ID of the player being dropped
     */
    dropPlayer(state, action: PayloadAction<string>) {
      const droppedPlayerId = action.payload;
      const existingPairing = state.pairings.find(pairing =>
        pairing.includes(droppedPlayerId)
      );

      // If their match hasn't completed yet, give the other player a win
      if (
        !state.matchResults.some(matchResult =>
          matchResult.playerIds.includes(droppedPlayerId)
        )
      ) {
        state.matchResults = state.matchResults.filter(
          matchResult => matchResult.playerIds[0] !== existingPairing[0]
        );
        if (existingPairing[0] === droppedPlayerId) {
          state.matchResults.push({
            playerIds: existingPairing,
            result: 'loss',
          });
        } else {
          state.matchResults.push({
            playerIds: existingPairing,
            result: 'win',
          });
        }
      } else {
        // In the unusual scenario where a player drops immediately after the player they're paired against..
        // Otherwise in this case, don't do anything.
        if (
          (existingPairing[0] === droppedPlayerId &&
            state.players.find(player => player.id === existingPairing[1])
              ?.dropped) ||
          (existingPairing[1] === droppedPlayerId &&
            state.players.find(player => player.id === existingPairing[0])
              ?.dropped)
        ) {
          state.matchResults = state.matchResults.filter(
            matchResult => matchResult.playerIds[0] !== existingPairing[0]
          );
          state.matchResults.push({
            playerIds: existingPairing,
            result: 'double-loss',
          });
        }
      }

      state.players = dropPlayerFromPlayers(action.payload, state.players);
    },
  },
});

export const {
  addPlayer,
  removePlayer,
  initializeTournament,
  submitMatchResult,
  unsubmitMatchResult,
  nextRound,
  autoWins,
  generateStandings,
  enterCut,
  dropPlayer,
  loadPlayers,
  repair,
} = tournamentSlice.actions;
export default tournamentSlice.reducer;
