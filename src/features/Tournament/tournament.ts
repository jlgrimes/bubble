import { Dispatch } from "@reduxjs/toolkit";
import { setError } from "../Error/errorSlice";
import { initializeTournament } from "./tournamentSlice";
import { TournamentState } from "./TournamentState";

export const startTournament = () => (state: TournamentState, dispatch: Dispatch) => {
  if (state.players.length < 2) {
    dispatch(setError('Must have > 2 players to start a tournament.'));
    return;
  }

  dispatch(initializeTournament());
}