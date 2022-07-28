import { RootState } from "../../../../app/store";

export const getRoundText = (state: RootState) => {
  if (state.tournament.viewState === 'standings' && state.tournament.topCut) {
    return 'Standings';
  }

  if (
    state.tournament.viewState === 'final-standings' ||
    (state.tournament.viewState === 'standings' && !state.tournament.topCut)
  ) {
    return 'Final standings';
  }

  if (state.tournament.viewState === 'top-cut') {
    if (state.tournament.pairings.length === 4) {
      return 'Top 8';
    }
    if (state.tournament.pairings.length === 2) {
      return 'Top 4';
    }
    if (state.tournament.pairings.length === 1) {
      return 'Finals';
    }
  }

  return `Round ${state.tournament.round} of ${state.tournament.maxRounds}`;
};