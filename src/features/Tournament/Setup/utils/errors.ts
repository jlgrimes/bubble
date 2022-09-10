import {
  minPlayersForNumberOfRounds,
  prettyRounds,
} from '../../Pairings/utils/rounds';
import { TopCutType } from '../../state/TournamentState';

export const getNumRoundsWarningString = (
  manualNumRounds: number,
  recommendedNumRounds: number
): string | undefined => {
  if (manualNumRounds > recommendedNumRounds) {
    return `Cannot run a tournament with ${prettyRounds(
      manualNumRounds
    )} with less than ${minPlayersForNumberOfRounds(
      manualNumRounds
    )} players. Please add more players or decrease number of rounds.`;
  }
};

export const getTopCutWarningString = (
  manualTopCut: TopCutType,
  recommendedCut: TopCutType
): string | undefined => {
  if (manualTopCut === 'top-eight' && recommendedCut !== 'top-eight') {
    return 'Need at least 8 players to run top 8. Please select another option. ';
  }

  if (manualTopCut === 'top-four' && recommendedCut === undefined) {
    return 'Need at least 4 players to run top 4. Please select another option.';
  }
};

export const shouldDisableSaveEditRounds = (
  manualNumRounds: number,
  recommendedNumRounds: number,
  manualTopCut: TopCutType,
  recommendedCut: TopCutType
) : boolean =>
  !!getNumRoundsWarningString(manualNumRounds, recommendedNumRounds) ||
  !!getTopCutWarningString(manualTopCut, recommendedCut);
