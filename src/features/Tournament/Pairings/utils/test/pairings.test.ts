import { getNextRoundPairings, getPairings, getPairingsGraph } from "../pairings";
import { SAMPLE_EMPTY_PLAYERS, SAMPLE_MATCH_RESULTS, SAMPLE_MATCH_TIERED_PLAYERS, SAMPLE_SORTED_PLAYER_LIST } from "../../../../../helpers/testConstants";

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
      expect(getNextRoundPairings(SAMPLE_SORTED_PLAYER_LIST)).toMatchSnapshot();
    });
  });

  describe('getPairingsGraph', () => {
    it('should compute initial pairings graph to be random', () => {
      expect(getPairingsGraph(SAMPLE_EMPTY_PLAYERS)).toEqual([[2, 3]]);
    });

    it('should correctly pair players in the same match point tier', () => {
      expect(getPairingsGraph(SAMPLE_MATCH_TIERED_PLAYERS)).toEqual([[2, 3]]);
    })
  });
});