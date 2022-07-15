import { getPairings } from "../pairings";
import { SAMPLE_EMPTY_PLAYERS, SAMPLE_MATCH_TIERED_PLAYERS } from "../../../../../helpers/testConstants";

describe('pairings utils', () => {
  describe('getPairings', () => {
    it('should compute initial pairings graph to be random', () => {
      expect(getPairings(SAMPLE_EMPTY_PLAYERS, false)).toMatchSnapshot();
    });

    it('should correctly pair players in the same match point tier', () => {
      expect(getPairings(SAMPLE_MATCH_TIERED_PLAYERS, false)).toMatchSnapshot();
    })
  });
});