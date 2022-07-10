import { getNextRoundPairings, getPairings } from "../pairings";
import { SAMPLE_MATCH_RESULTS, SAMPLE_SORTED_PLAYER_LIST } from "../../../../../helpers/testConstants";

describe('pairings utils', () => {
  describe('getPairings', () => {
    it('should properly get pairings', () => {
      expect(getPairings(SAMPLE_SORTED_PLAYER_LIST)).toMatchSnapshot();
    });

    it('should pair last person as a bye', () => {
      expect(getPairings(SAMPLE_SORTED_PLAYER_LIST.slice(0, 3))).toMatchSnapshot();
    });
  });

  describe('getNextRoundPairings', () => {
    it('should get next round pairings', () => {
      expect(getNextRoundPairings(SAMPLE_SORTED_PLAYER_LIST, SAMPLE_MATCH_RESULTS)).toMatchSnapshot();
    });
  });
});