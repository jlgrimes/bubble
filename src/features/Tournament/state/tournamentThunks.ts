import { ThunkDispatch, Action } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../app/store";
import { setError } from "../../Error/errorSlice";
import { initializeTournament } from "./tournamentSlice";

export const startTournament = (): AppThunk => (dispatch: ThunkDispatch<RootState, unknown, Action>, getState: () => RootState) => {
  if (getState().tournament.players.length < 2) {
    dispatch(setError('Must have > 2 players to start a tournament.'));
    return;
  }

  dispatch(initializeTournament());
}