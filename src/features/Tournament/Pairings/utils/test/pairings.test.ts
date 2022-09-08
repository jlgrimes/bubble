import {
  getPairings,
  sortMatchingTables,
  trickleDownMatchPointTiers,
} from '../pairings';
import {
  generateEmptyPlayers,
  SAMPLE_DOWN_PAIR_PLAYER_SUBSET,
  SAMPLE_EMPTY_PLAYERS,
  SAMPLE_MATCH_TIERED_PLAYERS,
  SAMPLE_ODD_MATCH_TIERED_PLAYERS,
} from '../../../../../helpers/testConstants';
import { ODD_OPPOSITE_SORTED_MATCH_POINT_TIERS } from '../../../../../helpers/long-constants';

describe('pairings utils', () => {
  describe('sortMatchingTables', () => {
    const players = SAMPLE_MATCH_TIERED_PLAYERS;

    it('should preserve a sorted matching', () => {
      expect(
        sortMatchingTables(
          [
            ['1', '2'],
            ['5', '6'],
          ],
          players
        )
      ).toEqual([
        ['1', '2'],
        ['5', '6'],
      ]);
    });

    it('should sort pairings out of order', () => {
      expect(
        sortMatchingTables(
          [
            ['5', '6'],
            ['1', '2'],
          ],
          players
        )
      ).toEqual([
        ['1', '2'],
        ['5', '6'],
      ]);
    });

    it('should put the down pair match at the end of the tier', () => {
      expect(
        sortMatchingTables(
          [
            ['2', '3'],
            ['0', '1'],
          ],
          SAMPLE_DOWN_PAIR_PLAYER_SUBSET
        )
      ).toEqual([
        ['0', '1'],
        ['2', '3'],
      ]);
    });
  });

  describe('trickleDownMatchPointTiers', () => {
    it('should trickle down opposite odd pairs correctly', () => {
      expect(ODD_OPPOSITE_SORTED_MATCH_POINT_TIERS.flat()).toHaveLength(40);
      expect(trickleDownMatchPointTiers(ODD_OPPOSITE_SORTED_MATCH_POINT_TIERS, false).flat()).toHaveLength(40);
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
      expect(getPairings(SAMPLE_ODD_MATCH_TIERED_PLAYERS, false)).toEqual([
        ['0', '1'],
        ['2', '3'],
      ]);
    });
  });
});
