import { ThunkDispatch, Action } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../app/store";
import { initializeTournament } from "./tournamentSlice";

export const startTournament = (): AppThunk => (dispatch: ThunkDispatch<RootState, unknown, Action>, getState: () => RootState) => {
  if (getState().tournament.players.length < 2) {
    throw Error('Must have > 2 players to start a tournament.');
  }

  dispatch(initializeTournament());
}