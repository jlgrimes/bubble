import { getPairings, sortMatchingTables } from '../pairings';
import {
  generateEmptyPlayers,
  SAMPLE_EMPTY_PLAYERS,
  SAMPLE_MATCH_TIERED_PLAYERS,
  SAMPLE_ODD_MATCH_TIERED_PLAYERS,
} from '../../../../../helpers/testConstants';

describe('pairings utils', () => {
  describe('sortMatchingTables', () => {
    const players = SAMPLE_MATCH_TIERED_PLAYERS;

    it('should preserve a sorted matching', () => {
      expect(sortMatchingTables([['1', '2'], ['5', '6']], players)).toEqual([['1', '2'], ['5', '6']]);
    });

    it('should sort pairings out of order', () => {
      expect(sortMatchingTables([['5', '6'], ['1', '2']], players)).toEqual([['1', '2'], ['5', '6']]);
    });
  });

  describe('getPairings', () => {
    it('should compute initial pairings graph to be random', () => {
      expect(getPairings(SAMPLE_EMPTY_PLAYERS, false)).toMatchSnapshot();
    });

    it('should correctly pair players in the same match point tier', () => {
      expect(getPairings(SAMPLE_MATCH_TIERED_PLAYERS, false)).toMatchSnapshot();
    });

    it('should down pair odd numbered pairings', () => {
      expect(
        getPairings(SAMPLE_ODD_MATCH_TIERED_PLAYERS, false)
      ).toEqual([['0', '1'], ['2', '3']]);
    });

    it('should leave last vertex alone as the bye', () => {
      expect(getPairings(generateEmptyPlayers(5), false)).toEqual([['0', '1'], ['3', '4'], ['2']])
    })
  });
});
