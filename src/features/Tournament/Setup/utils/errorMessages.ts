import { TopCutType } from "../../state/TournamentState";

export const getTopCutWarningString = (manualTopCut: TopCutType, recommendedCut: TopCutType): string | undefined => {
  if (manualTopCut && !recommendedCut) {
    return 'Top cut is not recommended for less than 8 players. There will be lots of repairs.';
  }
}